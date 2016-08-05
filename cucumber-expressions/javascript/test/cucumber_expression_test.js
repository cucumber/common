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
    assert.deepEqual(match("{what:float}",  ".22"), [0.22])
  })

  it("transforms to float by explicit type", () => {
    assert.deepEqual(match("{what}", "0.22", ['float']), [0.22])
    assert.deepEqual(match("{what}",  ".22", ['float']), [0.22])
  })

  it("doesn't transform unknown type", () => {
    assert.throws(
      () => match("{what:unknown}", "something"),
      /No transformer for type name "unknown"/
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
  const arguments = cucumberExpression.match(text)
  if (!arguments) return null
  return arguments.map(arg => arg.transformedValue)
}
