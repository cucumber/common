/* eslint-env mocha */
import assert from 'assert'
import CucumberExpression from '../src/cucumber_expression'
import TransformLookup from '../src/transform_lookup'

describe(CucumberExpression.name, () => {
  describe('RegExp translation', () => {
    it("translates no arguments", () => {
      assertRegexp(
        "I have 10 cukes in my belly now",
        /^I have 10 cukes in my belly now$/
      )
    })

    it("translates two untyped arguments", () => {
      assertRegexp(
        "I have {n} cukes in my {bodypart} now",
        /^I have (.+) cukes in my (.+) now$/
      )
    })

    it("translates three typed arguments", () => {
      assertRegexp(
        "I have {n:float} cukes in my {bodypart} at {time:int} o'clock",
        /^I have (-?\d*\.?\d+) cukes in my (.+) at (-?\d+) o'clock$/
      )
    })

    it("translates parenthesis to non-capturing optional capture group", () => {
      assertRegexp(
        "I have many big(ish) cukes",
        /^I have many big(?:ish)? cukes$/
      )
    })
  })
})

const assertRegexp = (expression, expectedRegexp) => {
  const cucumberExpression = new CucumberExpression(expression, [], new TransformLookup())
  assert.deepEqual(cucumberExpression._regexp, expectedRegexp)
}
