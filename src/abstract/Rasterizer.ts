import Scene from '../renderer/Scene'
import Sequence from '../abstract/Sequence'

export default abstract class Rasterizer {
  public abstract render(scene: Scene)

  public async renderSequence(sequence: Sequence) {
    while (sequence.hasNext()) {
      this.render(await sequence.next())
    }
  }
}
