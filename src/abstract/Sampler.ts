import Color from '../util/Color'
import { lerp, wrap } from '../util/Math'
import Vector from '../util/Vector'

/**
 * This abstract base class represents a color data source such as
 * an image or video and provides utilities for extracting that data.
 */
export default abstract class Sampler {
  public width = 0
  public height = 0
  public bilinear = true

  public abstract getPixel(x: number, y: number): Color

  public sample(dir: Vector) {
    const lat = Math.acos(dir.y)
    const lon = Math.atan2(dir.x, dir.z)
    const u = lon / (2 * Math.PI)
    const v = lat / Math.PI

    // The pixel positions
    const x = u * this.width
    const y = v * this.height

    // Bilinear interpolation
    if (this.bilinear && (x % 1 !== 0 || y % 1 !== 0)) {
      // The x and y fraction between the 4 interpolation points
      const xR = wrap(x, 0, 1)
      const yR = wrap(y, 0, 1)

      // The four pixels in question as [a, b][c, d]
      const a = this.getPixel(x, y)
      const b = this.getPixel(x + 1, y)
      const c = this.getPixel(x, y + 1)
      const d = this.getPixel(x + 1, y + 1)

      // Perform linear interpolation
      return new Color(
        lerp(
          lerp(a.r, b.r, xR),
          lerp(c.r, d.r, xR),
          yR,
        ),
        lerp(
          lerp(a.g, b.g, xR),
          lerp(c.g, d.g, xR),
          yR,
        ),
        lerp(
          lerp(a.b, b.b, xR),
          lerp(c.b, d.b, xR),
          yR,
        ),
      )
    }

    return this.getPixel(x, y)
  }
}