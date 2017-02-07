/* eslint-env mocha */
'use strict'

const assert = require('assert')
const CucumberExpression = require('../src/cucumber_expression')
const RegularExpression = require('../src/regular_expression')
const TransformLookup = require('../src/transform_lookup')
const Transform = require('../src/transform')

class Color {
  /// [color-constructor]
  constructor(name) {
    this.name = name
  }
  /// [color-constructor]
}

describe('Custom transform', () => {
  let transformLookup

  beforeEach(() => {
    /// [add-color-transform]
    transformLookup = new TransformLookup()
    transformLookup.addTransform(new Transform(
      'color',
      Color,
      ['red|blue|yellow', '(?:dark|light) (?:red|blue|yellow)'],
      s => new Color(s)
    ))
    /// [add-color-transform]
  })

  describe(CucumberExpression.name, () => {
    it("transforms arguments with expression type", () => {
      const expression = new CucumberExpression("I have a {color:color} ball", [], transformLookup)
      const transformedArgumentValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedArgumentValue.name, "red")
    })

    it("transforms arguments with expression type", () => {
      const expression = new CucumberExpression("I have a {color:color} ball", [], transformLookup)
      const transformedArgumentValue = expression.match("I have a dark red ball")[0].transformedValue
      assert.equal(transformedArgumentValue.name, "dark red")
    })

    it("transforms arguments with explicit type", () => {
      const expression = new CucumberExpression("I have a {color} ball", [Color], transformLookup)
      const transformedArgumentValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedArgumentValue.name, "red")
    })

    it("transforms arguments using argument name as type", () => {
      const expression = new CucumberExpression("I have a {color} ball", [], transformLookup)
      const transformedArgumentValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedArgumentValue.name, "red")
    })

    it("transforms arguments with explicit type using constructor directly", () => {
      const expression = new CucumberExpression("I have a {color} ball", [Color], new TransformLookup())
      const transformedArgumentValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedArgumentValue.name, "red")
    })

    // JavaScript-specific

    it("transforms arguments with explicit type name", () => {
      const expression = new CucumberExpression("I have a {color} ball", ['color'], transformLookup)
      const transformedArgumentValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedArgumentValue.name, "red")
    })
  })

  describe(RegularExpression.name, () => {
    it("transforms arguments with explicit type", () => {
      const expression = new RegularExpression(/I have a (red|blue|yellow) ball/, [Color], transformLookup)
      const transformedArgumentValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedArgumentValue.name, "red")
    })

    it("transforms arguments without explicit type", () => {
      const expression = new RegularExpression(/I have a (red|blue|yellow) ball/, [], transformLookup)
      const transformedArgumentValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedArgumentValue.name, "red")
    })

    it("transforms arguments with explicit type using constructor directly", () => {
      const expression = new RegularExpression(/I have a (red|blue|yellow) ball/, [Color], new TransformLookup())
      const transformedArgumentValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedArgumentValue.name, "red")
    })

    // JavaScript-specific (specifying type as string)
    it("transforms arguments with explicit type name", () => {
      const expression = new RegularExpression(/I have a (red|blue|yellow) ball/, ['color'], transformLookup)
      const transformedArgumentValue = expression.match("I have a red ball")[0].transformedValue
      assert.equal(transformedArgumentValue.name, "red")
    })
  })
})
