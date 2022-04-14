import Color from '../util/Color'
import Ray from '../util/Ray'
import Scene from './Scene'

export default class RayTracer {
  public trace(scene: Scene, ray: Ray, depth: number): Color {
    const intersection = scene.intersect(ray)

    if (intersection) {
      const color = intersection.material.color
      const normal = intersection.normal
      const reflected = ray.direction.reflect(normal)
      const reflectedRay = new Ray(intersection.position, reflected)
      const reflectedColor = this.trace(scene, reflectedRay, depth + 1)

      return color.add(reflectedColor.mul(intersection.material.gloss))
    } else {
      return new Color(0, 0, 0)
    }
  }
}
