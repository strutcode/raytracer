import Light from './objects/Light'
import Sphere from './objects/Sphere'
import Material from './renderer/Material'
import RealtimeRasterizer from './renderer/RealtimeRasterizer'
import Scene from './renderer/Scene'
import VsyncSequence from './renderer/VsyncSequence'
import HdriSampler from './samplers/HdriSampler'
import Color from './util/Color'
import Vector from './util/Vector'

async function test() {
  const img = new HdriSampler()
  await img.load('HDR_029_Sky_Cloudy_Env.hdr')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Failed to create canvas context')
  }

  Object.assign(canvas.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    transformOrigin: 'top left',
    transform: 'scale(3)',
    zIndex: '+1000',
  })

  canvas.width = img.width
  canvas.height = img.height

  document.body.appendChild(canvas)

  let brightest = 0

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const { r, g, b } = img.getPixel(x, y)

      brightest = Math.max(brightest, r, g, b)
    }
  }

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const { r, g, b } = img.getPixel(x, y)

      ctx.fillStyle = `rgb(${255 * r / brightest}, ${255 * g / brightest}, ${255 * b / brightest})`
      ctx.fillRect(x, y, 1, 1)
    }
  }
}

test()

const scene = new Scene()

const sphere = scene.addShape(
  new Sphere(new Vector(180, 0, 500), 100, new Material(new Color(0.2, 0.85, 1))),
)
const light = scene.addLight(new Light(new Vector(-500, 0, 250)))

const renderer = new RealtimeRasterizer({
  width: 360,
  height: 240,
})
const sequence = new VsyncSequence(scene)

let d = 0
sequence.onStep = () => {
  d += 0.01

  sphere.center.x = Math.sin(d) * 500

  light.position.x = sphere.center.x + Math.sin(d + Math.PI) * 500
  light.position.z = sphere.center.z + Math.cos(d + Math.PI) * 500
}

renderer.renderSequence(sequence)
