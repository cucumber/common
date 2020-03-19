import assert from 'assert'
import DataTable from '../src/DataTable'

describe('DataTable', () => {
  context('contentByLineNumber', () => {
    it('returns the content by line', () => {
      const dataTable = new DataTable(12, [['name', 'password']])
      assert.deepStrictEqual(
        dataTable.contentByLineNumber(),
        new Map([[12, '      | name | password |']])
      )
    })

    it('adapts the size of cells', () => {
      const dataTable = new DataTable(12, [
        ['name', 'password'],
        ['a', 'b'],
      ])
      assert.deepStrictEqual(
        dataTable.contentByLineNumber(),
        new Map([
          [12, '      | name | password |'],
          [13, '      | a    | b        |'],
        ])
      )
    })
  })
})
