import Ray from '../util/Ray'
import Vector from '../util/Vector'

// Constant conversion rate between degrees and radians
const degToRad = 0.017453292519943295

const halfPi = Math.PI / 2

/**
 * A viewport into the ray traced scene. Provides utilities for calculating
 * initial rays.
 */
export default class Camera {
  public position = Vector.zero

  private fovScale: number

  constructor(public fieldOfView: number = 90) {
    this.fovScale = fieldOfView * 0.5 * degToRad
  }

  /** Creates a ray based on a screen coordinate */
  public rayForPixel(x: number, y: number, width: number, height: number): Ray {
    /*
     * Since we're essentially calculating a unit sphere, we'll use radian angles
     * from the center of the screen ranging from negative half the field of view
     * to positive half of the field of view.
     */

    // The center of the screen should be 0,0 so these will be handy
    const halfW = width / 2
    const halfH = height / 2

    // Typical images are wider than they are tall, so base the FoV on the width
    const hFieldOfView = this.fovScale
    const vFieldOfView = this.fovScale * (height / width)
    
    // Get the radians from center for the x and y screen coordinates
    const xComp = ((x - halfW) / halfW) * hFieldOfView
    const yComp = ((y - halfH) / halfH) * vFieldOfView

    // Calculate a directional vector
    // Z is implicitly proportional to the other two
    const direction = new Vector(
      Math.sin(xComp) * Math.cos(yComp),
      Math.sin(-yComp), // Screen coordinates are Y down so flip
      Math.cos(xComp) * Math.cos(yComp),
    )

    return new Ray(this.position, direction)
  }
}
