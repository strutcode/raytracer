export default class Vector {
  constructor(public x = 0, public y = 0, public z = 0) {}

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

  public inverse() {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z

    return this
  }

  public copy() {
    return new Vector(this.x, this.y, this.z)
  }

  public dot(other: Vector) {
    return this.x * other.x + this.y * other.y + this.z * other.z
  }

  public reflect(normal: Vector) {
    return this.copy().sub(normal.copy().mul(2 * this.dot(normal)))
  }

  public get length() {
    return Math.sqrt(this.dot(this))
  }

  public normalize() {
    const length = this.length

    this.x /= length
    this.y /= length
    this.z /= length

    return this
  }
}
