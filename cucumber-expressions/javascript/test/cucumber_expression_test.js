/* eslint-env mocha */
const assert = require('assert')
const { CucumberExpression, ParameterTypeRegistry } = require('../src/index')

describe('CucumberExpression', () => {
  it('documents match arguments', () => {
    const parameterTypeRegistry = new ParameterTypeRegistry()

    /// [capture-match-arguments]
    const expr = 'I have {int} cuke(s)'
    const expression = new CucumberExpression(expr, parameterTypeRegistry)
    const args = expression.match('I have 7 cukes')
    assert.equal(7, args[0].transformedValue)
    /// [capture-match-arguments]
  })

  it('matches word', () => {
    assert.deepEqual(match('three {word} mice', 'three blind mice'), ['blind'])
  })

  it('matches int', () => {
    assert.deepEqual(match('{int}', '22'), [22])
  })

  it("doesn't match float as int", () => {
    assert.deepEqual(match('{int}', '1.22'), null)
  })

  it('matches float', () => {
    assert.deepEqual(match('{float}', '0.22'), [0.22])
    assert.deepEqual(match('{float}', '.22'), [0.22])
  })

  it('throws unknown parameter type', () => {
    try {
      match('{unknown}', 'something')
      assert.fail()
    } catch (expected) {
      assert.equal(expected.message, 'Undefined parameter type {unknown}')
    }
  })

  it('exposes source', () => {
    const expr = 'I have {int} cuke(s)'
    assert.equal(
      new CucumberExpression(expr, new ParameterTypeRegistry()).source,
      expr
    )
  })

  describe('escapes special characters', () => {
    ;['\\', '[', ']', '^', '$', '.', '|', '?', '*', '+'].forEach(character => {
      it(`escapes ${character}`, () => {
        const expr = `I have {int} cuke(s) and ${character}`
        const expression = new CucumberExpression(
          expr,
          new ParameterTypeRegistry()
        )
        const arg1 = expression.match(`I have 800 cukes and ${character}`)[0]
        assert.equal(arg1.transformedValue, 800)
      })
    })

    it(`escapes .`, () => {
      const expr = `I have {int} cuke(s) and .`
      const expression = new CucumberExpression(
        expr,
        new ParameterTypeRegistry()
      )
      assert.equal(expression.match(`I have 800 cukes and 3`), null)
      const arg1 = expression.match(`I have 800 cukes and .`)[0]
      assert.equal(arg1.transformedValue, 800)
    })

    it(`escapes |`, () => {
      const expr = `I have {int} cuke(s) and a|b`
      const expression = new CucumberExpression(
        expr,
        new ParameterTypeRegistry()
      )
      assert.equal(expression.match(`I have 800 cukes and a`), null)
      assert.equal(expression.match(`I have 800 cukes and b`), null)
      const arg1 = expression.match(`I have 800 cukes and a|b`)[0]
      assert.equal(arg1.transformedValue, 800)
    })
  })
})

const match = (expression, text) => {
  const cucumberExpression = new CucumberExpression(
    expression,
    new ParameterTypeRegistry()
  )
  const args = cucumberExpression.match(text)
  if (!args) return null
  return args.map(arg => arg.transformedValue)
}
