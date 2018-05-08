/* eslint-env mocha */

const assert = require('assert')
const DataTable = require('../src/data_table')

const table2x2 = [['A0', 'A1'], ['B0', 'B1']]
const table2x3 = [['A0', 'A1', 'A2'], ['B0', 'B1', 'B2']]
const table3x3 = [['A0', 'A1', 'A2'], ['B0', 'B1', 'B2'], ['C0', 'C1', 'C2']]

describe('DataTable', () => {
  describe('.create(2dArray)', () => {
    it('returns a DataTable instance', () => {
      assert.equal(DataTable.create([[]]).constructor, DataTable)
    })
  })

  describe('properties', () => {
    describe('cells', () => {
      it('returns the 2d array', () => {
        assert.deepEqual(DataTable.create(table2x2).cells, table2x2)
      })
    })

    describe('isEmpty', () => {
      it('returns true if the table is empty', () => {
        assert.equal(DataTable.create([[]]).isEmpty, true)
      })

      it('returns false if the table has rows and columns', () => {
        assert.equal(DataTable.create(table2x2).isEmpty, false)
      })
    })

    describe('height', () => {
      it('returns the number of rows', () => {
        assert.equal(DataTable.create(table2x3).height, 2)
      })
    })

    describe('width', () => {
      it('returns the number of columns', () => {
        assert.equal(DataTable.create(table2x3).width, 3)
      })
    })
  })

  describe('operations', () => {
    describe('transpose', () => {
      it('returns the transposed table, as a DataTable', () => {
        const datatable = DataTable.create([
          ['A0', 'A1', 'A2'],
          ['B0', 'B1', 'B2'],
        ])
        const transposed = datatable.transpose()
        assert.deepEqual(transposed.cells, [
          ['A0', 'B0'],
          ['A1', 'B1'],
          ['A2', 'B2'],
        ])
      })
    })

    describe('row(index)', () => {
      it('returns a single row at the given index', () => {
        assert.deepEqual(DataTable.create(table3x3).row(1), table3x3[1])
      })
    })
    describe('rows(fromRow, toRow)', () => {
      it('returns table containing the rows between fromRow (inclusive) to toRow (exclusive)', () => {
        assert.deepEqual(DataTable.create(table3x3).rows(1, 2).cells, [
          table3x3[1],
        ])
      })

      it('returns all rows from fromRow if no toRow is specified', () => {
        assert.deepEqual(DataTable.create(table3x3).rows(1).cells, [
          table3x3[1],
          table3x3[2],
        ])
      })
    })

    describe('column(index)', () => {
      it('returns a single column at the given index', () => {
        assert.deepEqual(DataTable.create(table3x3).column(1), [
          table3x3[0][1],
          table3x3[1][1],
          table3x3[2][1],
        ])
      })
    })
    describe('columns(fromColumn, toColumn)', () => {
      it('returns table containing the columns between fromColumn (inclusive) to toColumn (exclusive)', () => {
        assert.deepEqual(DataTable.create(table3x3).columns(1, 2).cells, [
          [table3x3[0][1]],
          [table3x3[1][1]],
          [table3x3[2][1]],
        ])
      })
      it('returns all rows from fromRow if no toRow is specified', () => {
        assert.deepEqual(DataTable.create(table3x3).columns(1).cells, [
          [table3x3[0][1], table3x3[0][2]],
          [table3x3[1][1], table3x3[1][2]],
          [table3x3[2][1], table3x3[2][2]],
        ])
      })
    })

    describe('subTable(fromRow, fromColumn, toRow, toColumn)', () => {
      it('returns a containing the columns between fromRow and fromColumn (inclusive) to toRow and toColumn (exclusive)', () => {
        assert.deepEqual(
          DataTable.create(table3x3).subTable(1, 0, 3, 2).cells,
          [[table3x3[1][0], table3x3[1][1]], [table3x3[2][0], table3x3[2][1]]]
        )
      })
    })
  })
})
