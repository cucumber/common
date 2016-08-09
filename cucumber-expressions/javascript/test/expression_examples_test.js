const fs = require('fs')
const assert = require('assert')
const CucumberExpression = require('../lib/cucumber_expression')
const RegularExpression = require('../lib/regular_expression')
const TransformLookup = require('../lib/transform_lookup')

describe('examples.txt', () => {
  const match = (expression_text, text) => {
    const m = /\/(.*)\//.exec(expression_text)
    const expression = m ?
      new RegularExpression(new RegExp(m[1]), [], new TransformLookup()) :
      new CucumberExpression(expression_text, [], new TransformLookup())
    const arguments = expression.match(text)
    if (!arguments) return null
    return arguments.map(arg => arg.transformedValue)
  }

  const examples = fs.readFileSync("examples.txt", "utf-8")
  const chunks = examples.split(/^---/m)
  for (let chunk of chunks) {
    const [expression_text, text, expected_args] = chunk.trim().split(/\n/m)
    it(`Works with: ${expression_text}`, () => {
      assert.deepEqual(JSON.stringify(match(expression_text, text)), expected_args)
    })
  }

})
