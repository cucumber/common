import { messages } from 'cucumber-messages'
import TestResult from '../src/TestResult'
import assert from 'assert'

describe('TestResult', () => {
  context('#toMessage', () => {
    it('produces a TestResult message', () => {
      const result = new TestResult(
        messages.TestResult.Status.FAILED,
        'Something went wrong'
      )
      const msg = result.toMessage()

      assert.strictEqual(msg.status, messages.TestResult.Status.FAILED)
      assert.strictEqual(msg.message, 'Something went wrong')
    })

    it('produces a hardcoded duration', () => {
      const result = new TestResult(
        messages.TestResult.Status.FAILED,
        'Something went wrong'
      )
      const msg = result.toMessage()

      assert.strictEqual(msg.duration.seconds, 123)
      assert.strictEqual(msg.duration.nanos, 456)
    })
  })
})