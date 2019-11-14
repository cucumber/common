import assert from 'assert'
import { stubConstructor } from 'ts-sinon'
import { messages } from 'cucumber-messages'

import SupportCodeExecutor from '../src/SupportCodeExecutor'
import StepDefinition from '../src/StepDefinition'
import StepDefinitionRegistry from '../src/StepDefinitionRegistry'

describe('StepDefinitionRegistry', () => {
  context('execute', () => {
    function stubMatch(
      result: messages.TestResult.Status
    ): SupportCodeExecutor {
      const matchStub = stubConstructor<SupportCodeExecutor>(
        SupportCodeExecutor
      )
      matchStub.execute.returns(result)

      return matchStub
    }

    function stubMatchingStepDefinition(
      executor: SupportCodeExecutor = new SupportCodeExecutor(() => null, [])
    ): StepDefinition {
      const stepDefinitionStub = stubConstructor<StepDefinition>(StepDefinition)
      stepDefinitionStub.match.returns(executor)

      return stepDefinitionStub
    }

    it('returns UNDEFINED when there are no matching step definitions', () => {
      const subject = new StepDefinitionRegistry([])
      const status = subject.execute('whatever ...')
      assert.strictEqual(status, messages.TestResult.Status.UNDEFINED)
    })

    it('returns AMBIGUOUS when there are multiple matching step definitions', () => {
      const subject = new StepDefinitionRegistry([
        stubMatchingStepDefinition(),
        stubMatchingStepDefinition(),
      ])
      const status = subject.execute('ambiguous step')
      assert.strictEqual(status, messages.TestResult.Status.AMBIGUOUS)
    })

    it('returns the status after match execution', () => {
      const subject = new StepDefinitionRegistry([
        stubMatchingStepDefinition(
          stubMatch(messages.TestResult.Status.PASSED)
        ),
      ])
      const status = subject.execute('whatever ...')
      assert.strictEqual(status, messages.TestResult.Status.PASSED)
    })
  })
})
