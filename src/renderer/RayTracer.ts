import Color from '../util/Color'
import Ray from '../util/Ray'
import Scene from './Scene'

export default class RayTracer {
  constructor(public maxBounces = 3) {}

  public trace(scene: Scene, ray: Ray, depth: number = 0): Color {
    const intersection = scene.intersect(ray)

    if (intersection) {
      let color = new Color()

      if (depth < this.maxBounces) {
        // Recurse to get reflection contribution
        const reflectedRay = new Ray(intersection.position, ray.direction.reflect(intersection.normal))
        const reflectedColor = this.trace(scene, reflectedRay, depth + 1)

        color = reflectedColor
      }

      scene.eachLight((light) => {
        const contribution = light.contribution(intersection)

        color.add(contribution.diffuse)
        color.add(contribution.specular)
      })

      return color
    } else {
      return scene.getColor(ray.direction)
    }
  }
}
