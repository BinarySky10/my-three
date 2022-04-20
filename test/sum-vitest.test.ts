import { assert, describe, expect, it } from 'vitest'
import { sum } from './sum-vitest'
describe('vitest name', () => {
  it('sum', () => {
    expect(sum(1, 2)).toEqual(3)
    // expect(true).to.be.true
  })

  it('bar', () => {
    assert.equal(Math.sqrt(4), 2)
  })

  it('snapshot', () => {
    expect({ foo: 'bar' }).toMatchSnapshot()
  })
})
