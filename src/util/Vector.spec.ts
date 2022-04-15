import { expect } from 'chai'
import Vector from './Vector'

describe('Vector', () => {
  it('can calculate a reflection vector', () => {
    const d = new Vector(0.5, 0.5, 0)

    expect(d.reflect(new Vector(-1, 0, 0))).to.deep.equal(new Vector(-0.5, 0.5, 0))
    expect(d.reflect(new Vector(0, -1, 0))).to.deep.equal(new Vector(0.5, -0.5, 0))
  })
})
