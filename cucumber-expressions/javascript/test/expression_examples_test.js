/* eslint-env mocha */
const fs = require('fs')
const assert = require('assert')
const CucumberExpression = require('../src/cucumber_expression')
const RegularExpression = require('../src/regular_expression')
const ParameterTypeRegistry = require('../src/parameter_type_registry')

describe('examples.txt', () => {
  const match = (expression_text, text) => {
    const m = /\/(.*)\//.exec(expression_text)
    const expression = m
      ? new RegularExpression(new RegExp(m[1]), new ParameterTypeRegistry())
      : new CucumberExpression(expression_text, new ParameterTypeRegistry())
    const args = expression.match(text)
    if (!args) return null
    return args.map(arg => arg.value)
  }

  const examples = fs.readFileSync('examples.txt', 'utf-8')
  const chunks = examples.split(/^---/m)
  for (const chunk of chunks) {
    const [expressionText, text, expectedArgs] = chunk.trim().split(/\n/m)
    it(`Works with: ${expressionText}`, () => {
      assert.deepEqual(
        JSON.stringify(match(expressionText, text)),
        expectedArgs
      )
    })
  }
})
