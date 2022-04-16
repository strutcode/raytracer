import { expect } from 'chai'
import Vector from '../util/Vector'
import Light from './Light'

describe('Light', () => {
  it('can calculate Phong reflections', () => {
    const light = new Light(new Vector(0, 0, 0))
    const lightDir = new Vector(1, 0, 0)
    const normal = new Vector(-1, -1, 0).normalize()
    const normal2 = new Vector(-1, 1, 0).normalize()
    const viewDir = new Vector(0, 1, 0)

    expect(light['calculatePhong'](viewDir, lightDir, normal)).to.be.approximately(0, 0.001)
    expect(light['calculatePhong'](viewDir, lightDir, normal2)).to.be.approximately(1, 0.001)
  })
})
