import assert from 'assert'
import { messages } from '@cucumber/messages'
import SupportCodeExecutor from '@cucumber/fake-cucumber/dist/src/SupportCodeExecutor'
import StepDefinition, { makeStepDefinition } from '../src/StepDefinition'

describe('StepDefinition', () => {
  const stepDef = new StepDefinition(
    'some-id',
    () => 'This has been executed :)'
  )

  describe('.match', () => {
    const stepDef = new StepDefinition(
      'some-id',
      () => 'This has been executed :)'
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

      assert.ok(stepDef.match(pickleStep) instanceof SupportCodeExecutor)
    })

    it('returns a SupportCodeExecutor that will run code given upon creation', () => {
      const pickleStep = messages.Pickle.PickleStep.create({
        astNodeIds: ['some-id'],
      })
      const executor = stepDef.match(pickleStep)
      assert.strictEqual(executor.execute(null), 'This has been executed :)')
    })
  })

  describe('.getArguments', () => {
    it('returns an empty string', () => {
      assert.deepEqual(stepDef.getArguments(), [])
    })
  })
})

describe('makeStepDefinition', () => {
  const stepId = 'whatever-step-id'
  const pickleStep = messages.Pickle.PickleStep.create({
    astNodeIds: [stepId]
  })

  context('when status is undefined', () => {
    it('returns null', () => {
      assert.strictEqual(makeStepDefinition(stepId, 'undefined', ''), null)
    })
  })

  context('when status is passed', () => {
    const stepDefinition = makeStepDefinition(stepId, 'passed', '')

    it('returns a StepDefinition', () => {
      assert.ok(stepDefinition instanceof StepDefinition)
    })

    it('returns a StepDefinition which references the correct step', () => {
      assert.notEqual(stepDefinition.match(pickleStep), null)
    })

    it('returns a StepDefinition which returns undefined upon execution', () => {
      const executor = stepDefinition.match(pickleStep)
      assert.strictEqual(executor.execute(null), undefined)
    })
  })

  context('when status is pending', () => {
    const stepDefinition = makeStepDefinition(stepId, 'pending', '')

    it('returns a StepDefinition', () => {
      assert.ok(stepDefinition instanceof StepDefinition)
    })

    it('returns a StepDefinition which references the correct step', () => {
      assert.notEqual(stepDefinition.match(pickleStep), null)
    })

    it('returns a StepDefinition which returns "pending" upon execution', () => {
      const executor = stepDefinition.match(pickleStep)
      assert.strictEqual(executor.execute(null), "pending")
    })
  })

  context('when status is failed', () => {
    const stacktrace = [
      'Woops (RuntimeError)',
      './features/statuses/statuses_steps.rb:5:in `"a failed step"',
      "features/statuses/statuses.feature:9:in `a failed step'",
    ].join('\n')

    const stepDefinition = makeStepDefinition(stepId, 'failed', stacktrace)

    it('returns a StepDefinition', () => {
      assert.ok(stepDefinition instanceof StepDefinition)
    })

    it('returns a StepDefinition which references the correct step', () => {
      assert.notEqual(stepDefinition.match(pickleStep), null)
    })

    it('returns a StepDefinition which raises an exception upon execution', () => {
      const executor = stepDefinition.match(pickleStep)
      assert.throws(() => { executor.execute(null)} )
    })

    it('produces an error with a custom stack trace', () => {
      try {
        const executor = stepDefinition.match(pickleStep)
        executor.execute(null)
      } catch (err) {
        assert.strictEqual(err.msg, 'Woops (RuntimeError)')
        assert.strictEqual(
          err.stack,
          [
            './features/statuses/statuses_steps.rb:5:in `"a failed step"',
            "features/statuses/statuses.feature:9:in `a failed step'",
          ].join('\n')
        )
      }
    })
  })
})
