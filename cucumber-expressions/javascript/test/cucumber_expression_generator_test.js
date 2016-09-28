const assert = require('assert')
const CucumberExpressionGenerator = require('../lib/cucumber_expression_generator')
const Transform = require('../lib/transform')
const TransformLookup = require('../lib/transform_lookup')

class Currency {
}

describe(CucumberExpressionGenerator.name, () => {

  let transformLookup, generator

  function assertTypedExpression(expected, text) {
    assert.deepEqual(generator.generateExpression(text, true).source, expected)
  }

  function assertUntypedExpression(expected, text) {
    assert.deepEqual(generator.generateExpression(text, false).source, expected)
  }

  beforeEach(() => {
    transformLookup = new TransformLookup()
    generator = new CucumberExpressionGenerator(transformLookup)
  })

  it("documents expression generation", () => {
    const transformLookup = new TransformLookup()
    /// [generate-expression]
    const generator = new CucumberExpressionGenerator(transformLookup)
    const undefinedStepText = "I have 2 cucumbers and 1.5 tomato"
    const generatedExpression = generator.generateExpression(undefinedStepText, true)
    assert.equal(generatedExpression.source, "I have {arg1:int} cucumbers and {arg2:float} tomato")
    assert.equal(generatedExpression.transforms[1].typeName, 'float')
    /// [generate-expression]
  })

  it("generates expression for no args", () => {
    assertTypedExpression("hello", "hello")
  })

  it("generates expression for int double arg", () => {
    assertTypedExpression(
      "I have {arg1:int} cukes and {arg2:float} euro",
      "I have 2 cukes and 1.5 euro")
  })

  it("generates expression for just int", () => {
    assertTypedExpression(
      "{arg1:int}",
      "99999")
  })

  it("generates expression without expression type", () => {
    assertUntypedExpression(
      "I have {arg1} cukes and {arg2} euro",
      "I have 2 cukes and 1.5 euro")
  })

  it("generates expression for custom type", () => {
    transformLookup.addTransform(new Transform(
      'currency',
      Currency,
      '[A-Z]{3}',
      null
    ))

    assertTypedExpression(
      "I have a {arg1:currency} account",
      "I have a EUR account")
  })

  it("prefers leftmost match when there is overlap", () => {
    transformLookup.addTransform(new Transform(
      'currency',
      Currency,
      'cd',
      null
    ))
    transformLookup.addTransform(new Transform(
      'date',
      Date,
      'bc',
      null
    ))

    assertTypedExpression(
      "a{arg1:date}defg",
      "abcdefg")
  })

  it("exposes transforms in generated expression", () => {
    const expression = generator.generateExpression("I have 2 cukes and 1.5 euro", true)
    const typeNames = expression.transforms.map(transform => transform.typeName)
    assert.deepEqual(typeNames, ['int', 'float'])
  })
})
