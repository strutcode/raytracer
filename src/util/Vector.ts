export default class Vector {
  constructor(public x = 0, public y = 0, public z = 0) {}

  public add(n: Vector | number) {
    if (n instanceof Vector) {
      return new Vector(this.x + n.x, this.y + n.y, this.z + n.z)
    }

    return new Vector(this.x + n, this.y + n, this.z + n)
  }

  public sub(n: Vector | number) {
    if (n instanceof Vector) {
      return new Vector(this.x - n.x, this.y - n.y, this.z - n.z)
    }

    return new Vector(this.x - n, this.y - n, this.z - n)
  }

  public mul(n: Vector | number) {
    if (n instanceof Vector) {
      return new Vector(this.x * n.x, this.y * n.y, this.z * n.z)
    }

    return new Vector(this.x * n, this.y * n, this.z * n)
  }

  public dot(other: Vector) {
    return this.x * other.x + this.y * other.y + this.z * other.z
  }

  public reflect(normal: Vector) {
    return this.sub(normal.mul(2 * this.dot(normal)))
  }
}
