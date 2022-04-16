import Color from '../util/Color'

export default class Material {
  constructor(public color: Color = Color.gray, public shine: number = 0.5, public gloss = 0) {}
}
