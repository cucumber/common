import assert from 'assert'
import * as messages from '@cucumber/messages'
import { PredictablePickleTestStep } from '../src/PredictableTestSteps'

describe('PredictablePickleTestStep', () => {
  context('execute', () => {
    it('emits a TeststepFinished message with excepted status', async () => {
      const step = new PredictablePickleTestStep(
        'some-id',
        'source-id',
        true,
        'step-definition-id',
        'PASSED',
        123456
      )
      const emitted: messages.Envelope[] = []
      await step.execute(null, 'test-case-started-id', (envelope) => {
        emitted.push(envelope)
      })
      const testStepFinished = emitted[1].testStepFinished

      assert.strictEqual(testStepFinished.test_step_result.status, 'PASSED')
      assert.strictEqual(testStepFinished.test_step_result.duration.seconds, 123)
      assert.strictEqual(testStepFinished.test_step_result.duration.nanos, 456000000)
    })
  })
})
