import RealtimeRasterizer from './renderer/RealtimeRasterizer'
import Scene from './renderer/Scene'
import VsyncSequence from './renderer/VsyncSequence'

const scene = new Scene()
const sequence = new VsyncSequence(scene)
const renderer = new RealtimeRasterizer()

renderer.renderSequence(sequence)
