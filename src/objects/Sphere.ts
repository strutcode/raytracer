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
    return null
  }
}
