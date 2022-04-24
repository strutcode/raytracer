import { wrap } from '../util/Math';
import Sampler from '../abstract/Sampler'
import Color from '../util/Color'
import { checkMagic, readData, readDimensions, readHeader } from '../util/RgbeReader'
import StreamReader from '../util/StreamReader'

/** A concrete implementation of Sampler for RGBE (.hdr) images. */
export default class HdriSampler extends Sampler {
  public width = 0
  public height = 0
  public data = new Float32Array()

  protected header = {}
  protected xDir = 1
  protected yDir = -1

  /** Loads an HDR image into this sampler from a URI or existing buffer. */
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
    // Add an arbitrarily large number to allow wrapping around the edges, and snap to the nearest pixel
    const nX = Math.floor(wrap(x, 0, this.width))
    const nY = Math.floor(wrap(y, 0, this.width))

    // Get coordinate for the data in a 1D array; row-major order with 3 components per pixel
    const offset = (nY * this.width + nX) * 3

    // Get the RGB values from the data array
    const r = this.data[offset + 0]
    const g = this.data[offset + 1]
    const b = this.data[offset + 2]

    return new Color(r, g, b)
  }
}
