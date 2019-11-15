import assert from 'assert'
import { messages } from 'cucumber-messages'
import TestStep from '../src/TestStep'
import StepDefinitionRegistry from '../src/StepDefinitionRegistry'
import {
  stubMatchingStepDefinition,
  stubPassingSupportCodeExecutor,
  stubFailingSupportCodeExecutor
} from './TestHelpers'


describe('TestStep', () => {
  describe('#execute', () => {
    it('returns UNDEFINED when there are no matching step definitions', () => {
      const registry = new StepDefinitionRegistry([])
      const testStep = registry.createTestStep('an undefined step', 'step-id')
      const testStepFinished = testStep.execute()
      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.UNDEFINED
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('returns AMBIGUOUS when there are multiple matching step definitions', () => {
      const registry = new StepDefinitionRegistry([
        stubMatchingStepDefinition(),
        stubMatchingStepDefinition(),
      ])
      const testStep = registry.createTestStep('an ambiguous step', 'step-id')
      const testStepFinished = testStep.execute()
      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.AMBIGUOUS
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    context('when there is a matching step definition', () => {
      it('returns PASSED when the match execution raises no exception', () => {
        const registry = new StepDefinitionRegistry([
          stubMatchingStepDefinition(stubPassingSupportCodeExecutor()),
        ])
        const testStep = registry.createTestStep('a passed step', 'step-id')
        const testStepFinished = testStep.execute()

        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.PASSED
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })


      it('bubbles up the error when the match execution raises one', () => {
        const registry = new StepDefinitionRegistry([
          stubMatchingStepDefinition(
            stubFailingSupportCodeExecutor('This step has failed')
          ),
        ])

        const testStep = registry.createTestStep('a failed step', 'step-id')
        const testStepFinished = testStep.execute()
        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.FAILED
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })
    })
  })
})