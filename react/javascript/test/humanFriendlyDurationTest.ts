import assert from 'assert'
import humanFriendlyDuration from '../src/humanFriendlyDuration'

describe('humanFriendlyDuration', () => {
  context('sub-seconds', () => {
    it('only sets the millis field', () => {
      const result = humanFriendlyDuration(123)

      assert.strictEqual(result.millis, 123)
      assert.strictEqual(result.seconds, undefined)
      assert.strictEqual(result.minutes, undefined)
      assert.strictEqual(result.hours, undefined)
      assert.strictEqual(result.days, undefined)
    })

    it('has a default precision of 2', () => {
      const result = humanFriendlyDuration(123.45678)
      assert.strictEqual(result.millis, 123.46)
    })
  })

  context('sub-minutes', () => {
    it('only sets the seconds', () => {
      const result = humanFriendlyDuration(1034)

      assert.strictEqual(result.millis, undefined)
      assert.strictEqual(result.seconds, 1.034)
      assert.strictEqual(result.minutes, undefined)
      assert.strictEqual(result.hours, undefined)
      assert.strictEqual(result.days, undefined)
    })
  })

  context('sub-hours', () => {
    it('only sets the minutes and seconds field', () => {
      const result = humanFriendlyDuration(123456)

      assert.strictEqual(result.millis, undefined)
      assert.strictEqual(result.seconds, 3.456)
      assert.strictEqual(result.minutes, 2)
      assert.strictEqual(result.hours, undefined)
      assert.strictEqual(result.days, undefined)
    })
  })

  context('sub-days', () => {
    it('only sets the hours, minutes and seconds field', () => {
      const result = humanFriendlyDuration(3661123)

      assert.strictEqual(result.millis, undefined)
      assert.strictEqual(result.seconds, 1.123)
      assert.strictEqual(result.minutes, 1)
      assert.strictEqual(result.hours, 1)
      assert.strictEqual(result.days, undefined)
    })
  })

  context('days and more', () => {
    it('only sets the hours, minutes and seconds field', () => {
      const result = humanFriendlyDuration((25 * 3600 + 61) * 1000 + 111)

      assert.strictEqual(result.millis, undefined)
      assert.strictEqual(result.seconds, 1.111)
      assert.strictEqual(result.minutes, 1)
      assert.strictEqual(result.hours, 1)
      assert.strictEqual(result.days, 1)
    })
  })
})
