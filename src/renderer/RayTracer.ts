import Color from '../util/Color'
import Ray from '../util/Ray'
import Scene from './Scene'

export default class RayTracer {
  public trace(scene: Scene, ray: Ray, depth: number = 0): Color {
    const intersection = scene.intersect(ray)

    if (intersection) {
      const baseCol = intersection.material.color
      let color = new Color()

      scene.eachLight((light) => {
        color.add(baseCol.copy().mul(light.contribution(intersection)))
      })

      return color
    } else {
      return new Color(0, 0, 0)
    }
  }
}
