import assert from 'assert'
import { messages } from 'cucumber-messages'
import StepDefinition from '../src/StepDefinition'
import { CucumberExpression, ParameterTypeRegistry } from 'cucumber-expressions'
import RegularExpression from 'cucumber-expressions/dist/src/RegularExpression'

describe('StepDefinition', () => {
  describe('#match', () => {
    it('returns null when there is no match', () => {
      const expression = new CucumberExpression(
        'banana',
        new ParameterTypeRegistry()
      )
      const stepdef = new StepDefinition(expression, () => null)
      const match = stepdef.match('apple')
      assert.strictEqual(match, null)
    })

    it('returns a SupportCodeExecutor object when there is a match', () => {
      const expression = new CucumberExpression(
        'I have {int} cukes',
        new ParameterTypeRegistry()
      )
      const stepdef = new StepDefinition(
        expression,
        (cukeCount: number) => cukeCount
      )
      const executor = stepdef.match('I have 7 cukes')
      assert.strictEqual(executor.execute(), 7)
    })
  })

  describe('#toMessage', () => {
    it('generates a StepDefinitionConfig object for RegularExpression', () => {
      const expression = new RegularExpression(
        /banana/,
        new ParameterTypeRegistry()
      )
      const stepdef = new StepDefinition(expression, () => null)
      const message = stepdef.toMessage()

      assert.strictEqual(
        message.stepDefinitionConfig.pattern.type,
        messages.StepDefinitionPatternType.REGULAR_EXPRESSION
      )
    })

    it('generates a StepDefinitionConfig object for CucumberExpression', () => {
      const expression = new CucumberExpression(
        'banana',
        new ParameterTypeRegistry()
      )
      const stepdef = new StepDefinition(expression, () => null)
      const message = stepdef.toMessage()

      assert.strictEqual(
        message.stepDefinitionConfig.pattern.type,
        messages.StepDefinitionPatternType.CUCUMBER_EXPRESSION
      )
    })
  })
})
