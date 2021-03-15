import assert from 'assert'
import PredictableSupportCode from '../src/PredictableSupportCode'
import * as messages from '@cucumber/messages'
import { SupportCode } from '@cucumber/fake-cucumber'
import PredictableHook from '../src/PredictableHook'
import PredictableStepDefinition from '../src/PredictableStepDefinition'

describe('PredictableSupportCode', () => {
  context('#addPredictableBeforeHook', () => {
    const supportCode = new SupportCode()
    const predictableSupportCode = new PredictableSupportCode(supportCode)
    const scenarioId = 'some-scenario-id'
    const pickle: messages.Pickle = {
      astNodeIds: [scenarioId],
      id: 'some-pickle-id',
      language: 'en',
      tags: [],
      steps: [],
      uri: 'some-uri',
      name: 'Some Name',
    }

    beforeEach(() => {
      predictableSupportCode.addPredictableBeforeHook('some/where:7', scenarioId, 'passed')
    })

    it('adds a beforeHook', () => {
      assert.strictEqual(supportCode.beforeHooks.length, 1)
    })

    it('adds a beforeHook that matches the pickle from the scenario', () => {
      const hook = supportCode.beforeHooks[0]
      assert.notStrictEqual(hook.match(pickle), null)
    })

    it('adds a beforeHook with correct location', () => {
      const hook = supportCode.beforeHooks[0]

      const expected: messages.SourceReference = {
        uri: 'some/where',
        location: { line: 7 },
      }
      assert.deepStrictEqual(hook.toMessage().hook.sourceReference, expected)
    })

    it('adds a hook with a passed status when status is "passed"', () => {
      const hook = supportCode.beforeHooks[0] as PredictableHook
      assert.strictEqual(hook.status, 'PASSED')
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

      assert.strictEqual(hook.status, 'FAILED')
      assert.strictEqual(hook.errorMessage, 'BOOM !!')
      assert.strictEqual(hook.duration, 0.01)
    })
  })

  context('#addPredictableAfterHook', () => {
    const supportCode = new SupportCode()
    const predictableSupportCode2 = new PredictableSupportCode(supportCode)
    const scenarioId = 'some-scenario-id'
    const pickle: messages.Pickle = {
      astNodeIds: [scenarioId],
      id: 'some-pickle-id',
      language: 'en',
      tags: [],
      steps: [],
      uri: 'some-uri',
      name: 'Some Name',
    }

    beforeEach(() => {
      predictableSupportCode2.addPredictableAfterHook('some/where:7', scenarioId, 'passed')
    })

    it('adds a beforeHook', () => {
      assert.strictEqual(supportCode.afterHooks.length, 1)
    })

    it('adds a beforeHook that matches the pickle from the scenario', () => {
      const hook = supportCode.afterHooks[0]
      assert.notStrictEqual(hook.match(pickle), null)
    })

    it('adds a beforeHook with correct location', () => {
      const hook = supportCode.afterHooks[0]

      const sourceReference: messages.SourceReference = {
        uri: 'some/where',
        location: {
          line: 7,
        },
      }
      assert.deepStrictEqual(hook.toMessage().hook.sourceReference, sourceReference)
    })

    it('adds a hook with a passed status when status is "passed"', () => {
      const hook = supportCode.afterHooks[0] as PredictableHook

      assert.strictEqual(hook.status, 'PASSED')
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

      assert.strictEqual(hook.status, 'FAILED')
      assert.strictEqual(hook.errorMessage, 'BOOM !!')
      assert.strictEqual(hook.duration, 0.12)
    })
  })

  context('.addPredictableStepDefinition', () => {
    const supportCode = new SupportCode()
    const predictableSupportCode = new PredictableSupportCode(supportCode)
    const stepId = 'some-step-id'
    const picklestep: messages.PickleStep = {
      astNodeIds: [stepId],
      text: 'hello',
      id: 'step-id',
    }

    beforeEach(() => {
      predictableSupportCode.addPredictableStepDefinition(
        'somewhere/over/the/rain.bow:2',
        stepId,
        'passed'
      )
    })

    it('registers the step definition', () => {
      assert.strictEqual(supportCode.stepDefinitions.length, 1)
    })

    it('creates a stepDefinition that matches the step id', () => {
      const stepDefinition = supportCode.stepDefinitions[0]
      assert.notStrictEqual(stepDefinition.match(picklestep), null)
    })

    it('creates a stepDefinition with correct location', () => {
      const stepDefinition = supportCode.stepDefinitions[0]

      const sourceReference: messages.SourceReference = {
        uri: 'somewhere/over/the/rain.bow',
        location: {
          line: 2,
        },
      }
      assert.deepStrictEqual(
        stepDefinition.toMessage().stepDefinition.sourceReference,
        sourceReference
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

        const stepDefinition = supportCode.stepDefinitions[0] as PredictableStepDefinition
        assert.strictEqual(stepDefinition.status, 'PASSED')
      })

      it('creates a StepDefinition with status pending for "pending"', () => {
        const supportCode = new SupportCode()
        const predictableSupportCode = new PredictableSupportCode(supportCode)

        predictableSupportCode.addPredictableStepDefinition(
          'somewhere/over/the/rain.bow:2',
          stepId,
          'pending'
        )

        const stepDefinition = supportCode.stepDefinitions[0] as PredictableStepDefinition
        assert.strictEqual(stepDefinition.status, 'PENDING')
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

        const stepDefinition = supportCode.stepDefinitions[0] as PredictableStepDefinition
        assert.strictEqual(stepDefinition.status, 'FAILED')
        assert.strictEqual(stepDefinition.duration, 1.23)
      })
    })
  })
})
