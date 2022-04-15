import Color from '../util/Color'
import Ray from '../util/Ray'
import Scene from './Scene'

export default class RayTracer {
  public trace(scene: Scene, ray: Ray, depth: number = 0): Color {
    const intersection = scene.intersect(ray)

    if (intersection) {
      // let color = intersection.material.color
      let color = new Color()

      scene.eachLight((light) => {
        color = light.contribution(new Ray(intersection.position, intersection.normal))
      })

      return color
    } else {
      return new Color(0, 0, 0)
    }
  }
}
