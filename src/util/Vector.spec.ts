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
    expect(Vector.right.dot(Vector.right)).to.equal(1)
    expect(Vector.right.dot(Vector.up)).to.equal(0)
    expect(Vector.right.dot(Vector.left)).to.equal(-1)
  })

  it('can calculate a reflection vector', () => {
    const upRight = new Vector(1, 1, 0)
    const upLeft = new Vector(-1, 1, 0)
    const downRight = new Vector(1, -1, 0)

    expect(upRight.reflect(Vector.left)).to.deep.equal(upLeft)
    expect(upRight.reflect(Vector.down)).to.deep.equal(downRight)
  })
})
