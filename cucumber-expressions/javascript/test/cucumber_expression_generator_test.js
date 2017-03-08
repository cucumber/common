/* eslint-env mocha */
const assert = require('assert')
const CucumberExpressionGenerator = require('../src/cucumber_expression_generator')
const ParameterType = require('../src/parameter_type')
const ParameterTypeRegistry = require('../src/parameter_type_registry')

class Currency {
}

describe(CucumberExpressionGenerator.name, () => {

  let parameterTypeRegistry, generator

  function assertExpression(expectedExpression, expectedArgumentNames, text) {
    const generatedExpression = generator.generateExpression(text)
    assert.deepEqual(generatedExpression.parameterNames, expectedArgumentNames)
    assert.equal(generatedExpression.source, expectedExpression)
  }

  beforeEach(() => {
    parameterTypeRegistry = new ParameterTypeRegistry()
    generator = new CucumberExpressionGenerator(parameterTypeRegistry)
  })

  it("documents expression generation", () => {
    const parameterRegistry = new ParameterTypeRegistry()
    /// [generate-expression]
    const generator = new CucumberExpressionGenerator(parameterRegistry)
    const undefinedStepText = "I have 2 cucumbers and 1.5 tomato"
    const generatedExpression = generator.generateExpression(undefinedStepText)
    assert.equal(generatedExpression.source, "I have {int} cucumbers and {float} tomato")
    assert.equal(generatedExpression.parameterNames[0], 'int')
    assert.equal(generatedExpression.parameterTypes[1].name, 'float')
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
    parameterTypeRegistry.defineParameterType(new ParameterType(
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
    parameterTypeRegistry.defineParameterType(new ParameterType(
      'currency',
      Currency,
      'cd',
      null
    ))
    parameterTypeRegistry.defineParameterType(new ParameterType(
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
    const typeNames = expression.parameterTypes.map(parameter => parameter.name)
    assert.deepEqual(typeNames, ['int', 'float'])
  })
})
