export default class Color {
  constructor(public r = 0, public g = 0, public b = 0, public a = 1) {}

  public add(other: number | Color) {
    if (other instanceof Color) {
      return new Color(this.r + other.r, this.g + other.g, this.b + other.b, this.a + other.a)
    }

    return new Color(this.r + other, this.g + other, this.b + other, this.a + other)
  }

  public mul(other: number | Color) {
    if (other instanceof Color) {
      return new Color(this.r * other.r, this.g * other.g, this.b * other.b, this.a)
    }

    return new Color(this.r * other, this.g * other, this.b * other, this.a)
  }
}
