import Color from '../util/Color'
import Intersection from '../util/Intersection'
import Vector from '../util/Vector'

/** Represents a generic estimated light source in the scene. */
export default class Light {
  constructor(public position: Vector, public color: Color = Color.white) {}

  /**
   * Calculates the various colors contributions of this light for
   * a given surface.
   */
  public contribution(hit: Intersection) {
    // Prepare some useful vectors
    const viewDir = hit.ray.direction
    const surfaceToLightDir = this.position.copy().sub(hit.position).normalize()

    // Get light amounts
    const diffuse = this.calculateDiffuse(surfaceToLightDir, hit.normal)
    const specular = this.fastPhong(viewDir, surfaceToLightDir, hit.normal)

    // Shorthand the colors
    const mat = hit.material.color
    const light = this.color

    // Calculate the colors and intensities
    return {
      diffuse: new Color(mat.r * this.color.r * diffuse, mat.g * this.color.g * diffuse, mat.b * this.color.b * diffuse),
      specular: new Color(light.r * specular, light.g * specular, light.b * specular),
    }
  }

  /** Estimated diffuse light contribution for a surface. */
  private calculateDiffuse(lightDir: Vector, normal: Vector) {
    return Math.max(0, lightDir.dot(normal))
  }

  /** Standard Phong reflection model contribution for a surface. */
  private calculatePhong(viewDir: Vector, lightDir: Vector, normal: Vector, exponent = 50) {
    const lightReflection = lightDir.copy().reflect(normal)

    return Math.max(0, lightReflection.dot(viewDir)) ** exponent
  }

  /** Standard Blinn-Phong reflection model contribution for a surface. */
  private fastPhong(viewDir: Vector, lightDir: Vector, normal: Vector, exponent = 50) {
    const halfway = lightDir.copy().inverse().add(viewDir).normalize()

    return Math.max(0, -halfway.dot(normal)) ** (exponent * 2)
  }
}
