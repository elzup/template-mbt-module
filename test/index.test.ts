import { describe, expect, it } from 'vitest'
import { add, greet } from '../lib/esm/index.js'

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(1, 2)).toBe(3)
  })

  it('should handle negative numbers', () => {
    expect(add(-1, 1)).toBe(0)
  })

  it('should handle zero', () => {
    expect(add(0, 0)).toBe(0)
  })
})

describe('greet', () => {
  it('should greet with name', () => {
    expect(greet('World')).toBe('Hello, World!')
  })

  it('should greet MoonBit', () => {
    expect(greet('MoonBit')).toBe('Hello, MoonBit!')
  })
})
