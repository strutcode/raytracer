import Shape from '../abstract/Shape'
import Light from '../objects/Light'
import Color from '../util/Color'
import Intersection from '../util/Intersection'
import Ray from '../util/Ray'

export default class Scene {
  public background = new Color()
  private shapes: Shape[] = []
  private lights: Light[] = []

  public addShape(shape: Shape) {
    this.shapes.push(shape)
  }

  public addLight(light: Light) {
    this.lights.push(light)
  }

  public eachLight(callback: (light: Light) => void) {
    this.lights.forEach(callback)
  }

  public intersect(ray: Ray, tMax = Infinity): Intersection | null {
    let nearestHit: Intersection | null = null

    for (const shape of this.shapes) {
      const hit = shape.intersect(ray)

      if (!nearestHit || hit?.t < nearestHit?.t) {
        nearestHit = hit
      }
    }

    if (nearestHit?.t > tMax) {
      return null
    }

    return nearestHit
  }
}
