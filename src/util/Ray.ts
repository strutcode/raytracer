import Vector from './Vector'

/** Represents a conceptual "ray" as a position and direction. */
export default class Ray {
  constructor(public origin: Vector, public direction: Vector) {}
}
