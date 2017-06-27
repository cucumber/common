/* eslint-env mocha */
const assert = require('assert')
const RegularExpression = require('../src/regular_expression')
const ParameterTypeRegistry = require('../src/parameter_type_registry')

describe('RegularExpression', () => {
  it('documents match arguments', () => {
    const parameterRegistry = new ParameterTypeRegistry()

    /// [capture-match-arguments]
    const expr = /I have (\d+) cukes? in my (\w+) now/
    const expression = new RegularExpression(expr, parameterRegistry)
    const args = expression.match('I have 7 cukes in my belly now')
    assert.equal(7, args[0].value)
    assert.equal('belly', args[1].value)
    /// [capture-match-arguments]
  })

  it('does no transform by default', () => {
    assert.deepEqual(match(/(\d\d)/, '22')[0], '22')
  })

  it('transforms negative int', () => {
    assert.deepEqual(match(/(-?\d+)/, '-22')[0], -22)
  })

  it('transforms positive int', () => {
    assert.deepEqual(match(/(\d+)/, '22')[0], 22)
  })

  it('transforms float without integer part', () => {
    assert.deepEqual(match(/(-?\d*\.?\d+)/, '.22')[0], 0.22)
  })

  it('transforms float with sign', () => {
    assert.deepEqual(match(/(-?\d*\.?\d+)/, '-1.22')[0], -1.22)
  })

  it('returns null when there is no match', () => {
    assert.equal(match(/hello/, 'world'), null)
  })

  it('ignores non capturing groups', () => {
    assert.deepEqual(
      match(
        /(\S+) ?(can|cannot)? (?:delete|cancel) the (\d+)(?:st|nd|rd|th) (attachment|slide) ?(?:upload)?/,
        'I can cancel the 1st slide upload'
      ),
      ['I', 'can', 1, 'slide']
    )
  })

  it('exposes source', () => {
    const expr = /I have (\d+) cukes? in my (.+) now/
    assert.deepEqual(
      new RegularExpression(expr, new ParameterTypeRegistry()).getSource(),
      expr.toString()
    )
  })
})

const match = (regexp, text) => {
  const parameterRegistry = new ParameterTypeRegistry()
  const regularExpression = new RegularExpression(regexp, parameterRegistry)
  const args = regularExpression.match(text)
  if (!args) return null
  return args.map(arg => arg.value)
}
