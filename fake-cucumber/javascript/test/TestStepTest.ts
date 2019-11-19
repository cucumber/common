import assert from 'assert'
import { messages } from 'cucumber-messages'
import TestStep from '../src/TestStep'
import StepDefinitionRegistry from '../src/StepDefinitionRegistry'
import {
  stubFailingSupportCodeExecutor,
  stubMatchingStepDefinition,
  stubPassingSupportCodeExecutor,
  stubPendingSupportCodeExecutor,
} from './TestHelpers'

function execute(testStep: TestStep): messages.ITestStepFinished {
  const receivedMessages: messages.IEnvelope[] = []
  testStep.execute(
    message => receivedMessages.push(message),
    'some-testCaseStartedId'
  )
  return receivedMessages.pop().testStepFinished
}

describe('TestStep', () => {
  describe('#execute', () => {
    it('emits a TestStepFinished with status UNDEFINED when there are no matching step definitions', () => {
      const registry = new StepDefinitionRegistry([])
      const testStep = registry.createTestStep(
        'an undefined step',
        'pickle-step-id'
      )

      const testStepFinished = execute(testStep)

      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.UNDEFINED
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('emits a TestStepFinished with status AMBIGUOUS when there are multiple matching step definitions', () => {
      const registry = new StepDefinitionRegistry([
        stubMatchingStepDefinition(),
        stubMatchingStepDefinition(),
      ])
      const testStep = registry.createTestStep(
        'an ambiguous step',
        'pickle-step-id'
      )
      const testStepFinished = execute(testStep)
      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.AMBIGUOUS
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('returns the status', () => {
      const registry = new StepDefinitionRegistry([])
      const testStep = registry.createTestStep(
        'an undefined step',
        'pickle-step-id'
      )

      assert.strictEqual(
        testStep.execute(message => null, 'some-testCaseStartedId'),
        messages.TestResult.Status.UNDEFINED
      )
    })

    context('when there is a matching step definition', () => {
      it('emits a TestStepFinished with status PASSED when no exception is raised', () => {
        const registry = new StepDefinitionRegistry([
          stubMatchingStepDefinition(stubPassingSupportCodeExecutor()),
        ])
        const testStep = registry.createTestStep(
          'a passed step',
          'pickle-step-id'
        )
        const testStepFinished = execute(testStep)

        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.PASSED
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('emits a TestStepFinished with status PENDING when the string "pending" is returned', () => {
        const registry = new StepDefinitionRegistry([
          stubMatchingStepDefinition(stubPendingSupportCodeExecutor()),
        ])
        const testStep = registry.createTestStep(
          'a pending step',
          'pickle-step-id'
        )
        const testStepFinished = execute(testStep)

        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.PENDING
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })

      it('emits a TestStepFinished with status FAILED when an exception is raised', () => {
        const registry = new StepDefinitionRegistry([
          stubMatchingStepDefinition(
            stubFailingSupportCodeExecutor('This step has failed')
          ),
        ])

        const testStep = registry.createTestStep(
          'a failed step',
          'pickle-step-id'
        )
        const testStepFinished = execute(testStep)
        assert.strictEqual(
          testStepFinished.testResult.status,
          messages.TestResult.Status.FAILED
        )
        assert.strictEqual(testStepFinished.testStepId, testStep.id)
      })
    })
  })
})
