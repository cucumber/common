/* eslint-env mocha */

const assert = require('assert')
const ParameterTypeRegistry = require('../src/parameter_type_registry')

describe('ParameterTypeRegistry', () => {
  let registry
  before(() => {
    registry = new ParameterTypeRegistry()
  })

  it("looks up preferred parameter type by constructor", () => {
    const parameterType = registry.lookupByType(Number)
    assert.equal(parameterType.name, 'int')
  })
})