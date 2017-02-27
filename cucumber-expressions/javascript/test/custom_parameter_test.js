/* eslint-env mocha */
'use strict'

const assert = require('assert')
const assertThrows = require('./assert_throws')
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
    parameterRegistry = new ParameterRegistry()
    /// [add-color-parameter]
    parameterRegistry.addParameter(new Parameter(
      'color',
      Color,
      /red|blue|yellow/,
      s => new Color(s)
    ))
    /// [add-color-parameter]
  })

  describe(CucumberExpression.name, () => {
    it("matches typed parameters", () => {
      const expression = new CucumberExpression("I have a {color} ball", [], parameterRegistry)
      const transformedValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedValue.name, "red")
    })

    it("matches typed parameters with optional group", () => {
      parameterRegistry = new ParameterRegistry()
      parameterRegistry.addParameter(new Parameter(
        'color',
        Color,
        [/red|blue|yellow/, /(?:dark|light) (?:red|blue|yellow)/],
        s => new Color(s)
      ))
      const expression = new CucumberExpression("I have a {color} ball", [], parameterRegistry)
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

    it("defers transformation until queried from argument", () => {
      parameterRegistry.addParameter(new Parameter(
        'throwing',
        () => null,
        /bad/,
        s => { throw new Error(`Can't transform [${s}]`) }
      ))

      const expression = new CucumberExpression("I have a {throwing} parameter", [], parameterRegistry)
      const args = expression.match("I have a bad parameter")
      assertThrows(() => args[0].transformedValue, "Can't transform [bad]")
    })

    describe("conflicting parameter type", () => {
      it("is detected for type name", () => {
        assertThrows(() => parameterRegistry.addParameter(new Parameter(
          'color',
          String,
          /.*/,
          s => s
        )), "There is already a parameter with type name color")
      })

      it("is detected for constructor", () => {
        assertThrows(() => parameterRegistry.addParameter(new Parameter(
          'color2',
          Color,
          /.*/,
          s => new Color(s)
        )), "There is already a parameter with constructor Color")
      })

      it("is detected for regexp", () => {
        assertThrows(() => parameterRegistry.addParameter(new Parameter(
          'color2',
          String,
          /red|blue|yellow/,
          s => s
        )), "There is already a parameter with regexp red|blue|yellow")
      })
    })

    // JavaScript-specific
    it("matches untyped parameters with explicit type name", () => {
      const expression = new CucumberExpression("I have a {color} ball", ['color'], parameterRegistry)
      const transformedValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedValue.name, "red")
    })

    // JavaScript-specific
    it("creates arguments using async transform", async () => {
      parameterRegistry = new ParameterRegistry()
      /// [add-async-parameter]
      parameterRegistry.addParameter(new Parameter(
        'asyncColor',
        Color,
        /red|blue|yellow/,
        async s => new Color(s)
      ))
      /// [add-async-parameter]

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
