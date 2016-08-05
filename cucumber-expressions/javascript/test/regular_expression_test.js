const assert = require('assert')
const RegularExpression = require('../lib/regular_expression')
const TransformLookup = require('../lib/transform_lookup')

describe(RegularExpression.name, () => {
  it("transforms to string by default", () => {
    assert.deepEqual(match(/(\d\d)/, "22"), ['22'])
  })

  it("transforms integer to double using explicit type", () => {
    assert.deepEqual(match(/(.*)/, "22", ['float']), [22.0])
  })

  it("transforms integer to double using explicit function", () => {
    assert.deepEqual(match(/(.*)/, "22", [parseFloat]), [22.0])
  })

  it("transforms to int using capture group pattern", () => {
    assert.deepEqual(match(/(-?\d+)/, "22"), [22])
  })

  it("transforms to int using alternate capture group pattern", () => {
    assert.deepEqual(match(/(\d+)/, "22"), [22])
  })

  it("transforms double without integer value", () => {
    assert.deepEqual(match(/(.*)/, ".22", ['float']), [0.22])
  })

  it("transforms double with sign", () => {
    assert.deepEqual(match(/(.*)/, "-1.22", ['float']), [-1.22])
  })

  it("transforms double with sign using function", () => {
    assert.deepEqual(match(/(.*)/, "-1.22", [parseFloat]), [-1.22])
  })

  it("transforms double with sign using anonymous function", () => {
    assert.deepEqual(match(/(.*)/, "-1.22", [s => parseFloat(s)]), [-1.22])
  })

  it("returns null when there is no match", () => {
    assert.equal(match(/hello/, "world"), null)
  })

  it("fails when type is not type name or function", () => {
    assert.throws(
      () => match(/(.*)/, "-1.22", [99]),
      /Type must be string or function, but was 99 of type number/
    )
  })

  it("exposes source", () => {
    const expr = /I have (\d+) cukes? in my (.+) now/
    assert.deepEqual(new RegularExpression(expr, [], new TransformLookup()).getSource(), expr.toString());
  })
})

const match = (regexp, text, types) => {
  var transformLookup = new TransformLookup()
  const regularExpression = new RegularExpression(regexp, types || [], transformLookup)
  const arguments = regularExpression.match(text)
  if (!arguments) return null
  return arguments.map(arg => arg.transformedValue)
}
