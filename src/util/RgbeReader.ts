import StreamReader from './StreamReader'

export type RgbeHeader = {
  FORMAT?: string
  GAMMA?: number
  EXPOSURE?: number
  COLORCORR?: [number, number, number]
}

export function checkMagic(stream: StreamReader) {
  const magic = stream.readBytes(11)
  const magicString = [...magic].map((b) => String.fromCharCode(b)).join('')

  return magicString === '#?RADIANCE\n'
}

export function readHeader(stream: StreamReader): RgbeHeader {
  const lines = []
  const header: RgbeHeader = {}

  while (true) {
    const line = stream.readLine()

    if (line.length === 0) break

    lines.push(line)
  }

  lines.forEach((line) => {
    if (line.startsWith('#')) return
    if (line.length === 0) return

    const eqIndex = line.indexOf('=')
    const key = line.slice(0, eqIndex)
    const value = line.slice(eqIndex + 1)

    switch (key) {
      case 'FORMAT':
        header.FORMAT = value
        break
      case 'GAMMA':
        header.GAMMA = parseFloat(value)
        break
      case 'EXPOSURE':
        header.EXPOSURE = parseFloat(value)
        break
      case 'COLORCORR':
        const parts = value.split(' ').map((v) => parseFloat(v))
        header.COLORCORR = parts as [number, number, number]
        break
      default:
        console.warn(`Unrecognized header in HDR image: ${line}`)
    }
  })

  return header
}

export function readDimensions(stream: StreamReader) {
  const dims = stream.readLine()
  const parts = dims.split(' ')
  const output = {
    yDir: -1,
    xDir: 1,
    width: 0,
    height: 0,
  }

  parts.forEach((part, i) => {
    if (part == '-Y') {
      output.yDir = -1
    } else if (part == '+Y') {
      output.yDir = 1
    } else if (part == '-X') {
      output.xDir = -1
    } else if (part == '+X') {
      output.xDir = 1
    } else {
      const lastPart = parts[i - 1]

      if (lastPart.endsWith('X')) {
        output.width = parseInt(part)
      } else {
        output.height = parseInt(part)
      }
    }
  })

  return output
}

export function readData(stream: StreamReader, width: number, height: number) {
  const data = new Float32Array(width * height * 3)

  for (let y = 0; y < height; y++) {
    const line = readScanline(stream, width)

    for (let x = 0; x < width; x++) {
      const [r, g, b] = readPixel(line, x)
      const offset = (y * width + x) * 3

      data[offset + 0] = r
      data[offset + 1] = g
      data[offset + 2] = b
    }
  }

  return data
}

export function readScanline(stream: StreamReader, width: number) {
  const line = new Uint8Array(width * 4)
  // console.log('scanline')

  const header = stream.readUint16()

  if (header !== 0x0202) {
    stream.rewind(2)
    throw new Error(`Invalid scanline header: ${header}, expected ${0x0202}`)
  }

  const scanlineWidth = stream.readUint16()

  if (scanlineWidth !== width) {
    throw new Error(`Invalid scanline width: ${scanlineWidth}, expected ${width}`)
  }

  readComponent(stream, line, 0) // r
  readComponent(stream, line, 1) // g
  readComponent(stream, line, 2) // b
  readComponent(stream, line, 3) // e

  return line
}

export function readComponent(stream: StreamReader, line: Uint8Array, offset: number) {
  for (let x = 0; x < line.length / 4;) {
    const token = stream.readByte()

    if (token > 128) {
      const length = token - 128
      const value = stream.readByte()

      for (let rle = 0; rle < length; rle++) {
        line[offset + x * 4] = value
        x++
      }
    } else {
      for (let rle = 0; rle < token; rle++) {
        line[offset + x * 4] = stream.readByte()
        x++
      }
    }
  }
}

export function readPixel(line: Uint8Array, x: number) {
  const e = line[x * 4 + 3]

  const factor = e ? Math.pow(2, e - 136) : 0

  const r = line[x * 4 + 0] * factor
  const g = line[x * 4 + 1] * factor
  const b = line[x * 4 + 2] * factor

  return [r, g, b]
}
