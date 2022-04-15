import Material from '../renderer/Material'
import Ray from './Ray'
import Vector from './Vector'

export default class Intersection {
  public position: Vector

  constructor(public ray: Ray, public t: number, public material: Material, public normal: Vector) {
    this.position = this.ray.direction.copy().mul(this.t).add(this.ray.origin)
  }
}
