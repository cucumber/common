import assert from 'assert'
import makePredictablePickleTestStep from '../../src/test-generation/makePredictablePickleTestStep'

import PredictableStepDefinition from '../../src/PredictableStepDefinition'

describe('makePredictablePickleTestStep', () => {
  it('returns a TestStep with status Undefined when there is no matching step', async () => {
    const step = makePredictablePickleTestStep('test-step-id', {}, [])
    const result = await step.execute(null, 'some-id', () => null)

    assert.strictEqual(result.status, 'UNDEFINED')
    assert.strictEqual(result.duration.seconds, 0)
    assert.strictEqual(result.duration.nanos, 0)
  })

  it('returns a TestStep which will take the status of the first matching StepDefinition', async () => {
    const step = makePredictablePickleTestStep(
      'test-step-id',
      {
        astNodeIds: ['some-step-id'],
      },
      [new PredictableStepDefinition('some-id', 'some-step-id', 'somewhere', 'SKIPPED', 987654)]
    )
    const result = await step.execute(null, 'some-id', () => null)

    assert.strictEqual(result.status, 'SKIPPED')
    assert.strictEqual(result.duration.seconds, 987)
    assert.strictEqual(result.duration.nanos, 654000000)
  })

  it('correctly sets the error message if existing', async () => {
    const step = makePredictablePickleTestStep(
      'test-step-id',
      {
        astNodeIds: ['some-step-id'],
      },
      [
        new PredictableStepDefinition(
          'some-id',
          'some-step-id',
          'somewhere',
          'FAILED',
          987654,
          'An error has been raised here'
        ),
      ]
    )
    const result = await step.execute(null, 'some-id', () => null)

    assert.strictEqual(result.message, 'An error has been raised here')
  })
})
