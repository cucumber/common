import assert from 'assert'
import * as messages from '@cucumber/messages'
import ExpressionStepDefinition from '../src/ExpressionStepDefinition'
import {
  CucumberExpression,
  ParameterTypeRegistry,
  RegularExpression,
} from '@cucumber/cucumber-expressions'
import TestWorld from './TestWorld'

describe('StepDefinition', () => {
  describe('#match', () => {
    it('returns null when there is no match', () => {
      const expression = new CucumberExpression('banana', new ParameterTypeRegistry())
      const stepdef = new ExpressionStepDefinition('stepdef-id', expression, null, () => null)
      const pickleStep: messages.PickleStep = {
        text: 'apple',
        astNodeIds: [],
        id: '1',
      }
      const match = stepdef.match(pickleStep)
      assert.strictEqual(match, null)
    })

    it('returns a SupportCodeExecutor object when there is a match', () => {
      const expression = new CucumberExpression('I have {int} cukes', new ParameterTypeRegistry())
      const stepdef = new ExpressionStepDefinition(
        'stepdef-id',
        expression,
        null,
        (cukeCount: number) => cukeCount
      )
      const pickleStep: messages.PickleStep = {
        text: 'I have 7 cukes',
        astNodeIds: [],
        id: '1',
      }
      const executor = stepdef.match(pickleStep)
      assert.strictEqual(executor.execute(new TestWorld()), 7)
    })
  })

  describe('#toMessage', () => {
    it('generates a StepDefinition object for RegularExpression', () => {
      const expression = new RegularExpression(/banana/, new ParameterTypeRegistry())
      const stepdef = new ExpressionStepDefinition('stepdef-id', expression, null, () => null)
      const message = stepdef.toMessage()

      assert.strictEqual(message.stepDefinition.pattern.type, 'REGULAR_EXPRESSION')
    })

    it('generates a StepDefinition object for CucumberExpression', () => {
      const expression = new CucumberExpression('banana', new ParameterTypeRegistry())
      const stepdef = new ExpressionStepDefinition('stepdef-id', expression, null, () => null)
      const message = stepdef.toMessage()

      assert.strictEqual(message.stepDefinition.pattern.type, 'CUCUMBER_EXPRESSION')
    })
  })
})
