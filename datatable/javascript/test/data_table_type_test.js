/* eslint-env mocha */

const assert = require('assert')
const DataTableType = require('../src/data_table_type')

describe('DataTableType', () => {
  let dataTableType
  beforeEach(() => {
    dataTableType = new DataTableType('mytype', function() {})
  })

  describe('properties', () => {
    it('has an identifier representing the type of data table', () => {
      assert.equal(dataTableType.identifier, 'mytype')
    })
  })

  describe('transform', () => {
    it('calls the transformer with the DataTable of the given raw data to transform', () => {
      const data = [['A0', 'A1', 'A2'], ['B0', 'B1', 'B2']]
      let transformer = function(dataTable) {
        return dataTable.transpose().cells
      }

      dataTableType = new DataTableType('mytype', transformer)
      assert.deepEqual(dataTableType.transform(data), [
        ['A0', 'B0'],
        ['A1', 'B1'],
        ['A2', 'B2'],
      ])
    })
  })
})
