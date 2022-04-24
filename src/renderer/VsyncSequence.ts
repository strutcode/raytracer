import Sequence from '../abstract/Sequence'
import Scene from './Scene'

/** A never ending sequence which provides new frames on each vertical blank. */
export default class VsyncSequence extends Sequence {
  /** Whether the sequence should run */
  public pause = false

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
    return new Promise(async (resolve) => {
      // Update the scene immediately if possible
      if (this.onStep) this.onStep(this.scene)
      
      if (this.pause) {
        await new Promise<void>(resolve => {
          const interval = setInterval(() => {
            if (!this.pause) {
              clearInterval(interval)
              resolve()
            }
          }, 100)
        })
      }

      // Use requestAnimationFrame for vsync timing
      requestAnimationFrame(() => {
        resolve(this.scene)
      })
    })
  }
}
