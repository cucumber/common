/* eslint-env mocha */
const assert = require('assert')
const assertThrows = require('./assert_throws')
const RegularExpression = require('../src/regular_expression')
const ParameterTypeRegistry = require('../src/parameter_type_registry')

describe(RegularExpression.name, () => {
  it("documents match arguments", () => {
    const parameterRegistry = new ParameterTypeRegistry()

    /// [capture-match-arguments]
    const expr = /I have (\d+) cukes? in my (\w+) now/
    const types = ['int', null]
    const expression = new RegularExpression(expr, types, parameterRegistry)
    const args = expression.match("I have 7 cukes in my belly now")
    assert.equal(7, args[0].transformedValue)
    assert.equal("belly", args[1].transformedValue)
    /// [capture-match-arguments]
  })

  it("does no transform by default", () => {
    assert.deepEqual(match(/(\d\d)/, "22"), ['22'])
  })

  it("transforms int to float by explicit type name", () => {
    assert.deepEqual(match(/(.*)/, "22", ['float']), [22.0])
  })

  it("transforms int to float by explicit function", () => {
    assert.deepEqual(match(/(.*)/, "22", [parseFloat]), [22.0])
  })

  it("transforms int by parameterType pattern", () => {
    assert.deepEqual(match(/(-?\d+)/, "22"), [22])
  })

  it("transforms int by alternate parameterType pattern", () => {
    assert.deepEqual(match(/(\d+)/, "22"), [22])
  })

  it("transforms float without integer part", () => {
    assert.deepEqual(match(/(.*)/, ".22", ['float']), [0.22])
  })

  it("transforms float with sign", () => {
    assert.deepEqual(match(/(.*)/, "-1.22", ['float']), [-1.22])
  })

  it("transforms float with sign using function", () => {
    assert.deepEqual(match(/(.*)/, "-1.22", [parseFloat]), [-1.22])
  })

  it("transforms float with sign using anonymous function", () => {
    assert.deepEqual(match(/(.*)/, "-1.22", [s => parseFloat(s)]), [-1.22])
  })

  it("returns null when there is no match", () => {
    assert.equal(match(/hello/, "world"), null)
  })

  it("fails when type is not type name or function", () => {
    assertThrows(
      () => match(/(.*)/, "-1.22", [99]),
      'Type must be string or function, but was 99 of type number'
    )
  })

  it("exposes source", () => {
    const expr = /I have (\d+) cukes? in my (.+) now/
    assert.deepEqual(new RegularExpression(expr, [], new ParameterTypeRegistry()).getSource(), expr.toString())
  })
})

const match = (regexp, text, types) => {
  const parameterRegistry = new ParameterTypeRegistry()
  const regularExpression = new RegularExpression(regexp, types || [], parameterRegistry)
  const args = regularExpression.match(text)
  if (!args) return null
  return args.map(arg => arg.transformedValue)
}
