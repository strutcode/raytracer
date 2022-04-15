import { expect } from 'chai'
import Material from '../renderer/Material'
import Ray from '../util/Ray'
import Vector from '../util/Vector'
import Sphere from './Sphere'

describe('Sphere', () => {
  const sphere = new Sphere(new Vector(0, 0, 0), 1, new Material())

  it('can find intersections', () => {
    const forwardRay = new Ray(new Vector(0, 0, -1), new Vector(0, 0, 1))
    const backwardRay = new Ray(new Vector(0, 0, -1), new Vector(0, 0, -1))

    expect(sphere.intersect(forwardRay)).not.to.be.null
    expect(sphere.intersect(backwardRay)).to.be.null
  })

  it('calculates the point of intersection', () => {
    const ray = new Ray(new Vector(0, 0, -1), new Vector(0, 0, 1))
    const intersection = sphere.intersect(ray)

    if (!intersection) throw new Error('No intersection')

    expect(intersection.t).to.equal(0)
    expect(intersection.position).to.deep.equal({
      x: 0,
      y: 0,
      z: -1,
    })
  })

  it('provides a normal at intersection', () => {
    const ray = new Ray(new Vector(0, 0, -1), new Vector(0, 0, 1))
    const intersection = sphere.intersect(ray)

    if (!intersection) throw new Error('No intersection')

    expect(intersection.normal).to.deep.equal({
      x: 0,
      y: 0,
      z: -1,
    })
  })
})
