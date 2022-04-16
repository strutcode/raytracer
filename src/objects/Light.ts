import Color from '../util/Color'
import Intersection from '../util/Intersection'
import Vector from '../util/Vector'

export default class Light {
  constructor(public position: Vector, public color: Color = new Color(1, 1, 1)) {}

  public contribution(hit: Intersection) {
    const viewDir = hit.ray.direction
    const lightDir = this.position.copy().sub(hit.position).normalize()

    // Get light amounts
    const diffuse = this.calculateDiffuse(lightDir, hit.normal)
    const specular = this.fastPhong(viewDir, lightDir, hit.normal)

    // Shorthand the colors
    const mat = hit.material.color
    const light = this.color

    // Calculate the colors and intensities
    return {
      diffuse: new Color(mat.r * diffuse, mat.g * diffuse, mat.b * diffuse),
      specular: new Color(light.r * specular, light.g * specular, light.b * specular),
    }
  }

  private calculateDiffuse(lightDir: Vector, normal: Vector) {
    return Math.max(0, lightDir.dot(normal))
  }

  private calculatePhong(viewDir: Vector, lightDir: Vector, normal: Vector, exponent = 50) {
    const lightReflection = lightDir.copy().reflect(normal)

    return Math.max(0, lightReflection.dot(viewDir)) ** exponent
  }

  private fastPhong(viewDir: Vector, lightDir: Vector, normal: Vector, exponent = 50) {
    const halfway = lightDir.copy().inverse().add(viewDir).normalize()

    return Math.max(0, -halfway.dot(normal)) ** (exponent * 2)
  }
}
