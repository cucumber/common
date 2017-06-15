/* eslint-env mocha */

const assert = require('assert')
const ParameterTypeRegistry = require('../src/parameter_type_registry')
const ParameterType = require('../src/parameter_type')

class Color {}
class Name {}
class Person {}
class Place {}

const CAPITALISED_WORD = /[A-Z]+\w+/

describe('ParameterTypeRegistry', () => {
  let registry
  beforeEach(() => {
    registry = new ParameterTypeRegistry()
  })

  it('looks up preferential parameter type by constructor', () => {
    registry.defineParameterType(
      new ParameterType(
        'color',
        Color,
        /red|blue|green/,
        true,
        s => new Color(s)
      )
    )
    const parameterType = registry.lookupByType(Color)
    assert.equal(parameterType.name, 'color')
  })

  it('does not allow more than one preferential parameter type for each regexp', () => {
    registry.defineParameterType(
      new ParameterType('name', Name, CAPITALISED_WORD, true, s => new Name(s))
    )
    registry.defineParameterType(
      new ParameterType(
        'person',
        Person,
        CAPITALISED_WORD,
        false,
        s => new Person(s)
      )
    )
    try {
      registry.defineParameterType(
        new ParameterType(
          'place',
          Place,
          CAPITALISED_WORD,
          true,
          s => new Place(s)
        )
      )
      throw new Error('Should have failed')
    } catch (err) {
      assert.equal(
        err.message,
        `There can only be one preferential parameter type per regexp. The regexp ${CAPITALISED_WORD} is used for two preferential parameter types, {name} and {place}`
      )
    }
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
