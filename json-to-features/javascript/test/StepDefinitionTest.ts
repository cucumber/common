import assert from 'assert'
import { messages } from '@cucumber/messages'
import SupportCodeExecutor from '@cucumber/fake-cucumber/dist/src/SupportCodeExecutor'
import StepDefinition from '../src/StepDefinition'

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
      assert.deepEqual(stepDef.getArguments('whatever text'), [])
    })
  })
})
