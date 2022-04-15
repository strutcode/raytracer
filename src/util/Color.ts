export default class Color {
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
