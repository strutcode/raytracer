import Rasterizer from '../abstract/Rasterizer'
import Ray from '../util/Ray'
import Vector from '../util/Vector'
import RayTracer from './RayTracer'
import Scene from './Scene'

type RealtimeRasterizerOptions = {
  width: number
  height: number
}

const defaultOptions = {}

export default class RealtimeRasterizer extends Rasterizer {
  private frameBuffer: Uint8ClampedArray
  private canvas = document.createElement('canvas')
  private context = this.canvas.getContext('2d')
  private raytracer = new RayTracer()

  constructor(options: RealtimeRasterizerOptions) {
    super()

    const opts = { ...defaultOptions, ...options }

    // width x height pixels with 4 components each (r, g, b, a)
    this.frameBuffer = new Uint8ClampedArray(opts.width * opts.height * 4)

    // Set initial render resolution
    this.resize(opts.width, opts.height)

    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    })

    // Display the canvas
    document.body.appendChild(this.canvas)
  }

  public resize(width: number, height: number) {
    this.canvas.width = width
    this.canvas.height = height
  }

  public render(scene: Scene) {
    const { width, height } = this.canvas

    // Scan from top to bottom, left to right
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Get a ray for the current screen pixel
        const ray = new Ray(new Vector(x, y, 0), new Vector(0, 0, 1))
        // const ray = scene.camera.rayForPixel(x, y)
        const color = this.raytracer.trace(scene, ray, 0)

        const index = (y * width + x) * 4
        this.frameBuffer[index + 0] = color.r * 255
        this.frameBuffer[index + 1] = color.g * 255
        this.frameBuffer[index + 2] = color.b * 255
        this.frameBuffer[index + 3] = color.a * 255
      }
    }

    // Draw the frame buffer
    this.context.putImageData(new ImageData(this.frameBuffer, width, height), 0, 0)
  }
}