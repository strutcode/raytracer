import Sequence from '../abstract/Sequence'
import Scene from './Scene'

export default class VsyncSequence extends Sequence {
  public onStep?: (scene: Scene) => void

  constructor(private scene: Scene) {
    super()
  }

  public hasNext(): boolean {
    return true
  }

  public async next(): Promise<Scene> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        if (this.onStep) this.onStep(this.scene)
        resolve(this.scene)
      })
    })
  }
}
