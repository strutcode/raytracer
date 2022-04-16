import Light from '../src/objects/Light'
import Vector from '../src/util/Vector'
import { benchmark } from './util'

const light = new Light(new Vector(0, 0, 0))

benchmark('phong', () => {
  const viewDir = Vector.randomUnit()
  const lightDir = Vector.randomUnit()
  const normal = Vector.randomUnit()

  light['calculatePhong'](viewDir, lightDir, normal)
})

benchmark('fast phong', () => {
  const viewDir = Vector.randomUnit()
  const lightDir = Vector.randomUnit()
  const normal = Vector.randomUnit()

  light['fastPhong'](viewDir, lightDir, normal)
})
