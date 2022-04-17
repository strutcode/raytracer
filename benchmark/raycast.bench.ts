import Light from '../src/objects/Light'
import Sphere from '../src/objects/Sphere'
import RayTracer from '../src/renderer/RayTracer'
import Scene from '../src/renderer/Scene'
import Ray from '../src/util/Ray'
import Vector from '../src/util/Vector'
import { benchmark } from './util'

const frames = 100
const time = benchmark(
  '320x240 simple render',
  () => {
    const scene = new Scene()

    scene.addShape(new Sphere(Vector.forward, 0.5))
    scene.addLight(new Light(Vector.left))

    const tracer = new RayTracer()

    for (let y = 0; y < 240; y++) {
      for (let x = 0; x < 320; x++) {
        tracer.trace(scene, new Ray(new Vector(x, y), Vector.forward))
      }
    }
  },
  frames,
)

const frameTime = (time / frames).toFixed(2)
const fps = Math.round(1000 / (time / frames))

console.log(`${frameTime} ms per frame average (${fps} fps)`)
