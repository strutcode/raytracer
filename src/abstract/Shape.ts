import Material from '../renderer/Material'
import Intersection from '../util/Intersection'
import Ray from '../util/Ray'

/** Represents an abstract mathematically defined shape for ray tracing. */
export default abstract class Shape {
  public constructor(public material: Material) {}

  /**
   * Tests if a ray intersects with this shape and if so returns an
   * Intersection object describing the surface properties.
   */
  public abstract intersect(ray: Ray): Intersection | null
}
