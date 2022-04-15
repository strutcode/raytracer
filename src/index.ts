import Light from './objects/Light'
import Sphere from './objects/Sphere'
import Material from './renderer/Material'
import RealtimeRasterizer from './renderer/RealtimeRasterizer'
import Scene from './renderer/Scene'
import VsyncSequence from './renderer/VsyncSequence'
import Color from './util/Color'
import Vector from './util/Vector'

const scene = new Scene()

const sphere = scene.addShape(
  new Sphere(new Vector(180, 120, 500), 100, new Material(new Color(0.2, 0.85, 1))),
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

  sphere.center.x = 180 + Math.sin(d) * 80

  light.position.x = sphere.center.x + Math.sin(d + Math.PI) * 500
  light.position.z = sphere.center.z + Math.cos(d + Math.PI) * 500
}

renderer.renderSequence(sequence)
