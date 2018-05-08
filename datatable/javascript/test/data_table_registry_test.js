/* eslint-env mocha */

const assert = require('assert')
const DataTableRegistry = require('../src/data_table_registry')
const DataTableType = require('../src/data_table_type')

describe('DataTypeRegistry', () => {
  let registry
  let dataTableType
  beforeEach(() => {
    registry = new DataTableRegistry()
    dataTableType = new DataTableType('mytype', rawTable => {
      return rawTable
    })
  })

  it('adds the given type to the registry and can look it up', () => {
    // initially not there
    assert.equal(registry.lookupTableTypeByName('mytype'), undefined)

    registry.defineDataTableType(dataTableType)
    assert.equal(registry.lookupTableTypeByName('mytype'), dataTableType)
  })

  it('does not allow more than one preferential data table type for each identifier', () => {
    registry.defineDataTableType(dataTableType)
    assert.throws(() => {
      registry.defineDataTableType(dataTableType)
    }, /already defined/)
  })

  it('looks up preferential data table type by identifier', () => {})

  describe('built-in types', () => {})
})
