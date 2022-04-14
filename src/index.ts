import RealtimeRasterizer from './renderer/RealtimeRasterizer'
import Scene from './renderer/Scene'
import VsyncSequence from './renderer/VsyncSequence'

const scene = new Scene()
const renderer = new RealtimeRasterizer({
  width: 360,
  height: 240,
})

renderer.renderSequence(new VsyncSequence(scene))
