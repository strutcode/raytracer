import Shape from '../abstract/Shape'
import Light from '../objects/Light'
import Color from '../util/Color'
import Intersection from '../util/Intersection'
import Ray from '../util/Ray'

export default class Scene {
  public background = new Color()
  private shapes: Shape[] = []
  private lights: Light[] = []

  public addShape<T extends Shape>(shape: T): T {
    this.shapes.push(shape)

    return shape
  }

  public addLight<T extends Light>(light: T): T {
    this.lights.push(light)

    return light
  }

  public eachLight(callback: (light: Light) => void) {
    this.lights.forEach(callback)
  }

  public intersect(ray: Ray, tMax = Infinity): Intersection | null {
    let nearestHit: Intersection | null = null

    for (const shape of this.shapes) {
      const hit = shape.intersect(ray)

      if (!hit) continue

      if (!nearestHit || hit?.t < nearestHit?.t) {
        nearestHit = hit
      }
    }

    if (nearestHit && nearestHit?.t > tMax) {
      return null
    }

    return nearestHit
  }
}
