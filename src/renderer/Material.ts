import Color from '../util/Color'

/** Represents the properties of a surface. */
export default class Material {
  constructor(
    public color: Color = Color.gray,
    public shine: number = 0.2,
    public gloss = 0.03
  ) {}
}
