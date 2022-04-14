import Shape from '../abstract/Shape'
import Material from '../renderer/Material'
import Intersection from '../util/Intersection'
import Ray from '../util/Ray'
import Vector from '../util/Vector'

export default class Sphere extends Shape {
  constructor(public center: Vector, public radius: number, public material: Material) {
    super(material)
  }

  public intersect(ray: Ray): Intersection | null {
    const L = this.center.sub(ray.origin)
    const tca = ray.direction.dot(L)

    // If the ray is pointing away from the sphere center there's no chance of intersection
    if (tca <= 0) {
      return null
    }

    const d = Math.sqrt(L.dot(L) - tca * tca)

    // If the distance of the ray from the center is greater than radius, it missed
    if (d > this.radius) {
      return null
    }

    const thc = Math.sqrt(this.radius * this.radius - d * d)

    return new Intersection(ray, tca - thc, this.material, L.normalize())
  }
}
