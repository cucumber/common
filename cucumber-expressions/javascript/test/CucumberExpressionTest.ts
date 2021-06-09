import assert from 'assert'
import CucumberExpression from '../src/CucumberExpression'
import ParameterTypeRegistry from '../src/ParameterTypeRegistry'
import ParameterType from '../src/ParameterType'
import fs from 'fs'
import yaml from 'js-yaml'
import CucumberExpressionError from '../src/CucumberExpressionError'

interface Expectation {
  expression: string
  text: string
  expected?: string
  exception?: string
}

describe('CucumberExpression', () => {
  fs.readdirSync('testdata/expression').forEach((testcase) => {
    const testCaseData = fs.readFileSync(`testdata/expression/${testcase}`, 'utf-8')
    const expectation = yaml.load(testCaseData) as Expectation
    it(`${testcase}`, () => {
      const parameterTypeRegistry = new ParameterTypeRegistry()
      if (expectation.exception == undefined) {
        const expression = new CucumberExpression(expectation.expression, parameterTypeRegistry)
        const matches = expression.match(expectation.text)
        assert.deepStrictEqual(
          JSON.parse(JSON.stringify(matches ? matches.map((value) => value.getValue(null)) : null)), // Removes type information.
          JSON.parse(expectation.expected)
        )
      } else {
        assert.throws(() => {
          const expression = new CucumberExpression(expectation.expression, parameterTypeRegistry)
          expression.match(expectation.text)
        }, new CucumberExpressionError(expectation.exception))
      }
    })
  })

  fs.readdirSync('testdata/regex').forEach((testcase) => {
    const testCaseData = fs.readFileSync(`testdata/regex/${testcase}`, 'utf-8')
    const expectation = yaml.load(testCaseData) as Expectation
    it(`${testcase}`, () => {
      const parameterTypeRegistry = new ParameterTypeRegistry()
      const expression = new CucumberExpression(expectation.expression, parameterTypeRegistry)
      assert.deepStrictEqual(expression.regexp.source, expectation.expected)
    })
  })

  it('documents match arguments', () => {
    const parameterTypeRegistry = new ParameterTypeRegistry()

    /// [capture-match-arguments]
    const expr = 'I have {int} cuke(s)'
    const expression = new CucumberExpression(expr, parameterTypeRegistry)
    const args = expression.match('I have 7 cukes')
    assert.strictEqual(7, args[0].getValue(null))
    /// [capture-match-arguments]
  })

  it('matches float', () => {
    assert.deepStrictEqual(match('{float}', ''), null)
    assert.deepStrictEqual(match('{float}', '.'), null)
    assert.deepStrictEqual(match('{float}', ','), null)
    assert.deepStrictEqual(match('{float}', '-'), null)
    assert.deepStrictEqual(match('{float}', 'E'), null)
    assert.deepStrictEqual(match('{float}', '1,'), null)
    assert.deepStrictEqual(match('{float}', ',1'), null)
    assert.deepStrictEqual(match('{float}', '1.'), null)

    assert.deepStrictEqual(match('{float}', '1'), [1])
    assert.deepStrictEqual(match('{float}', '-1'), [-1])
    assert.deepStrictEqual(match('{float}', '1.1'), [1.1])
    assert.deepStrictEqual(match('{float}', '1,000'), null)
    assert.deepStrictEqual(match('{float}', '1,000,0'), null)
    assert.deepStrictEqual(match('{float}', '1,000.1'), null)
    assert.deepStrictEqual(match('{float}', '1,000,10'), null)
    assert.deepStrictEqual(match('{float}', '1,0.1'), null)
    assert.deepStrictEqual(match('{float}', '1,000,000.1'), null)
    assert.deepStrictEqual(match('{float}', '-1.1'), [-1.1])

    assert.deepStrictEqual(match('{float}', '.1'), [0.1])
    assert.deepStrictEqual(match('{float}', '-.1'), [-0.1])
    assert.deepStrictEqual(match('{float}', '-.10000001'), [-0.10000001])
    assert.deepStrictEqual(match('{float}', '1E1'), [1e1]) // precision 1 with scale -1, can not be expressed as a decimal
    assert.deepStrictEqual(match('{float}', '.1E1'), [1])
    assert.deepStrictEqual(match('{float}', 'E1'), null)
    assert.deepStrictEqual(match('{float}', '-.1E-1'), [-0.01])
    assert.deepStrictEqual(match('{float}', '-.1E-2'), [-0.001])
    assert.deepStrictEqual(match('{float}', '-.1E+1'), [-1])
    assert.deepStrictEqual(match('{float}', '-.1E+2'), [-10])
    assert.deepStrictEqual(match('{float}', '-.1E1'), [-1])
    assert.deepStrictEqual(match('{float}', '-.10E2'), [-10])
  })

  it('matches float with zero', () => {
    assert.deepEqual(match('{float}', '0'), [0])
  })

  it('exposes source', () => {
    const expr = 'I have {int} cuke(s)'
    assert.strictEqual(new CucumberExpression(expr, new ParameterTypeRegistry()).source, expr)
  })

  it('unmatched optional groups have undefined values', () => {
    const parameterTypeRegistry = new ParameterTypeRegistry()
    parameterTypeRegistry.defineParameterType(
      new ParameterType(
        'textAndOrNumber',
        /([A-Z]+)?(?: )?([0-9]+)?/,
        null,
        function (s1, s2) {
          return [s1, s2]
        },
        false,
        true
      )
    )
    const expression = new CucumberExpression('{textAndOrNumber}', parameterTypeRegistry)

    const world = {}

    assert.deepStrictEqual(expression.match(`TLA`)[0].getValue(world), ['TLA', undefined])
    assert.deepStrictEqual(expression.match(`123`)[0].getValue(world), [undefined, '123'])
  })

  // JavaScript-specific

  it('delegates transform to custom object', () => {
    const parameterTypeRegistry = new ParameterTypeRegistry()
    parameterTypeRegistry.defineParameterType(
      new ParameterType(
        'widget',
        /\w+/,
        null,
        function (s: string) {
          return this.createWidget(s)
        },
        false,
        true
      )
    )
    const expression = new CucumberExpression('I have a {widget}', parameterTypeRegistry)

    const world = {
      createWidget(s: string) {
        return `widget:${s}`
      },
    }

    const args = expression.match(`I have a bolt`)
    assert.strictEqual(args[0].getValue(world), 'widget:bolt')
  })
})

const match = (expression: string, text: string) => {
  const cucumberExpression = new CucumberExpression(expression, new ParameterTypeRegistry())
  const args = cucumberExpression.match(text)
  if (!args) {
    return null
  }
  return args.map((arg) => arg.getValue(null))
}
