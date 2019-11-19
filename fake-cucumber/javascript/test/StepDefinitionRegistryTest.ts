import assert from 'assert'
import { messages } from 'cucumber-messages'
import { stubMatchingStepDefinition } from './TestHelpers'

import StepDefinitionRegistry from '../src/StepDefinitionRegistry'
import gherkin from 'gherkin'
import FakeTestResultsStream from '../src/FakeTestResultsStream'
import { Readable } from 'stream'

describe('StepDefinitionRegistry', () => {
  describe('makeTestPlan', () => {
    it('builds a plan from pickles', () => {
      const stepDef = stubMatchingStepDefinition()

      const registry = new StepDefinitionRegistry([stepDef])
    })
  })

  describe('#toMessages', () => {
    it('wraps each stepDefinitions.toMessages in an Envelope', () => {
      const stepDef1 = stubMatchingStepDefinition()
      const stepDef2 = stubMatchingStepDefinition()

      const registry = new StepDefinitionRegistry([stepDef1, stepDef2])
      assert.deepStrictEqual(registry.toMessages(), [
        new messages.Envelope({
          stepDefinitionConfig: stepDef1.toMessage(),
        }),
        new messages.Envelope({
          stepDefinitionConfig: stepDef2.toMessage(),
        }),
      ])
    })
  })
})
