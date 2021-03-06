import Rasterizer from '../abstract/Rasterizer'
import Ray from '../util/Ray'
import Vector from '../util/Vector'
import Camera from './Camera'
import RayTracer from './RayTracer'
import Scene from './Scene'

type RealtimeRasterizerOptions = {
  width: number
  height: number
  fieldOfView?: number
}

const defaultOptions = {
  fieldOfView: 75,
}

/**
 * A rasterizer that renders a scene to a canvas.
 */
export default class RealtimeRasterizer extends Rasterizer {
  private frameBuffer: Uint8ClampedArray
  private canvas = document.createElement('canvas')
  private context = this.canvas.getContext('2d')
  private camera: Camera
  private raytracer = new RayTracer()
  private exposure = 1

  constructor(options: RealtimeRasterizerOptions) {
    super()

    const opts = { ...defaultOptions, ...options }

    // Create a basic camera
    this.camera = new Camera(opts.fieldOfView)

    // width x height pixels with 4 components each (r, g, b, a)
    this.frameBuffer = new Uint8ClampedArray(opts.width * opts.height * 4)

    // Set initial render resolution
    this.resize(opts.width, opts.height)

    // Fit the canvas to the document width
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      width: '100%',
      height: 'auto',
    })

    // Display the canvas
    document.body.appendChild(this.canvas)
  }

  // Changes the final render resolution
  public resize(width: number, height: number) {
    this.canvas.width = width
    this.canvas.height = height
  }

  public render(scene: Scene) {
    if (!this.context) return

    const { width, height } = this.canvas

    // Scan from top to bottom, left to right
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Get a ray for the current screen pixel
        // const ray = new Ray(new Vector(x, y, 0), new Vector(0, 0, 1))
        const ray = this.camera.rayForPixel(x, y, width, height)

        // Trace the ray and get the color
        const color = this.raytracer.trace(scene, ray)

        // Put the color into the frame buffer, converting from 0..1 to 0..255
        const index = (y * width + x) * 4

        // Adjust exposure value
        // this.exposure = Math.min(this.exposure, 1 / color.r, 1 / color.g, 1 / color.b)

        // Copy the color into the frame buffer
        this.frameBuffer[index + 0] = Math.round(color.r * 255 * this.exposure)
        this.frameBuffer[index + 1] = Math.round(color.g * 255 * this.exposure)
        this.frameBuffer[index + 2] = Math.round(color.b * 255 * this.exposure)
        this.frameBuffer[index + 3] = Math.round(color.a * 255)
      }
    }

    // Draw the frame buffer
    this.context.putImageData(new ImageData(this.frameBuffer, width, height), 0, 0)
  }
}
