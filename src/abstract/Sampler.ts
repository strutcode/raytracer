import Color from '../util/Color'
import Vector from '../util/Vector'

export default abstract class Sampler {
  public width = 0
  public height = 0

  public abstract getPixel(x: number, y: number): Color

  public sample(dir: Vector) {
    const lat = Math.acos(dir.y)
    const lon = Math.atan2(dir.x, dir.z)
    const u = lon / (2 * Math.PI)
    const v = lat / Math.PI

    return this.getPixel(u * this.width, v * this.height)
  }
}