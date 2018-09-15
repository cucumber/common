/* eslint-env mocha */

const assert = require('assert')
const DataTableTransformer = require('../src/data_table_transformer')
const DataTable = require('../src/data_table')

describe('Transformer', () => {
  const datatable = new DataTable([['A0', 'A1'], ['B0', 'B1']])

  describe('Cell Transformer', () => {
    it('applies the given transform function on each cell individually', () => {
      let transformer = DataTableTransformer.cell(cell => {
        return cell.toLowerCase()
      })
      let transformed = transformer.transform(datatable)
      assert.deepEqual(transformed, [['a0', 'a1'], ['b0', 'b1']])
    })
  })

  describe('Row Transformer', () => {
    it('applies the given transform function on each row individually', () => {
      let transformer = DataTableTransformer.row(row => {
        return row.join(',')
      })
      let transformed = transformer.transform(datatable)
      assert.deepEqual(transformed, ['A0,A1', 'B0,B1'])
    })
  })

  describe('Table Transformer', () => {
    it('applies the given transform function on the entire table', () => {
      let transformer = DataTableTransformer.table(table => {
        return table.transpose().raw()
      })
      let transformed = transformer.transform(datatable)
      assert.deepEqual(transformed, [['A0', 'B0'], ['A1', 'B1']])
    })
  })

  describe('Entry Transformer', () => {
    it('applies the given transform function on each entry (header value) pair', () => {
      let transformer = DataTableTransformer.entry(entry => {
        return entry['A0'] + entry['A1']
      })
      let transformed = transformer.transform(datatable)
      assert.deepEqual(transformed, ['B0B1'])
    })
  })

  describe('List Transformer', () => {
    it('applies the given transform function on then entire, but flattened table', () => {
      const xList = [['1', '2', '3']]
      const yList = [['1'], ['2'], ['3']]

      let transformer = DataTableTransformer.list(parseInt)
      let transformedX = transformer.transform(new DataTable(xList))
      assert.deepEqual(transformedX, [1, 2, 3])

      let transformedY = transformer.transform(new DataTable(yList))
      assert.deepEqual(transformedY, [1, 2, 3])
    })
  })
})
