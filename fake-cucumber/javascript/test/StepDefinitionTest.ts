import assert from 'assert'
import StepDefinition from '../src/StepDefinition'
import { CucumberExpression, ParameterTypeRegistry } from 'cucumber-expressions'

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

    it('returns null when there is no match', () => {
      const expression = new CucumberExpression(
        'I have {int} cukes',
        new ParameterTypeRegistry()
      )
      const stepdef = new StepDefinition(
        expression,
        (cukeCount: number) => cukeCount
      )
      const match = stepdef.match('I have 7 cukes')
      assert.strictEqual(match.execute(), 7)
    })
  })
})
