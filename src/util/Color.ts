export default class Color {
  public static get red() {
    return new Color(1, 0, 0)
  }
  public static get green() {
    return new Color(0, 1, 0)
  }
  public static get blue() {
    return new Color(0, 0, 1)
  }
  public static get yellow() {
    return new Color(1, 1, 0)
  }
  public static get cyan() {
    return new Color(0, 1, 1)
  }
  public static get fuschia() {
    return new Color(1, 0, 1)
  }
  public static get black() {
    return new Color(0, 0, 0)
  }
  public static get gray() {
    return new Color(0.5, 0.5, 0.5)
  }
  public static get white() {
    return new Color(1, 1, 1)
  }
  public static get transparent() {
    return new Color(0, 0, 0, 0)
  }

  constructor(public r = 0, public g = 0, public b = 0, public a = 1) {}

  public add(other: number | Color) {
    if (other instanceof Color) {
      this.r += other.r
      this.g += other.g
      this.b += other.b
    } else {
      this.r += other
      this.g += other
      this.b += other
    }

    return this
  }

  public mul(other: number | Color) {
    if (other instanceof Color) {
      this.r *= other.r
      this.g *= other.g
      this.b *= other.b
    } else {
      this.r *= other
      this.g *= other
      this.b *= other
    }

    return this
  }

  public copy() {
    return new Color(this.r, this.g, this.b, this.a)
  }
}
