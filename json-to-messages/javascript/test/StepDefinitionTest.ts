import assert from 'assert'
import { messages } from '@cucumber/messages'
import {
  PassedCodeExecutor,
  PendingCodeExecutor,
  FailedCodeExecutor,
} from '../src/SupportCodeExecutor'
import StepDefinition, { makeStepDefinition } from '../src/StepDefinition'

describe('StepDefinition', () => {
  const executor = new PassedCodeExecutor('step-definition-id')

  describe('.match', () => {
    const stepDef = new StepDefinition(
      'step-definition-id',
      'some-id',
      executor,
      'path/to/steps',
      10
    )

    it('uses the step id as a reference', () => {
      const pickleStep = messages.Pickle.PickleStep.create({
        astNodeIds: ['some-other-id'],
      })

      assert.strictEqual(stepDef.match(pickleStep), null)
    })

    it('returns a SupportCodeExecutor object if the pickleStep references the stepId', () => {
      const pickleStep = messages.Pickle.PickleStep.create({
        astNodeIds: ['some-id'],
      })

      assert.deepEqual(stepDef.match(pickleStep), executor)
    })
  })
})

describe('makeStepDefinition', () => {
  const stepDefinitionId = 'step-definition-id'
  const stepId = 'whatever-step-id'
  const pickleStep = messages.Pickle.PickleStep.create({
    astNodeIds: [stepId],
  })

  context('when status is undefined', () => {
    it('returns null', () => {
      assert.strictEqual(
        makeStepDefinition(
          stepDefinitionId,
          stepId,
          'undefined',
          '',
          'path/to/steps:12'
        ),
        null
      )
    })
  })

  context('when status is passed', () => {
    const stepDefinition = makeStepDefinition(
      stepDefinitionId,
      stepId,
      'passed',
      '',
      'path/to/steps:12'
    )

    it('returns a StepDefinition', () => {
      assert.ok(stepDefinition instanceof StepDefinition)
    })

    it('returns a StepDefinition which references the correct step', () => {
      assert.notEqual(stepDefinition.match(pickleStep), null)
    })

    it('returns a StepDefinition which has a PassedCodeExecutor', () => {
      const executor = stepDefinition.match(pickleStep)
      assert.ok(executor instanceof PassedCodeExecutor)
    })

    it('returns a step definition with the correct path', () => {
      const message = stepDefinition.toMessage().stepDefinition
      assert.strictEqual(message.sourceReference.uri, 'path/to/steps')
      assert.strictEqual(message.sourceReference.location.line, 12)
    })
  })

  context('when status is pending', () => {
    const stepDefinition = makeStepDefinition(
      stepDefinitionId,
      stepId,
      'pending',
      '',
      'path/to/steps:12'
    )

    it('returns a StepDefinition', () => {
      assert.ok(stepDefinition instanceof StepDefinition)
    })

    it('returns a StepDefinition which references the correct step', () => {
      assert.notEqual(stepDefinition.match(pickleStep), null)
    })

    it('returns a StepDefinition which has a PendingCodeExecutor', () => {
      const executor = stepDefinition.match(pickleStep)
      assert.ok(executor instanceof PendingCodeExecutor)
    })
  })

  context('when status is failed', () => {
    const stacktrace = [
      'Woops (RuntimeError)',
      './features/statuses/statuses_steps.rb:5:in `"a failed step"',
      "features/statuses/statuses.feature:9:in `a failed step'",
    ].join('\n')

    const stepDefinition = makeStepDefinition(
      stepDefinitionId,
      stepId,
      'failed',
      stacktrace,
      'path/to/steps:12'
    )

    it('returns a StepDefinition', () => {
      assert.ok(stepDefinition instanceof StepDefinition)
    })

    it('returns a StepDefinition which references the correct step', () => {
      assert.notEqual(stepDefinition.match(pickleStep), null)
    })

    it('returns a StepDefinition which has a FailedCodeExecutor', () => {
      const executor = stepDefinition.match(pickleStep)
      assert.ok(executor instanceof FailedCodeExecutor)
    })
  })
})
