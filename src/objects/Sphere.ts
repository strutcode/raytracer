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
    const L = this.center.copy().sub(ray.origin)
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
    const t0 = tca - thc
    const P = ray.origin.copy().add(ray.direction.copy().mul(t0))

    return new Intersection(ray, t0, this.material, P.sub(this.center).normalize())
  }
}
