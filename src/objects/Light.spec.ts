import { expect } from 'chai'
import Vector from '../util/Vector'
import Light from './Light'

describe('Light', () => {
  it('can calculate Phong reflections', () => {
    const light = new Light(Vector.zero)
    const lightDir = Vector.right
    const normal = new Vector(-1, -1, 0).normalize()
    const normal2 = new Vector(-1, 1, 0).normalize()
    const viewDir = Vector.up

    expect(light['calculatePhong'](viewDir, lightDir, normal)).to.be.approximately(0, 0.001)
    expect(light['calculatePhong'](viewDir, lightDir, normal2)).to.be.approximately(1, 0.001)
  })
})
