/* eslint-env mocha */
const assert = require('assert')
const CucumberExpression = require('../src/cucumber_expression')
const ParameterTypeRegistry = require('../src/parameter_type_registry')

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
        /^I have (-?\d*\.\d+) cukes at ((?:-?\d+)|(?:\d+)) o'clock$/
      )
    })

    it('translates parenthesis to non-capturing optional capture group', () => {
      assertRegexp(
        'I have many big(ish) cukes',
        /^I have many big(?:ish)? cukes$/
      )
    })
  })
})

const assertRegexp = (expression, expectedRegexp) => {
  const cucumberExpression = new CucumberExpression(
    expression,
    new ParameterTypeRegistry()
  )
  assert.deepEqual(cucumberExpression.regexp, expectedRegexp)
}
