import { performance } from 'perf_hooks'

export function benchmark(name: string, fn: () => void, iterations = 10000) {
  const start = performance.now()

  for (let i = 0; i < iterations; i++) {
    fn()
  }

  const end = performance.now()
  console.log(`${name}: ${(end - start).toFixed(2)}ms`)

  return end - start
}
