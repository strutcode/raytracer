export function lerp(a: number, b: number, alpha: number) {
  return a + alpha * (b - a)
}

export function wrap(x: number, min: number, max: number) {
  if (x < min) {
    return max + (x % max)
  }

  return x % max
}
