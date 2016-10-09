/* eslint-env mocha */
import fs from 'fs'
import assert from 'assert'
import CucumberExpression from '../src/cucumber_expression'
import RegularExpression from '../src/regular_expression'
import TransformLookup from '../src/transform_lookup'

describe('examples.txt', () => {
  const match = (expression_text, text) => {
    const m = /\/(.*)\//.exec(expression_text)
    const expression = m ?
      new RegularExpression(new RegExp(m[1]), [], new TransformLookup()) :
      new CucumberExpression(expression_text, [], new TransformLookup())
    const args = expression.match(text)
    if (!args) return null
    return args.map(arg => arg.transformedValue)
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
