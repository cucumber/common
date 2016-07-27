const assert = require('assert')
const CucumberExpression = require('../lib/cucumber_expression')
const RegularExpression = require('../lib/regular_expression')
const TransformLookup = require('../lib/transform_lookup')
const Transform = require('../lib/transform')

class Currency {
  constructor(symbol) {
    this.symbol = symbol
  }
}

describe('Custom transform', () => {
  let transformLookup

  beforeEach(() => {
    transformLookup = new TransformLookup()
    transformLookup.addTransform(new Transform(
      ['currency'],
      Currency,
      ['[A-Z]{3}'],
      s => new Currency(s)
    ))
  })

  it("converts CucumberExpression arguments with expression type", () => {
    const expression = new CucumberExpression("I have a {currency:currency} account", [], transformLookup)
    const transformedArgumentValue = expression.match("I have a EUR account")[0].transformedValue
    assert.equal(transformedArgumentValue.symbol, "EUR")
  })

  it("converts CucumberExpression arguments with explicit type", () => {
    const expression = new CucumberExpression("I have a {currency} account", [Currency], transformLookup)
    const transformedArgumentValue = expression.match("I have a EUR account")[0].transformedValue
    assert.equal(transformedArgumentValue.symbol, "EUR")
  })

  it("converts CucumberExpression arguments with explicit type using constructor directly", () => {
    const expression = new CucumberExpression("I have a {currency} account", [Currency], new TransformLookup())
    const transformedArgumentValue = expression.match("I have a EUR account")[0].transformedValue
    assert.equal(transformedArgumentValue.symbol, "EUR")
  })

  it("converts CucumberExpression arguments with explicit type name", () => {
    const expression = new CucumberExpression("I have a {currency} account", ['currency'], transformLookup)
    const transformedArgumentValue = expression.match("I have a EUR account")[0].transformedValue
    assert.equal(transformedArgumentValue.symbol, "EUR")
  })

  it("converts RegularExpression arguments", () => {
    const expression = new RegularExpression(/I have a ([A-Z]{3}) account/, transformLookup)
    const transformedArgumentValue = expression.match("I have a EUR account")[0].transformedValue
    assert.equal(transformedArgumentValue.symbol, "EUR")
  })
})
