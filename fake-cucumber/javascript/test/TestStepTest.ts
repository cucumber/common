import assert from 'assert'
import { messages } from 'cucumber-messages'
import TestStep from '../src/TestStep'
import StepDefinitionRegistry from '../src/StepDefinitionRegistry'
import {
  stubMatchingStepDefinition,
  stubPassingSupportCodeExecutor,
  stubPendingSupportCodeExecutor,
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
      it('returns PASSED when no exception is raised', () => {
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

      it('returns PENDING when the string "pending" is returned', () => {
        const registry = new StepDefinitionRegistry([
          stubMatchingStepDefinition(stubPendingSupportCodeExecutor()),
        ])
        const testStep = registry.createTestStep('a pending step', 'step-id')
        const testStepFinished = testStep.execute()

        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.PENDING
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('returns FAILED when an exception is raised', () => {
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