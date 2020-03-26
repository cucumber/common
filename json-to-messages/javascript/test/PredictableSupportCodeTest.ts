import assert from 'assert'
import PredictableSupportCode from '../src/PredictableSupportCode'
import { messages } from '@cucumber/fake-cucumber/node_modules/@cucumber/messages'
import StepDefinition from '../src/StepDefinition'
import { PassedCodeExecutor, PendingCodeExecutor, FailedCodeExecutor } from '../src/SupportCodeExecutor'
import IPredictableSupportCode from '../src/IPredictableSupportCode'

describe('PredictableSupportCode', () => {
  const stepId = 'some-step-id'
  const picklestep = messages.Pickle.PickleStep.create({
    astNodeIds: [stepId],
  })

  describe('addPredictableStepDefinition', () => {
    it('registers the step definition', () => {
      const supportCode = new PredictableSupportCode()

      supportCode.addPredictableStepDefinition(
        'somewhere/over/the/rain.bow:2',
        stepId,
        'passed'
      )

      assert.equal(supportCode.stepDefinitions.length, 1)
    })

    it('creates a stepDefinition that matches the step id', () => {
      const supportCode = new PredictableSupportCode()

      supportCode.addPredictableStepDefinition(
        'somewhere/over/the/rain.bow:2',
        stepId,
        'passed'
      )

      const stepDefinition = supportCode.stepDefinitions[0]
      assert.notEqual(stepDefinition.match(picklestep), null)
    })

    it('creates a stepDefinition with correct location', () => {
      const supportCode = new PredictableSupportCode()

      supportCode.addPredictableStepDefinition(
        'somewhere/over/the/rain.bow:2',
        stepId,
        'passed'
      )
      const stepDefinition = supportCode.stepDefinitions[0]

      assert.deepEqual(
        stepDefinition.toMessage().stepDefinition.sourceReference,
        messages.SourceReference.create({
          uri: 'somewhere/over/the/rain.bow',
          location: messages.Location.create({
            line: 2,
          }),
        })
      )
    })

    it('creates a StepDefinition with a PassedCodeExecutor when the step passes', () => {
      const supportCode = new PredictableSupportCode()

      supportCode.addPredictableStepDefinition(
        'somewhere/over/the/rain.bow:2',
        stepId,
        'passed'
      )

      const stepDefinition = supportCode.stepDefinitions[0]
      assert.ok(
        stepDefinition.match(picklestep) instanceof PassedCodeExecutor
      )
    })

    it('creates a StepDefinition with a PendingCodeExecutor when the step passes', () => {
      const supportCode = new PredictableSupportCode()

      supportCode.addPredictableStepDefinition(
        'somewhere/over/the/rain.bow:2',
        stepId,
        'pending'
      )

      const stepDefinition = supportCode.stepDefinitions[0]
      assert.ok(
        stepDefinition.match(picklestep) instanceof PendingCodeExecutor
      )
    })

    it('creates a StepDefinition with a FailedCodeExecutor when the step passes', () => {
      const supportCode = new PredictableSupportCode()

      supportCode.addPredictableStepDefinition(
        'somewhere/over/the/rain.bow:2',
        stepId,
        'failed',
        'something wrong happened'
      )

      const stepDefinition = supportCode.stepDefinitions[0]
      assert.ok(
        stepDefinition.match(picklestep) instanceof FailedCodeExecutor
      )
    })
  })
})
