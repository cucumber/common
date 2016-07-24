const assert = require('assert')
const CucumberExpression = require('../lib/cucumber_expression')
const TransformLookup = require('../lib/transform_lookup')

describe(CucumberExpression.name, () => {
  it("transforms nothing by default", () => {
    assert.deepEqual(match("{what}", "22"), ["22"])
  })

  it("transforms to int by expression type", () => {
    assert.deepEqual(match("{what:int}", "22"), [22])
  })

  it("transforms to int by explicit type", () => {
    assert.deepEqual(match("{what}", "22", ['int']), [22])
  })

  it("doesn't match a float to an int", () => {
    assert.deepEqual(match("{what:int}", "1.22"), null)
  })

  it("transforms to float by expression type", () => {
    assert.deepEqual(match("{what:float}", "0.22"), [0.22])
  })

  it("transforms to float by explicit type", () => {
    assert.deepEqual(match("{what}", "0.22", ['float']), [0.22])
  })

  it("doesn't transform unknown type", () => {
    assert.throws(
      () => match("{what:unknown}", "something"),
      'No transformer for type "unknown"'
    )
  })

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

const assertRegexp = (expression, regexp, types = []) => {
  const cucumberExpression = new CucumberExpression(expression, types, new TransformLookup())
  assert.equal(cucumberExpression.regexp.toString(), regexp.toString())
}

const match = (expression, text, explicitTypes) => {
  const cucumberExpression = new CucumberExpression(expression, explicitTypes || [], new TransformLookup())
  const arguments = cucumberExpression.match(text)
  if (!arguments) return null
  return arguments.map(arg => arg.transformedValue)
}
