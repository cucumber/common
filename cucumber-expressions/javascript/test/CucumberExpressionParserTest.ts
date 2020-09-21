import fs from 'fs'
// eslint-disable-next-line node/no-extraneous-import
import yaml from 'js-yaml' // why?
import assert from 'assert'
import { CucumberExpressionError } from '../src/Errors'
import CucumberExpressionParser from '../src/CucumberExpressionParser'

interface Expectation {
  expression: string
  expected?: string
  exception?: string
}

describe('Cucumber expression parser', () => {
  fs.readdirSync('testdata/ast').forEach((testcase) => {
    const testCaseData = fs.readFileSync(`testdata/ast/${testcase}`, 'utf-8')
    const expectation = yaml.safeLoad(testCaseData) as Expectation
    it(`${testcase}`, () => {
      const parser = new CucumberExpressionParser()
      if (expectation.exception == undefined) {
        const node = parser.parse(expectation.expression)
        assert.deepStrictEqual(
          JSON.parse(JSON.stringify(node)), // Removes type information.
          JSON.parse(expectation.expected)
        )
      } else {
        assert.throws(() => {
          parser.parse(expectation.expression)
        }, new CucumberExpressionError(expectation.exception))
      }
    })
  })
})
