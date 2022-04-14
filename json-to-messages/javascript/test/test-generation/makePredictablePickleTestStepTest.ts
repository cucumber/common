import assert from 'assert'
import makePredictablePickleTestStep from '../../src/test-generation/makePredictablePickleTestStep'
import * as messages from '@cucumber/messages'

import PredictableStepDefinition from '../../src/PredictableStepDefinition'

describe('makePredictablePickleTestStep', () => {
  it('returns a TestStep with status Undefined when there is no matching step', async () => {
    const step = makePredictablePickleTestStep(
      'test-step-id',
      {
        astNodeIds: [],
        id: '1',
        text: 'hello',
      },
      []
    )
    const result = await step.execute(null, 'some-id', () => null, true)

    assert.strictEqual(result.status, 'UNDEFINED')
    assert.strictEqual(result.duration.seconds, 0)
    assert.strictEqual(result.duration.nanos, 0)
  })

  it('returns a TestStep which will take the status of the first matching StepDefinition', async () => {
    const step = makePredictablePickleTestStep(
      'test-step-id',
      {
        astNodeIds: ['some-step-id'],
        id: '1',
        text: 'hello',
      },
      [
        new PredictableStepDefinition(
          'some-id',
          'some-step-id',
          'somewhere',
          messages.TestStepResultStatus.SKIPPED,
          987654
        ),
      ]
    )
    const result = await step.execute(null, 'some-id', () => null, true)

    assert.strictEqual(result.status, messages.TestStepResultStatus.SKIPPED)
    assert.strictEqual(result.duration.seconds, 987)
    assert.strictEqual(result.duration.nanos, 654000000)
  })

  it('correctly sets the error message if existing', async () => {
    const step = makePredictablePickleTestStep(
      'test-step-id',
      {
        astNodeIds: ['some-step-id'],
        id: '1',
        text: 'hello',
      },
      [
        new PredictableStepDefinition(
          'some-id',
          'some-step-id',
          'somewhere',
          messages.TestStepResultStatus.FAILED,
          987654,
          'An error has been raised here'
        ),
      ]
    )
    const result = await step.execute(null, 'some-id', () => null, true)

    assert.strictEqual(result.message, 'An error has been raised here')
  })
})
