import assert from 'assert'
import PredictableSupportCode from '../src/PredictableSupportCode'
import { messages } from '@cucumber/messages'
import { SupportCode } from '@cucumber/fake-cucumber'
import PredictableHook from '../src/PredictableHook'
import PredictableStepDefinition from '../src/PredictableStepDefinition'

describe('PredictableSupportCode', () => {
  context('#addPredictableBeforeHook', () => {
    const supportCode = new SupportCode()
    const predictableSupportCode = new PredictableSupportCode(supportCode)
    const scenarioId = 'some-scenario-id'
    const pickle = messages.Pickle.create({
      astNodeIds: [scenarioId],
    })

    beforeEach(() => {
      predictableSupportCode.addPredictableBeforeHook(
        'some/where:7',
        scenarioId,
        'passed'
      )
    })

    it('adds a beforeHook', () => {
      assert.equal(supportCode.beforeHooks.length, 1)
    })

    it('adds a beforeHook that matches the pickle from the scenario', () => {
      const hook = supportCode.beforeHooks[0]
      assert.notEqual(hook.match(pickle), null)
    })

    it('adds a beforeHook with correct location', () => {
      const hook = supportCode.beforeHooks[0]

      assert.deepEqual(
        hook.toMessage().hook.sourceReference,
        messages.SourceReference.create({
          uri: 'some/where',
          location: messages.Location.create({
            line: 7,
          }),
        })
      )
    })

    it('adds a hook with a passed status when status is "passed"', () => {
      const hook = supportCode.beforeHooks[0] as PredictableHook
      assert.equal(
        hook.status,
        messages.TestStepFinished.TestStepResult.Status.PASSED
      )
    })

    it('adds a hook with a failed status when status is "failed"', () => {
      const supportCode = new SupportCode()
      const predictableSupportCode2 = new PredictableSupportCode(supportCode)
      predictableSupportCode2.addPredictableBeforeHook(
        'some/where:7',
        scenarioId,
        'failed',
        0.01,
        'BOOM !!'
      )
      const hook = supportCode.beforeHooks[0] as PredictableHook

      assert.equal(
        hook.status,
        messages.TestStepFinished.TestStepResult.Status.FAILED
      )
      assert.equal(hook.errorMessage, 'BOOM !!')
      assert.equal(hook.duration, 0.01)
    })
  })

  context('#addPredictableAfterHook', () => {
    const supportCode = new SupportCode()
    const predictableSupportCode2 = new PredictableSupportCode(supportCode)
    const scenarioId = 'some-scenario-id'
    const pickle = messages.Pickle.create({
      astNodeIds: [scenarioId],
    })

    beforeEach(() => {
      predictableSupportCode2.addPredictableAfterHook(
        'some/where:7',
        scenarioId,
        'passed'
      )
    })

    it('adds a beforeHook', () => {
      assert.equal(supportCode.afterHooks.length, 1)
    })

    it('adds a beforeHook that matches the pickle from the scenario', () => {
      const hook = supportCode.afterHooks[0]
      assert.notEqual(hook.match(pickle), null)
    })

    it('adds a beforeHook with correct location', () => {
      const hook = supportCode.afterHooks[0]

      assert.deepEqual(
        hook.toMessage().hook.sourceReference,
        messages.SourceReference.create({
          uri: 'some/where',
          location: messages.Location.create({
            line: 7,
          }),
        })
      )
    })

    it('adds a hook with a passed status when status is "passed"', () => {
      const hook = supportCode.afterHooks[0] as PredictableHook

      assert.equal(
        hook.status,
        messages.TestStepFinished.TestStepResult.Status.PASSED
      )
    })

    it('adds a hook with a failed status when status is "failed"', () => {
      const supportCode = new SupportCode()
      const predictableSupportCode2 = new PredictableSupportCode(supportCode)
      predictableSupportCode2.addPredictableAfterHook(
        'some/where:7',
        scenarioId,
        'failed',
        0.12,
        'BOOM !!'
      )
      const hook = supportCode.afterHooks[0] as PredictableHook

      assert.equal(
        hook.status,
        messages.TestStepFinished.TestStepResult.Status.FAILED
      )
      assert.equal(hook.errorMessage, 'BOOM !!')
      assert.equal(hook.duration, 0.12)
    })
  })

  context('.addPredictableStepDefinition', () => {
    const supportCode = new SupportCode()
    const predictableSupportCode = new PredictableSupportCode(supportCode)
    const stepId = 'some-step-id'
    const picklestep = messages.Pickle.PickleStep.create({
      astNodeIds: [stepId],
    })

    beforeEach(() => {
      predictableSupportCode.addPredictableStepDefinition(
        'somewhere/over/the/rain.bow:2',
        stepId,
        'passed'
      )
    })

    it('registers the step definition', () => {
      assert.equal(supportCode.stepDefinitions.length, 1)
    })

    it('creates a stepDefinition that matches the step id', () => {
      const stepDefinition = supportCode.stepDefinitions[0]
      assert.notEqual(stepDefinition.match(picklestep), null)
    })

    it('creates a stepDefinition with correct location', () => {
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

    context('when a status is provided', () => {
      it('creates a StepDefinition with status passed for "passed"', () => {
        const supportCode = new SupportCode()
        const predictableSupportCode = new PredictableSupportCode(supportCode)

        predictableSupportCode.addPredictableStepDefinition(
          'somewhere/over/the/rain.bow:2',
          stepId,
          'passed'
        )

        const stepDefinition = supportCode
          .stepDefinitions[0] as PredictableStepDefinition
        assert.equal(
          stepDefinition.status,
          messages.TestStepFinished.TestStepResult.Status.PASSED
        )
      })

      it('creates a StepDefinition with status pending for "pending"', () => {
        const supportCode = new SupportCode()
        const predictableSupportCode = new PredictableSupportCode(supportCode)

        predictableSupportCode.addPredictableStepDefinition(
          'somewhere/over/the/rain.bow:2',
          stepId,
          'pending'
        )

        const stepDefinition = supportCode
          .stepDefinitions[0] as PredictableStepDefinition
        assert.equal(
          stepDefinition.status,
          messages.TestStepFinished.TestStepResult.Status.PENDING
        )
      })

      it('creates a StepDefinition with status failed for "failed"', () => {
        const supportCode = new SupportCode()
        const predictableSupportCode = new PredictableSupportCode(supportCode)

        predictableSupportCode.addPredictableStepDefinition(
          'somewhere/over/the/rain.bow:2',
          stepId,
          'failed',
          1.23,
          'something wrong happened'
        )

        const stepDefinition = supportCode
          .stepDefinitions[0] as PredictableStepDefinition
        assert.equal(
          stepDefinition.status,
          messages.TestStepFinished.TestStepResult.Status.FAILED
        )
        assert.equal(stepDefinition.duration, 1.23)
      })
    })
  })
})
