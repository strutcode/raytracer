import Color from '../util/Color'
import Intersection from '../util/Intersection'
import Vector from '../util/Vector'

export default class Light {
  constructor(public position: Vector, public color: Color = new Color(1, 1, 1)) {}

  public contribution(hit: Intersection) {
    const D = this.position.copy().sub(hit.position).normalize()
    const c = Math.max(0, D.dot(hit.normal))

    // Calculate phong intensity
    const specular = 10
    const lightReflection = D.copy().reflect(hit.normal)
    const phong = Math.max(0, lightReflection.dot(hit.ray.direction) ** specular)

    // Calculate the light color and intensity
    const { r, g, b } = this.color

    // return new Color(r * phong, g * phong, b * phong)
    // return new Color(r * c, g * c, b * c)
    return new Color(r * c + 1 * phong, g * c + 1 * phong, b * c + 1 * phong)
  }
}
