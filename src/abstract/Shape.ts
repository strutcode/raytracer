import Material from '../renderer/Material'
import Intersection from '../util/Intersection'
import Ray from '../util/Ray'

export default abstract class Shape {
  public constructor(public material: Material) {}

  public abstract intersect(ray: Ray): Intersection | null
}
