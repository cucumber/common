import assert from 'assert'
import { messages } from 'cucumber-messages'
import { stubMatchingStepDefinition } from './TestHelpers'

import StepDefinitionRegistry from '../src/StepDefinitionRegistry'

describe('StepDefinitionRegistry', () => {
  describe('#toMessages', () => {
    it('wraps each stepDefinitions.toMessages in an Envelope', () => {
      const stepDef1 = stubMatchingStepDefinition()
      const stepDef2 = stubMatchingStepDefinition()

      const registry = new StepDefinitionRegistry([stepDef1, stepDef2])
      assert.deepStrictEqual(registry.toMessages(), [
        stepDef1.toMessage(),
        stepDef2.toMessage(),
      ])
    })
  })
})
