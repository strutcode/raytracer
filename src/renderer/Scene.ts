import Shape from '../abstract/Shape'
import Color from '../util/Color'
import Intersection from '../util/Intersection'
import Ray from '../util/Ray'

export default class Scene {
  public background = new Color()
  private shapes: Shape[] = []

  public intersect(ray: Ray): Intersection | null {
    let nearestHit: Intersection | null = null

    for (const shape of this.shapes) {
      const hit = shape.intersect(ray)

      if (hit?.t < nearestHit?.t) {
        nearestHit = hit
      }
    }

    return nearestHit
  }
}
