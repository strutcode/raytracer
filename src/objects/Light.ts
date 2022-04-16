import Color from '../util/Color'
import Intersection from '../util/Intersection'
import Vector from '../util/Vector'

export default class Light {
  constructor(public position: Vector, public color: Color = new Color(1, 1, 1)) {}

  public contribution(hit: Intersection) {
    const viewDir = hit.ray.direction
    const lightDir = this.position.copy().sub(hit.position).normalize()
    const diffuse = Math.max(0, lightDir.dot(hit.normal))

    // Calculate phong intensity
    const phong = this.calculatePhong(viewDir, lightDir, hit.normal)

    // Calculate the light color and intensity
    const { r, g, b } = this.color

    return new Color(r * diffuse + 1 * phong, g * diffuse + 1 * phong, b * diffuse + 1 * phong)
  }

  private calculatePhong(viewDir: Vector, lightDir: Vector, normal: Vector, exponent = 50) {
    const lightReflection = lightDir.copy().reflect(normal)
    const phong = Math.max(0, lightReflection.dot(viewDir)) ** exponent

    return phong
  }
}
