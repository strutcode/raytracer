import Sequence from '../abstract/Sequence'
import Scene from './Scene'

/** A never ending sequence which provides new frames on each vertical blank. */
export default class VsyncSequence extends Sequence {
  /** Optional callback to update the scene. */
  public onStep?: (scene: Scene) => void

  constructor(private scene: Scene) {
    super()
  }

  public hasNext(): boolean {
    // There's always a next frame
    return true
  }

  public async next(): Promise<Scene> {
    // Return a promise that resolves on the next vsync
    return new Promise((resolve) => {
      // Update the scene immediately if possible
      if (this.onStep) this.onStep(this.scene)

      // Use requestAnimationFrame for vsync timing
      requestAnimationFrame(() => {
        resolve(this.scene)
      })
    })
  }
}
