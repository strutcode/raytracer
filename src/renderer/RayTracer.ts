import Color from '../util/Color'
import Ray from '../util/Ray'
import Scene from './Scene'

export default class RayTracer {
  public trace(scene: Scene, ray: Ray, depth: number = 0): Color {
    const intersection = scene.intersect(ray)

    if (intersection) {
      let color = new Color()

      scene.eachLight((light) => {
        const contribution = light.contribution(intersection)

        color.add(contribution.diffuse)
        color.add(contribution.specular)
      })

      return color
    } else {
      return new Color(0, 0, 0)
    }
  }
}
