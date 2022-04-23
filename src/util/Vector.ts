/**
 * Represents a 3D vector with xyz components.
 * 
 * All methods are chainable and most operate in place.
 */
export default class Vector {
  public static get up() {
    return new Vector(0, 1, 0)
  }
  public static get down() {
    return new Vector(0, -1, 0)
  }
  public static get left() {
    return new Vector(-1, 0, 0)
  }
  public static get right() {
    return new Vector(1, 0, 0)
  }
  public static get forward() {
    return new Vector(0, 0, 1)
  }
  public static get back() {
    return new Vector(0, 0, -1)
  }
  public static get zero() {
    return new Vector(0, 0, 0)
  }
  public static get one() {
    return new Vector(1, 1, 1)
  }

  /** Gets a random vector on a unit sphere -- i.e. normalized. */
  public static randomUnit() {
    return new Vector(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    ).normalize()
  }

  constructor(public x = 0, public y = 0, public z = 0) {}

  /** Adds the components of another vector or a static float in place. */
  public add(n: Vector | number) {
    if (n instanceof Vector) {
      this.x += n.x
      this.y += n.y
      this.z += n.z
    } else {
      this.x += n
      this.y += n
      this.z += n
    }

    return this
  }

  /** Subtracts the components of another vector or a static float in place. */
  public sub(n: Vector | number) {
    if (n instanceof Vector) {
      this.x -= n.x
      this.y -= n.y
      this.z -= n.z
    } else {
      this.x -= n
      this.y -= n
      this.z -= n
    }

    return this
  }

  /** Multiplies the components of another vector or a static float in place. */
  public mul(n: Vector | number) {
    if (n instanceof Vector) {
      this.x *= n.x
      this.y *= n.y
      this.z *= n.z
    } else {
      this.x *= n
      this.y *= n
      this.z *= n
    }

    return this
  }

  /** Divides the components of another vector or a static float in place. */
  public div(n: Vector | number) {
    if (n instanceof Vector) {
      this.x /= n.x
      this.y /= n.y
      this.z /= n.z
    } else {
      this.x /= n
      this.y /= n
      this.z /= n
    }

    return this
  }

  /** Flips all the components of this vector in place. */
  public inverse() {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z

    return this
  }

  /** Creates a new vector with the same data as this one. */
  public copy() {
    return new Vector(this.x, this.y, this.z)
  }

  /** Returns the dot product between this vector and another as a distance. */
  public dot(other: Vector) {
    return this.x * other.x + this.y * other.y + this.z * other.z
  }

  /**
   * Returns a new vector representing a reflection of this one off of
   * the plane defined by `normal`.
   */
  public reflect(normal: Vector) {
    return this.copy().sub(normal.copy().mul(2 * this.dot(normal)))
  }

  /** Returns the magnitude of this vector. */
  public get length() {
    return Math.sqrt(this.dot(this))
  }

  /** Normalizes this vector to a length of 1 in place. */
  public normalize() {
    const length = this.length

    this.x /= length
    this.y /= length
    this.z /= length

    return this
  }
}
