import Sampler from '../abstract/Sampler'
import Color from '../util/Color'
import { checkMagic, readData, readDimensions, readHeader } from '../util/RgbeReader'
import StreamReader from '../util/StreamReader'
import Vector from '../util/Vector'

export default class HdriSampler extends Sampler {
  public width = 0
  public height = 0
  public data = new Float32Array()

  protected header = {}
  protected xDir = 1
  protected yDir = -1

  public async load(src: string | ArrayBuffer) {
    let rawBuffer: ArrayBuffer

    if (typeof src === 'string') {
      const response = await fetch(src)

      if (!response.ok) {
        throw new Error(`Failed to load HDR image (${response.status}): ${src}`)
      }

      rawBuffer = await response.arrayBuffer()
    } else {
      rawBuffer = src
    }
    
    const stream = new StreamReader(rawBuffer)
    
    if (!checkMagic(stream)) {
      throw new Error(`Invalid HDR image, first bytes don't match: ${src}`)
    }

    this.header = readHeader(stream)
    Object.assign(this, readDimensions(stream))
    this.data = readData(stream, this.width, this.height)
  }

  public getPixel(x: number, y: number) {
    const nX = Math.floor((x + 10000) % this.width)
    const nY = Math.floor((y + 10000) % this.height)

    const offset = (nY * this.width + nX) * 3
    const r = this.data[offset + 0]
    const g = this.data[offset + 1]
    const b = this.data[offset + 2]

    return new Color(r, g, b)
  }
}
