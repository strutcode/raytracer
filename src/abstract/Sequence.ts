import Scene from '../renderer/Scene'

export default abstract class Sequence {
  public abstract hasNext(): boolean

  public abstract next(): Scene
}
