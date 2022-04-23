import Scene from '../renderer/Scene'

/** An abstract base class representing a sequence of images to be rendered. */
export default abstract class Sequence {
  /** Returns true if there is another frame in the sequence. */
  public abstract hasNext(): boolean

  /** Returns the next frame in the sequence as a Scene object. */
  public abstract next(): Promise<Scene>
}
