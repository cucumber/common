/* eslint-env mocha */

const assert = require('assert')
const assertThrow = require('./assert_throws')
const ParameterTypeRegistry = require('../src/parameter_type_registry')
const ParameterType = require('../src/parameter_type')

describe('ParameterTypeRegistry', () => {
  let registry
  before(() => {
    registry = new ParameterTypeRegistry()
  })

  it('does not allow more than one preferential parameter type for each constructor', () => {
    class MyType {}

    registry.defineParameterType(
      new ParameterType('why', MyType, /why/, true, null)
    )
    assertThrow(
      () =>
        registry.defineParameterType(
          new ParameterType('whynot', MyType, /whynot/, true, null)
        ),
      'There can only be one preferential parameter type per constructor. The constructor MyType is used for two preferential parameter types, {why} and {whynot}'
    )
  })

  it('looks up preferential parameter type by constructor', () => {
    const parameterType = registry.lookupByType(Number)
    assert.equal(parameterType.name, 'int')
  })

  it('does not allow more than one preferential parameter type for each regexp', () => {
    registry.defineParameterType(
      new ParameterType('color', null, /red|blue|green/, true, null)
    )
    assertThrow(
      () =>
        registry.defineParameterType(
          new ParameterType('cssColor', null, /red|blue|green/, true, null)
        ),
      'There can only be one preferential parameter type per regexp. The regexp red|blue|green is used for two preferential parameter types, {color} and {cssColor}'
    )
  })

  it('looks up preferential parameter type by regexp', () => {
    const name = new ParameterType('name', null, /[A-Z]+\w+/, false, null)
    const person = new ParameterType('person', null, /[A-Z]+\w+/, true, null)
    const place = new ParameterType('place', null, /[A-Z]+\w+/, false, null)

    registry.defineParameterType(name)
    registry.defineParameterType(person)
    registry.defineParameterType(place)

    assert.equal(
      registry.lookupByRegexp(
        '[A-Z]+\\w+',
        /([A-Z]+\w+) and ([A-Z]+\w+)/,
        'Lisa and Bob'
      ),
      person
    )
  })
})
