import assert from 'assert'
import makePredictableHookTestStep from '../../src/test-generation/makePredictableHookTestStep'
import * as messages from '@cucumber/messages'
import PredictableHook from '../../src/PredictableHook'

describe('makePredictableHookTestStep', () => {
  const passedHook = new PredictableHook(
    'some-id',
    'scenario-id',
    'somewhere.rb:11',
    'PASSED',
    123456
  )

  it('returns undefined when the Hook does not match', () => {
    const pickle: messages.Pickle = {
      ast_node_ids: ['another-scenario-id'],
    }
    const step = makePredictableHookTestStep(
      pickle,
      passedHook,
      true,
      null,
      messages.IdGenerator.uuid()
    )

    assert.strictEqual(step, undefined)
  })

  it('creates a PredictableHookTestStep', async () => {
    const pickle: messages.Pickle = {
      ast_node_ids: ['scenario-id'],
    }
    const step = makePredictableHookTestStep(
      pickle,
      passedHook,
      true,
      null,
      messages.IdGenerator.uuid()
    )
    const testResult = await step.execute(null, '', () => null)

    assert.strictEqual(testResult.status, 'PASSED')
    assert.strictEqual(testResult.duration.seconds, 123)
  })
})
