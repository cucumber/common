import assert from 'assert'
import makePredictableHookTestStep from '../../src/test-generation/makePredictableHookTestStep'
import { messages, IdGenerator } from '@cucumber/messages'
import PredictableHook from '../../src/PredictableHook'

describe('makePredictableHookTestStep', () => {
  const passedHook = new PredictableHook(
    'some-id',
    'scenario-id',
    'somewhere.rb:11',
    messages.TestStepFinished.TestStepResult.Status.PASSED,
    123456
  )

  it('returns undefined when the Hook does not match', () => {
    const pickle = messages.Pickle.create({
      astNodeIds: ['another-scenario-id'],
    })
    const step = makePredictableHookTestStep(
      pickle,
      passedHook,
      true,
      null,
      IdGenerator.uuid()
    )

    assert.equal(step, undefined)
  })

  it('creates a PredictableHookTestStep', async () => {
    const pickle = messages.Pickle.create({
      astNodeIds: ['scenario-id'],
    })
    const step = makePredictableHookTestStep(
      pickle,
      passedHook,
      true,
      null,
      IdGenerator.uuid()
    )
    const testResult = await step.execute(null, '', () => null)

    assert.equal(
      testResult.status,
      messages.TestStepFinished.TestStepResult.Status.PASSED
    )
    assert.equal(testResult.duration.seconds, 123)
  })
})
