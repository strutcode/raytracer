import Scene from '../renderer/Scene'
import Sequence from '../abstract/Sequence'

export default abstract class Rasterizer {
  public abstract render(scene: Scene)

  public renderSequence(sequence: Sequence) {
    while (sequence.hasNext()) {
      this.render(sequence.next())
    }
  }
}
