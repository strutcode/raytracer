import Rasterizer from '../abstract/Rasterizer'
import RayTracer from './RayTracer'
import Scene from './Scene'

export default class RealtimeRasterizer extends Rasterizer {
  private raytracer = new RayTracer()

  public render(scene: Scene) {}
}
