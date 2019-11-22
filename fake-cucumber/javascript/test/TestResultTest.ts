import { messages } from 'cucumber-messages'
import TestResult from '../src/TestResult'
import assert from 'assert'

describe('TestResult', () => {
  context('#toMessage', () => {
    it('produces a TestResult message', () => {
      const result = new TestResult(
        messages.TestResult.Status.FAILED,
        123,
        'Something went wrong'
      )
      const msg = result.toMessage()

      assert.strictEqual(msg.status, messages.TestResult.Status.FAILED)
      assert.strictEqual(msg.message, 'Something went wrong')
    })

    it('duration is computed', () => {
      const result = new TestResult(
        messages.TestResult.Status.FAILED,
        9876543210,
        'Something went wrong'
      )
      const msg = result.toMessage()

      assert.strictEqual(msg.duration.seconds, 9)
      assert.strictEqual(msg.duration.nanos, 876543210)
    })
  })
})
