import Sphere from './objects/Sphere'
import Material from './renderer/Material'
import RealtimeRasterizer from './renderer/RealtimeRasterizer'
import Scene from './renderer/Scene'
import VsyncSequence from './renderer/VsyncSequence'
import Color from './util/Color'
import Ray from './util/Ray'
import Vector from './util/Vector'

const scene = new Scene()

scene.addShape(new Sphere(new Vector(100, 100, 500), 100, new Material(new Color(1, 0, 0))))

const renderer = new RealtimeRasterizer({
  width: 360,
  height: 240,
})

renderer.renderSequence(new VsyncSequence(scene))
