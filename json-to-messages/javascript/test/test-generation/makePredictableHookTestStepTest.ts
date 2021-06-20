import assert from 'assert'
import makePredictableHookTestStep from '../../src/test-generation/makePredictableHookTestStep'
import * as messages from '@cucumber/messages'
import PredictableHook from '../../src/PredictableHook'

describe('makePredictableHookTestStep', () => {
  const passedHook = new PredictableHook(
    'some-id',
    'scenario-id',
    'somewhere.rb:11',
    messages.TestStepResultStatus.PASSED,
    123456
  )

  it('returns undefined when the Hook does not match', () => {
    const pickle: messages.Pickle = {
      astNodeIds: ['another-scenario-id'],
      steps: [],
      id: 'id',
      language: 'en',
      tags: [],
      uri: 'uri',
      name: 'Name',
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
      astNodeIds: ['scenario-id'],
      steps: [],
      id: 'id',
      language: 'en',
      tags: [],
      uri: 'uri',
      name: 'Name',
    }
    const step = makePredictableHookTestStep(
      pickle,
      passedHook,
      true,
      null,
      messages.IdGenerator.uuid()
    )
    const testResult = await step.execute(null, '', () => null, true)

    assert.strictEqual(testResult.status, messages.TestStepResultStatus.PASSED)
    assert.strictEqual(testResult.duration.seconds, 123)
  })
})
