import Light from '../src/objects/Light'
import Vector from '../src/util/Vector'
import { benchmark } from './util'

const light = new Light(new Vector(0, 0, 0))

benchmark('phong', () => {
  const viewDir = new Vector(Math.random(), Math.random(), Math.random()).normalize()
  const lightDir = new Vector(Math.random(), Math.random(), Math.random()).normalize()
  const normal = new Vector(Math.random(), Math.random(), Math.random()).normalize()

  light['calculatePhong'](viewDir, lightDir, normal)
})

benchmark('fast phong', () => {
  const viewDir = new Vector(Math.random(), Math.random(), Math.random()).normalize()
  const lightDir = new Vector(Math.random(), Math.random(), Math.random()).normalize()
  const normal = new Vector(Math.random(), Math.random(), Math.random()).normalize()

  light['fastPhong'](viewDir, lightDir, normal)
})
