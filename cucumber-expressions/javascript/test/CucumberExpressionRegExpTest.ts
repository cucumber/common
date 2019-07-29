import assert from 'assert'
import CucumberExpression from '../src/CucumberExpression'
import ParameterTypeRegistry from '../src/ParameterTypeRegistry'

describe('CucumberExpression', () => {
  describe('RegExp translation', () => {
    it('translates no arguments', () => {
      assertRegexp(
        'I have 10 cukes in my belly now',
        /^I have 10 cukes in my belly now$/
      )
    })

    it('translates alternation', () => {
      assertRegexp(
        'I had/have a great/nice/charming friend',
        /^I (?:had|have) a (?:great|nice|charming) friend$/
      )
    })

    it('translates alternation with non-alpha', () => {
      assertRegexp('I said Alpha1/Beta1', /^I said (?:Alpha1|Beta1)$/)
    })

    it('translates parameters', () => {
      assertRegexp(
        "I have {float} cukes at {int} o'clock",
        /^I have (-?\d*(?:[.,]\d+)?) cukes at ((?:-?\d+)|(?:\d+)) o'clock$/
      )
    })

    it('translates parenthesis to non-capturing optional capture group', () => {
      assertRegexp(
        'I have many big(ish) cukes',
        /^I have many big(?:ish)? cukes$/
      )
    })

    it('translates parenthesis with alpha unicode', () => {
      assertRegexp('Привет, Мир(ы)!', /^Привет, Мир(?:ы)?!$/)
    })
  })
})

const assertRegexp = (expression: string, expectedRegexp: RegExp) => {
  const cucumberExpression = new CucumberExpression(
    expression,
    new ParameterTypeRegistry()
  )
  assert.deepStrictEqual(cucumberExpression.regexp, expectedRegexp)
}
