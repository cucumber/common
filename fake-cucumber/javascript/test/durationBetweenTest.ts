import assert from 'assert'
import durationBetween from '../src/durationBetween'

describe('durationBetween', () => {
  it('computes nanos and seconds', function() {
    const duration = durationBetween(0, 1234)
    assert.strictEqual(duration.seconds, 1)
    assert.strictEqual(duration.nanos, 234000000)
  })
})
