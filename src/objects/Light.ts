import Color from '../util/Color'
import Ray from '../util/Ray'
import Vector from '../util/Vector'

export default class Light {
  constructor(public position: Vector, public color: Color = new Color(1, 1, 1)) {}

  public contribution(ray: Ray) {
    const D = this.position.copy().sub(ray.origin).normalize()
    const c = D.dot(ray.direction)

    if (c <= 0) return new Color(0, 0, 0)

    return new Color(this.color.r * c, this.color.g * c, this.color.b * c, 1)
  }
}
