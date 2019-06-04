import fs from 'fs'
import assert from 'assert'
import CucumberExpression from '../src/CucumberExpression'
import RegularExpression from '../src/RegularExpression'
import ParameterTypeRegistry from '../src/ParameterTypeRegistry'

describe('examples.txt', () => {
  const match = (expressionText: string, text: string) => {
    const m = /\/(.*)\//.exec(expressionText)
    const expression = m
      ? new RegularExpression(new RegExp(m[1]), new ParameterTypeRegistry())
      : new CucumberExpression(expressionText, new ParameterTypeRegistry())
    const args = expression.match(text)
    if (!args) {
      return null
    }
    return args.map(arg => arg.getValue(null))
  }

  const examples = fs.readFileSync('examples.txt', 'utf-8')
  const chunks = examples.split(/^---/m)
  for (const chunk of chunks) {
    const [expressionText, text, expectedArgs] = chunk.trim().split(/\n/m)
    it(`Works with: ${expressionText}`, () => {
      assert.deepStrictEqual(
        JSON.stringify(match(expressionText, text)),
        expectedArgs
      )
    })
  }
})
