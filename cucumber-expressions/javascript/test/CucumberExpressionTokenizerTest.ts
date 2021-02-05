import fs from 'fs'
import yaml from 'js-yaml'
import CucumberExpressionTokenizer from '../src/CucumberExpressionTokenizer'
import assert from 'assert'
import CucumberExpressionError from '../src/CucumberExpressionError'

interface Expectation {
  expression: string
  expected?: string
  exception?: string
}

describe('Cucumber expression tokenizer', () => {
  fs.readdirSync('testdata/tokens').forEach((testcase) => {
    const testCaseData = fs.readFileSync(`testdata/tokens/${testcase}`, 'utf-8')
    const expectation = yaml.load(testCaseData) as Expectation
    it(`${testcase}`, () => {
      const tokenizer = new CucumberExpressionTokenizer()
      if (expectation.exception == undefined) {
        const tokens = tokenizer.tokenize(expectation.expression)
        assert.deepStrictEqual(
          JSON.parse(JSON.stringify(tokens)), // Removes type information.
          JSON.parse(expectation.expected)
        )
      } else {
        assert.throws(() => {
          tokenizer.tokenize(expectation.expression)
        }, new CucumberExpressionError(expectation.exception))
      }
    })
  })
})
