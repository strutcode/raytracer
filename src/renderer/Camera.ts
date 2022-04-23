import Ray from '../util/Ray'
import Vector from '../util/Vector'

const degToRad = 0.017453292519943295
const halfPi = Math.PI / 2

export default class Camera {
  private fovScale: number

  constructor(public fieldOfView: number = 90) {
    this.fovScale = fieldOfView * 0.5 * degToRad
  }

  public rayForPixel(x: number, y: number, width: number, height: number): Ray {
    const halfW = width / 2
    const halfH = height / 2
    
    const xComp = ((x - halfW) / halfW) * this.fovScale
    const yComp = ((y - halfH) / halfH) * this.fovScale

    const direction = new Vector(
      Math.sin(xComp),
      Math.sin(-yComp),
      Math.cos(xComp),
    ).normalize()

    return new Ray(Vector.zero, direction)
  }
}
