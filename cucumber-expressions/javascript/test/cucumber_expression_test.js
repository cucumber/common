/* eslint-env mocha */
const assert = require('assert')
const { CucumberExpression, ParameterRegistry } = require('../src/index')

describe(CucumberExpression.name, () => {
  it("documents match arguments", () => {
    const parameterRegistry = new ParameterRegistry()

    /// [capture-match-arguments]
    const expr = "I have {n} cuke(s) in my {bodypart} now"
    const types = ['int', null]
    const expression = new CucumberExpression(expr, types, parameterRegistry)
    const args = expression.match("I have 7 cukes in my belly now")
    assert.equal(7, args[0].transformedValue)
    assert.equal("belly", args[1].transformedValue)
    /// [capture-match-arguments]
  })

  it("does no transform by default", () => {
    assert.deepEqual(match("{what}", "22"), ["22"])
  })

  it("transforms to int by parameter type", () => {
    assert.deepEqual(match("{int}", "22"), [22])
  })

  it("transforms to int by explicit type", () => {
    assert.deepEqual(match("{what}", "22", ['int']), [22])
  })

  it("doesn't match a float with an int parameter", () => {
    assert.deepEqual(match("{int}", "1.22"), null)
  })

  it("transforms to float by parameter type", () => {
    assert.deepEqual(match("{float}", "0.22"), [0.22])
    assert.deepEqual(match("{float}", ".22"), [0.22])
  })

  it("transforms to float by explicit type", () => {
    assert.deepEqual(match("{what}", "0.22", ['float']), [0.22])
    assert.deepEqual(match("{what}", ".22", ['float']), [0.22])
  })

  it("leaves unknown type untransformed", () => {
    assert.deepEqual(match("{unknown}", "something"), ['something'])
  })

  it("supports deprecated {name:type} syntax for now", () => {
    assert.deepEqual(match("{param:unknown}", "something"), ['something'])
  })

  it("exposes source", () => {
    const expr = "I have {int} cuke(s) in my {bodypart} now";
    assert.equal(new CucumberExpression(expr, [], new ParameterRegistry()).source, expr)
  })

  it("exposes offset and value", () => {
    const expr = "I have {int} cuke(s) in my {bodypart} now";
    const expression = new CucumberExpression(expr, [], new ParameterRegistry())
    const arg1 = expression.match("I have 800 cukes in my brain now")[0]
    assert.equal(arg1.offset, 7)
    assert.equal(arg1.value, "800")
  })

  describe('RegExp special characters', () => {
    ['\\', '[', ']', '^', '$', '.', '|', '?', '*', '+'].forEach((character) => {
      it(`escapes ${character}`, () => {
        const expr = `I have {int} cuke(s) and ${character}`
        const expression = new CucumberExpression(expr, [], new ParameterRegistry())
        const arg1 = expression.match(`I have 800 cukes and ${character}`)[0]
        assert.equal(arg1.offset, 7)
        assert.equal(arg1.value, "800")
      })
    })

    it(`escapes .`, () => {
      const expr = `I have {int} cuke(s) and .`
      const expression = new CucumberExpression(expr, [], new ParameterRegistry())
      assert.equal(expression.match(`I have 800 cukes and 3`), null)
      const arg1 = expression.match(`I have 800 cukes and .`)[0]
      assert.equal(arg1.offset, 7)
      assert.equal(arg1.value, "800")
    })

    it(`escapes |`, () => {
      const expr = `I have {int} cuke(s) and a|b`
      const expression = new CucumberExpression(expr, [], new ParameterRegistry())
      assert.equal(expression.match(`I have 800 cukes and a`), null)
      assert.equal(expression.match(`I have 800 cukes and b`), null)
      const arg1 = expression.match(`I have 800 cukes and a|b`)[0]
      assert.equal(arg1.offset, 7)
      assert.equal(arg1.value, "800")
    })
  })
})

const match = (expression, text, types) => {
  const cucumberExpression = new CucumberExpression(expression, types || [], new ParameterRegistry())
  const args = cucumberExpression.match(text)
  if (!args) return null
  return args.map(arg => arg.transformedValue)
}
