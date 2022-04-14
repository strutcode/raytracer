import Shape from '../abstract/Shape'
import Color from '../util/Color'
import Intersection from '../util/Intersection'
import Ray from '../util/Ray'
import Vector from '../util/Vector'

export default class Scene {
  public background = new Color()
  private shapes: Shape[] = []

  public addShape(shape: Shape) {
    this.shapes.push(shape)
  }

  public intersect(ray: Ray): Intersection | null {
    let nearestHit: Intersection | null = null

    for (const shape of this.shapes) {
      const hit = shape.intersect(ray)

      if (!nearestHit || hit?.t < nearestHit?.t) {
        nearestHit = hit
      }
    }

    return nearestHit
  }
}
