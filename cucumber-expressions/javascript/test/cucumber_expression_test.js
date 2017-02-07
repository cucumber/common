/* eslint-env mocha */
const assert = require('assert')
const { CucumberExpression, TransformLookup } = require('../src/index')

describe(CucumberExpression.name, () => {
  it("documents match arguments", () => {
    const transformLookup = new TransformLookup()

    /// [capture-match-arguments]
    const expr = "I have {n} cuke(s) in my {bodypart} now"
    const types = ['int', null]
    const expression = new CucumberExpression(expr, types, transformLookup)
    const args = expression.match("I have 7 cukes in my belly now")
    assert.equal(7, args[0].transformedValue)
    assert.equal("belly", args[1].transformedValue)
    /// [capture-match-arguments]
  })

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
    assert.deepEqual(match("{what:float}", ".22"), [0.22])
  })

  it("transforms to float by explicit type", () => {
    assert.deepEqual(match("{what}", "0.22", ['float']), [0.22])
    assert.deepEqual(match("{what}", ".22", ['float']), [0.22])
  })

  it("doesn't transform unknown type", () => {
    assert.throws(
      () => match("{what:unknown}", "something"),
      /No transform for type name "unknown"/
    )
  })

  it("exposes source", () => {
    const expr = "I have {n:int} cuke(s) in my {bodypart} now";
    assert.equal(new CucumberExpression(expr, [], new TransformLookup()).source, expr)
  })

  it("exposes offset and value", () => {
    const expr = "I have {n:int} cuke(s) in my {bodypart} now";
    const expression = new CucumberExpression(expr, [], new TransformLookup())
    const arg1 = expression.match("I have 800 cukes in my brain now")[0]
    assert.equal(arg1.offset, 7)
    assert.equal(arg1.value, "800")
  })
})

const match = (expression, text, types) => {
  const cucumberExpression = new CucumberExpression(expression, types || [], new TransformLookup())
  const args = cucumberExpression.match(text)
  if (!args) return null
  return args.map(arg => arg.transformedValue)
}
