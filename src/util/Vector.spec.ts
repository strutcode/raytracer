import { expect } from 'chai'
import Vector from './Vector'

describe('Vector', () => {
  it('can normalize a vector', () => {
    // A constant for the unit length of a 45 degree angle, i.e. x/sqrt(x*x*2) or sqrt(2)/2
    const l = 0.7071067811865475

    expect(new Vector(50, 0, 0).normalize()).to.deep.equal(new Vector(1, 0, 0))
    expect(new Vector(25, 25, 0).normalize()).to.deep.equal(new Vector(l, l, 0))
  })

  it('can calculate a dot product', () => {
    expect(new Vector(1, 0, 0).dot(new Vector(1, 0, 0))).to.equal(1)
    expect(new Vector(1, 0, 0).dot(new Vector(0, 1, 0))).to.equal(0)
    expect(new Vector(1, 0, 0).dot(new Vector(-1, 0, 0))).to.equal(-1)
  })

  it('can calculate a reflection vector', () => {
    const d = new Vector(1, 1, 0)

    expect(d.reflect(new Vector(-1, 0, 0))).to.deep.equal(new Vector(-1, 1, 0))
    expect(d.reflect(new Vector(0, -1, 0))).to.deep.equal(new Vector(1, -1, 0))
  })
})
