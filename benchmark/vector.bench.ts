import Vector from '../src/util/Vector'
import { benchmark } from './util'

benchmark('duplicate', () => {
  Vector.right.copy().mul(10).copy().reflect(Vector.up)
})

benchmark('in place', () => {
  Vector.right.mul(10).reflect(Vector.up)
})
