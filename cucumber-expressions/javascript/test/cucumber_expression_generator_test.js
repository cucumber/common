/* eslint-env mocha */
const assert = require('assert')
const CucumberExpressionGenerator = require('../src/cucumber_expression_generator')
const Parameter = require('../src/parameter')
const ParameterRegistry = require('../src/parameter_registry')

class Currency {
}

describe(CucumberExpressionGenerator.name, () => {

  let parameterRegistry, generator

  function assertExpression(expectedExpression, expectedArgumentNames, text) {
    const generatedExpression = generator.generateExpression(text)
    assert.deepEqual(generatedExpression.parameterNames, expectedArgumentNames)
    assert.equal(generatedExpression.source, expectedExpression)
  }

  beforeEach(() => {
    parameterRegistry = new ParameterRegistry()
    generator = new CucumberExpressionGenerator(parameterRegistry)
  })

  it("documents expression generation", () => {
    const parameterRegistry = new ParameterRegistry()
    /// [generate-expression]
    const generator = new CucumberExpressionGenerator(parameterRegistry)
    const undefinedStepText = "I have 2 cucumbers and 1.5 tomato"
    const generatedExpression = generator.generateExpression(undefinedStepText)
    assert.equal(generatedExpression.source, "I have {int} cucumbers and {float} tomato")
    assert.equal(generatedExpression.parameterNames[0], 'int')
    assert.equal(generatedExpression.parameters[1].typeName, 'float')
    /// [generate-expression]
  })

  it("generates expression for no args", () => {
    assertExpression("hello", [], "hello")
  })

  it("generates expression for int float arg", () => {
    assertExpression(
      "I have {int} cukes and {float} euro", ["int", "float"],
      "I have 2 cukes and 1.5 euro")
  })

  it("generates expression for just int", () => {
    assertExpression(
      "{int}", ["int"],
      "99999")
  })

  it("numbers only second argument when builtin type is not reserved keyword", () => {
    assertExpression(
      "I have {float} cukes and {float} euro", ["float", "float2"],
      "I have 2.5 cukes and 1.5 euro")
  })

  it("generates expression for custom type", () => {
    parameterRegistry.addParameter(new Parameter(
      'currency',
      Currency,
      '[A-Z]{3}',
      null
    ))

    assertExpression(
      "I have a {currency} account", ["currency"],
      "I have a EUR account")
  })

  it("prefers leftmost match when there is overlap", () => {
    parameterRegistry.addParameter(new Parameter(
      'currency',
      Currency,
      'cd',
      null
    ))
    parameterRegistry.addParameter(new Parameter(
      'date',
      Date,
      'bc',
      null
    ))

    assertExpression(
      "a{date}defg", ["date"],
      "abcdefg")
  })

  it("exposes parameter type names in generated expression", () => {
    const expression = generator.generateExpression("I have 2 cukes and 1.5 euro")
    const typeNames = expression.parameters.map(parameter => parameter.typeName)
    assert.deepEqual(typeNames, ['int', 'float'])
  })
})
