import Shape from '../abstract/Shape'
import Material from '../renderer/Material'
import Intersection from '../util/Intersection'
import Ray from '../util/Ray'
import Vector from '../util/Vector'

/** A parametric sphere shape with ray casting calculation. */
export default class Sphere extends Shape {
  constructor(
    public center: Vector,
    public radius: number,
    public material: Material = new Material(),
  ) {
    super(material)
  }

  /** Tests for and  */
  public intersect(ray: Ray): Intersection | null {
    const L = this.center.copy().sub(ray.origin)
    const tca = ray.direction.dot(L)

    // If the ray is pointing away from the sphere center there's no chance of intersection
    if (tca <= 0) {
      return null
    }

    // Calculate the distance from the sphere center to the intersection point squared
    const d2 = L.dot(L) - tca ** 2
    const sR = this.radius ** 2

    // If the distance of the ray from the center (squared) is greater than radius (squared), it missed
    if (d2 > sR) {
      return null
    }

    // Calculate the distance from the origin to the sphere center
    const thc = Math.sqrt(sR - d2)

    // Calculate t0, or the distance from the ray origin to the intersection point
    const t0 = tca - thc

    // Get the intersection point as a vector
    const P = ray.direction.copy().mul(t0).add(ray.origin)

    // For a perfect sphere the normal will always point away from the center
    // so get the normalized difference between the intersection point and the center
    const N = P.sub(this.center).normalize()

    return new Intersection(ray, t0, this.material, N)
  }
}
