export default class StreamReader {
  private pointer = 0
  private view: DataView

  constructor(data: ArrayBuffer) {
    this.view = new DataView(data)
  }

  public seek(offset: number) {
    this.pointer = offset
  }

  public rewind(offset: number) {
    this.pointer -= offset
  }

  public skip(offset: number) {
    this.pointer += offset
  }

  public readUint8() {
    const v = this.peekUint8()
    this.pointer += 1
    return v
  }

  public peekUint8() {
    return this.view.getUint8(this.pointer)
  }

  public readByte() {
    return this.readUint8()
  }

  public readBytes(length: number) {
    const result = new Uint8Array(length)

    for (let i = 0; i < length; i++) {
      result[i] = this.readByte()
    }

    return result
  }

  public peekByte() {
    return this.peekUint8()
  }

  public readUint16() {
    const v = this.peekUint16()
    this.pointer += 2
    return v
  }

  public peekUint16() {
    return this.view.getUint16(this.pointer)
  }

  public readLine() {
    let char = ''
    let result = ''

    while (char !== '\n') {
      result += char
      char = String.fromCharCode(this.readUint8())
    }

    return result
  }
}
