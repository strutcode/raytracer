import Material from '../renderer/Material'
import Ray from './Ray'
import Vector from './Vector'

export default class Intersection {
  constructor(
    public ray: Ray,
    public t: number,
    public material: Material,
    public normal: Vector,
  ) {}

  public get position(): Vector {
    return this.ray.origin.mul(this.t)
  }
}
