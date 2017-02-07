/* eslint-env mocha */
const assert = require('assert')
const RegularExpression = require('../src/regular_expression')
const TransformLookup = require('../src/transform_lookup')

describe(RegularExpression.name, () => {
  it("documents match arguments", () => {
    const transformLookup = new TransformLookup()

    /// [capture-match-arguments]
    const expr = /I have (\d+) cukes? in my (\w+) now/
    const types = ['int', null]
    const expression = new RegularExpression(expr, types, transformLookup)
    const args = expression.match("I have 7 cukes in my belly now")
    assert.equal(7, args[0].transformedValue)
    assert.equal("belly", args[1].transformedValue)
    /// [capture-match-arguments]
  })

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
  const args = regularExpression.match(text)
  if (!args) return null
  return args.map(arg => arg.transformedValue)
}
