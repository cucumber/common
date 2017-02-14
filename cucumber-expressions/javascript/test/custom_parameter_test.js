/* eslint-env mocha */
'use strict'

const assert = require('assert')
const CucumberExpression = require('../src/cucumber_expression')
const RegularExpression = require('../src/regular_expression')
const ParameterRegistry = require('../src/parameter_registry')
const Parameter = require('../src/parameter')

class Color {
  /// [color-constructor]
  constructor(name) {
    this.name = name
  }
  /// [color-constructor]
}

describe('Custom parameter', () => {
  let parameterRegistry

  beforeEach(() => {
    /// [add-color-parameter]
    parameterRegistry = new ParameterRegistry()
    parameterRegistry.addParameter(new Parameter(
      'color',
      Color,
      ['red|blue|yellow', '(?:dark|light) (?:red|blue|yellow)'],
      s => new Color(s)
    ))
    /// [add-color-parameter]
  })

  describe(CucumberExpression.name, () => {
    it("matches typed parameters", () => {
      const expression = new CucumberExpression("I have a {color:color} ball", [], parameterRegistry)
      const transformedValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedValue.name, "red")
    })

    it("matches typed parameters with optional group", () => {
      const expression = new CucumberExpression("I have a {color:color} ball", [], parameterRegistry)
      const transformedValue = expression.match("I have a dark red ball")[0].transformedValue
      assert.equal(transformedValue.name, "dark red")
    })

    it("matches untyped parameters with explicit type", () => {
      const expression = new CucumberExpression("I have a {color} ball", [Color], parameterRegistry)
      const transformedValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedValue.name, "red")
    })

    it("matches untyped parameters with same name as type", () => {
      const expression = new CucumberExpression("I have a {color} ball", [], parameterRegistry)
      const transformedValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedValue.name, "red")
    })

    // JavaScript-specific
    it("matches untyped parameters with explicit type name", () => {
      const expression = new CucumberExpression("I have a {color} ball", ['color'], parameterRegistry)
      const transformedValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedValue.name, "red")
    })

    // JavaScript-specific
    it("creates arguments using async transform", async () => {
      parameterRegistry.addParameter(new Parameter(
        'asyncColor',
        Color,
        ['red|blue|yellow', '(?:dark|light) (?:red|blue|yellow)'],
        async s => new Color(s)
      ))

      const expression = new CucumberExpression("I have a {asyncColor} ball", ['asyncColor'], parameterRegistry)
      const args = await expression.match("I have a red ball")
      const transformedValue = await args[0].transformedValue
      assert.equal(transformedValue.name, "red")
    })
  })

  describe(RegularExpression.name, () => {
    it("matches parameters with explicit constructor", () => {
      const expression = new RegularExpression(/I have a (red|blue|yellow) ball/, [Color], parameterRegistry)
      const transformedValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedValue.name, "red")
    })

    it("matches parameters without explicit constructor", () => {
      const expression = new RegularExpression(/I have a (red|blue|yellow) ball/, [], parameterRegistry)
      const transformedValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedValue.name, "red")
    })

    it("matches parameters with explicit type that isn't registered", () => {
      const expression = new RegularExpression(/I have a (red|blue|yellow) ball/, [Color], new ParameterRegistry())
      const transformedValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedValue.name, "red")
    })

    // JavaScript-specific (specifying type as string)
    it("matches parameters without explicit type name", () => {
      const expression = new RegularExpression(/I have a (red|blue|yellow) ball/, ['color'], parameterRegistry)
      const transformedValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedValue.name, "red")
    })
  })
})
