import Light from './objects/Light'
import Sphere from './objects/Sphere'
import Material from './renderer/Material'
import RealtimeRasterizer from './renderer/RealtimeRasterizer'
import Scene from './renderer/Scene'
import VsyncSequence from './renderer/VsyncSequence'
import HdriSampler from './samplers/HdriSampler'
import Color from './util/Color'
import Vector from './util/Vector'

const scene = new Scene()

const bg = new HdriSampler()
bg.load('HDR_029_Sky_Cloudy_Env.hdr')
scene.background = bg

const sphere1 = scene.addShape(
  new Sphere(new Vector(180, 0, 500), 100, new Material(new Color(0.2, 0.85, 1))),
)
const sphere2 = scene.addShape(
  new Sphere(new Vector(180, 0, 600), 100, new Material(new Color(0.88, 0.85, 1), 0.8, 0.5)),
)
const sun = scene.addLight(new Light(new Vector(-1000, 30000, -25000), new Color(0.8, 0.8, 0.8)))
const light = scene.addLight(new Light(new Vector(-500, 0, 250), new Color(0.4, 0.4, 0.4)))

const renderer = new RealtimeRasterizer({
  width: 360,
  height: 240,
})
const sequence = new VsyncSequence(scene)

let d = 0
sequence.onStep = () => {
  d += 0.01

  sphere1.center.x = Math.sin(d * 2) * 500
  sphere2.center.y = Math.sin(d * 2) * 500

  light.position.x = sphere1.center.x + Math.sin(d + Math.PI) * 500
  light.position.z = sphere1.center.z + Math.cos(d + Math.PI) * 500
}

document.addEventListener('keydown', ev => {
  if (ev.key.toLowerCase() === 'i') {
    bg.bilinear = !bg.bilinear
  }

  if (ev.key === ' ') {
    sequence.pause = !sequence.pause
  }
})

renderer.renderSequence(sequence)
