import Ray from '../util/Ray'
import Vector from '../util/Vector'

const degToRad = 0.017453292519943295

export default class Camera {
  private fovTan: number

  constructor(public fieldOfView: number) {
    this.fovTan = (fieldOfView / 2) * degToRad
  }

  public rayForPixel(x: number, y: number, width: number, height: number): Ray {
    const halfW = width / 2
    const halfH = height / 2

    const direction = new Vector(
      Math.tan(this.fovTan * ((x - halfW) / halfW)),
      Math.tan(this.fovTan * ((halfH - y) / halfH) * (height / width)),
      1,
    ).normalize()

    return new Ray(Vector.zero, direction)
  }
}
