import Scene from '../renderer/Scene'
import Sequence from '../abstract/Sequence'

/**
 * This abstract base class has the job of turning a scene into an image by
 * sampling each pixel during the render function.
 * 
 * Render functions may be implemented in a variety of ways, and may output a
 * file or something else.
 */
export default abstract class Rasterizer {
  /** Renders a single frame. */
  public abstract render(scene: Scene): void

  /** Renders a whole sequence, e.g. an animation. */
  public async renderSequence(sequence: Sequence) {
    while (sequence.hasNext()) {
      this.render(await sequence.next())
    }
  }
}
