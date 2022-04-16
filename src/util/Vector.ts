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

  public static randomUnit() {
    return new Vector(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    ).normalize()
  }

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
