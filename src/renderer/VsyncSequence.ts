import Sequence from '../abstract/Sequence'
import Scene from './Scene'

export default class VsyncSequence extends Sequence {
  constructor(private scene: Scene) {
    super()
  }

  public hasNext(): boolean {
    return true
  }

  public async next(): Promise<Scene> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve(this.scene)
      })
    })
  }
}
