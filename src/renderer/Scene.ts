import Shape from '../abstract/Shape'
import Light from '../objects/Light'
import HdriSampler from '../samplers/HdriSampler'
import Color from '../util/Color'
import Intersection from '../util/Intersection'
import Ray from '../util/Ray'
import Vector from '../util/Vector'

/** Represents a world or scene to be rendered. */
export default class Scene {
  public background: Color | HdriSampler = new Color()
  private shapes: Shape[] = []
  private lights: Light[] = []

  /** Add a shape to the scene and return a copy of it. */
  public addShape<T extends Shape>(shape: T): T {
    this.shapes.push(shape)
    
    return shape
  }
  
  /** Add a light to the scene and return a copy of it. */
  public addLight<T extends Light>(light: T): T {
    this.lights.push(light)

    return light
  }

  /** Run a callback function for every light in the scene */
  public eachLight(callback: (light: Light) => void) {
    this.lights.forEach(callback)
  }

  /**
   * Discovers which object, if any, a ray would intersect with and returns
   * the hit information if one exists.
   */
  public intersect(ray: Ray, tMax = Infinity): Intersection | null {
    // Track the closest intersection to this point
    let nearestHit: Intersection | null = null

    // Iterate over _every_ shape and record the hit if it's closest
    // TODO: Smarter object gathering
    for (const shape of this.shapes) {
      const hit = shape.intersect(ray)

      // Skip if nothing was hit
      if (!hit) continue

      // If something was hit, test if the hit was closer than the previous one
      if (!nearestHit || hit?.t < nearestHit?.t) {
        nearestHit = hit
      }
    }

    // Implementation of tMax which limits the length of the ray
    if (nearestHit && nearestHit?.t > tMax) {
      return null
    }

    return nearestHit
  }

  /**
   * Gets the innate scene color given a ray direction which is useful for
   * spherical environment maps.
   */
  public getColor(dir: Vector) {
    // For solid colors, simply return the color
    if (this.background instanceof Color) {
      return this.background
    }

    return this.background.sample(dir)
  }
}
