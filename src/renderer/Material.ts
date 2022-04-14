import Color from '../util/Color'

export default class Material {
  constructor(
    public color: Color = new Color(0.5, 0.5, 0.5),
    public shine: number = 0.5,
    public gloss = 0,
  ) {}
}
