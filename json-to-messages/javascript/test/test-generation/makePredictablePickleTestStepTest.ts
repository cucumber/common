import assert from 'assert'
import makePredictablePickleTestStep from '../../src/test-generation/makePredictablePickleTestStep'

import { messages } from '@cucumber/messages'
import PredictableStepDefinition from '../../src/PredictableStepDefinition'

describe('makePredictablePickleTestStep', () => {
  it('returns a TestStep with status Undefined when there is no matching step', async () => {
    const step = makePredictablePickleTestStep(
      'test-step-id',
      messages.Pickle.PickleStep.create(),
      []
    )
    const result = await step.execute(null, 'some-id', () => null)

    assert.equal(result.status, messages.TestStepResult.Status.UNDEFINED)
    assert.equal(result.duration.seconds, 0)
    assert.equal(result.duration.nanos, 0)
  })

  it('returns a TestStep which will take the status of the first matching StepDefinition', async () => {
    const step = makePredictablePickleTestStep(
      'test-step-id',
      messages.Pickle.PickleStep.create({
        astNodeIds: ['some-step-id'],
      }),
      [
        new PredictableStepDefinition(
          'some-id',
          'some-step-id',
          'somewhere',
          messages.TestStepResult.Status.SKIPPED,
          987654
        ),
      ]
    )
    const result = await step.execute(null, 'some-id', () => null)

    assert.equal(result.status, messages.TestStepResult.Status.SKIPPED),
      assert.equal(result.duration.seconds, 987)
    assert.equal(result.duration.nanos, 654000000)
  })
})
