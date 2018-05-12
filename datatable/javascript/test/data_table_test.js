/* eslint-env mocha */

const assert = require('assert')
const DataTable = require('../src/data_table')

const table2x2 = [['A0', 'A1'], ['B0', 'B1']]
const table2x3 = [['A0', 'A1', 'A2'], ['B0', 'B1', 'B2']]
const table3x2 = [['A0', 'A1'], ['B0', 'B1'], ['C0', 'C1']]
const table3x3 = [['A0', 'A1', 'A2'], ['B0', 'B1', 'B2'], ['C0', 'C1', 'C2']]

describe('DataTable', () => {
  describe('constructor(2dArray)', () => {
    it('returns a DataTable instance', () => {
      assert.equal(new DataTable([[]]).constructor, DataTable)
    })
  })

  describe('properties', () => {
    describe('cells', () => {
      it('returns the 2d array', () => {
        assert.deepEqual(new DataTable(table2x2).cells, table2x2)
      })
      it('returns a copy, not the original array', () => {
        const datatable = new DataTable(table2x2)
        datatable.cells = 'mutated'
        assert.deepEqual(datatable.cells, new DataTable(table2x2).cells)
      })
    })

    describe('isEmpty', () => {
      it('returns true if the table is empty', () => {
        assert.equal(new DataTable([[]]).isEmpty, true)
      })

      it('returns false if the table has rows and columns', () => {
        assert.equal(new DataTable(table2x2).isEmpty, false)
      })
    })

    describe('height', () => {
      it('returns the number of rows', () => {
        assert.equal(new DataTable(table2x3).height, 2)
      })
    })

    describe('width', () => {
      it('returns the number of columns', () => {
        assert.equal(new DataTable(table2x3).width, 3)
      })
    })
  })

  describe('operations', () => {
    describe('transpose', () => {
      it('returns the transposed table, as a DataTable', () => {
        const datatable = new DataTable([
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
        assert.deepEqual(new DataTable(table3x3).row(1), table3x3[1])
      })
    })
    describe('rows(fromRow, toRow)', () => {
      it('returns table containing the rows between fromRow (inclusive) to toRow (exclusive)', () => {
        assert.deepEqual(new DataTable(table3x3).rows(1, 2).cells, [
          table3x3[1],
        ])
      })
      it('returns all rows from fromRow if no toRow is specified', () => {
        assert.deepEqual(new DataTable(table3x3).rows(1).cells, [
          table3x3[1],
          table3x3[2],
        ])
      })
      it('returns all rows without the first one if no fromRow is specified', () => {
        assert.deepEqual(new DataTable(table3x3).rows().cells, [
          table3x3[1],
          table3x3[2],
        ])
      })
    })

    describe('column(index)', () => {
      it('returns a single column at the given index', () => {
        assert.deepEqual(new DataTable(table3x3).column(1), [
          table3x3[0][1],
          table3x3[1][1],
          table3x3[2][1],
        ])
      })
    })
    describe('columns(fromColumn, toColumn)', () => {
      it('returns table containing the columns between fromColumn (inclusive) to toColumn (exclusive)', () => {
        assert.deepEqual(new DataTable(table3x3).columns(1, 2).cells, [
          [table3x3[0][1]],
          [table3x3[1][1]],
          [table3x3[2][1]],
        ])
      })
      it('returns all columns from fromRow if no toColumn is specified', () => {
        assert.deepEqual(new DataTable(table3x3).columns(1).cells, [
          [table3x3[0][1], table3x3[0][2]],
          [table3x3[1][1], table3x3[1][2]],
          [table3x3[2][1], table3x3[2][2]],
        ])
      })
      it('returns all columns without the first one if no fromColumn is specified', () => {
        assert.deepEqual(new DataTable(table3x3).columns().cells, [
          [table3x3[0][1], table3x3[0][2]],
          [table3x3[1][1], table3x3[1][2]],
          [table3x3[2][1], table3x3[2][2]],
        ])
      })
    })

    describe('subTable(fromRow, fromColumn, toRow, toColumn)', () => {
      it('returns a containing the columns between fromRow and fromColumn (inclusive) to toRow and toColumn (exclusive)', () => {
        assert.deepEqual(new DataTable(table3x3).subTable(1, 0, 3, 2).cells, [
          [table3x3[1][0], table3x3[1][1]],
          [table3x3[2][0], table3x3[2][1]],
        ])
      })
    })

    describe('raw', () => {
      it('returns the cells', () => {
        const datatable = new DataTable(table3x3)
        assert.deepEqual(datatable.raw(), datatable.cells)
      })
    })

    describe('hashes', () => {
      it('returns an array of objects where the keys are the headers', () => {
        assert.deepEqual(new DataTable(table3x2).hashes(), [
          {
            [table3x2[0][0]]: table3x2[1][0],
            [table3x2[0][1]]: table3x2[1][1],
          },
          {
            [table3x2[0][0]]: table3x2[2][0],
            [table3x2[0][1]]: table3x2[2][1],
          },
        ])
      })
    })

    describe('rowHash', () => {
      it('returns an object where the keys are the first column', () => {
        assert.deepEqual(new DataTable(table3x2).rowHash(), {
          [table3x2[0][0]]: table3x2[0][1],
          [table3x2[1][0]]: table3x2[1][1],
          [table3x2[2][0]]: table3x2[2][1],
        })
      })
    })

    describe('flat', () => {
      it('returns an flattened, 1D array', () => {
        assert.deepEqual(new DataTable(table2x2).flat(), [
          table2x2[0][0],
          table2x2[0][1],
          table2x2[1][0],
          table2x2[1][1],
        ])
      })
    })
  })
})
