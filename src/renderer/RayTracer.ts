import Color from '../util/Color'
import Ray from '../util/Ray'
import Scene from './Scene'

/** Handles actual ray casting logic and final accumulation. */
export default class RayTracer {
  constructor(public maxBounces = 3) {}

  /** Traces a ray into a given scene and returns the accumulated color. */
  public trace(scene: Scene, ray: Ray, depth: number = 0): Color {
    // Get the first hit
    const intersection = scene.intersect(ray)

    // If the ray hit an object...
    if (intersection) {
      // Start with a black void
      let color = new Color()

      // If we haven't exceeded the maximum number of bounces...
      if (depth < this.maxBounces) {
        // Recurse to get reflection contribution
        const reflectedRay = new Ray(intersection.position, ray.direction.reflect(intersection.normal))
        const reflectedColor = this.trace(scene, reflectedRay, depth + 1)

        // Use the reflection color as the base
        color = reflectedColor.mul(intersection.material.gloss)
      }

      // Accumulate light contributions additively
      scene.eachLight((light) => {
        const contribution = light.contribution(intersection)

        color.add(contribution.diffuse)
        color.add(contribution.specular.mul(intersection.material.shine))
      })

      // Return the final color
      return color
    }
    // If nothing was hit, take the environment color from the scene
    else {
      return scene.getColor(ray.direction)
    }
  }
}
