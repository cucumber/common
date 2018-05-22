/* eslint-env mocha */

const assert = require('assert')
const DataTable = require('../src/data_table')

describe('DataTable', () => {
  describe('empty table', () => {
    it('is empty', () => {
      let table = DataTable.emptyDataTable()
      assert.equal(table.isEmpty, true)
      // Since javascript doesnt know 2d arrays, its really an array with an empty array in it
      assert.equal(table.cells().length, 1)
      assert.equal(table.cells()[0].length, 0)
    })
  })

  describe('raw', () => {
    it('should equal raw', () => {
      const raw = [['hundred', '100'], ['thousand', '1000']]
      let table = new DataTable(raw)
      assert.deepEqual(raw, table.cells())
    })
  })

  describe('cells', () => {
    it('should equal raw', () => {
      const raw = [['hundred', 100], ['thousand', 1000]]
      let table = new DataTable(raw)
      assert.deepEqual(raw, table.cells())
    })
  })

  describe('cell', () => {
    it('should get from raw', () => {
      const raw = [['hundred', 100], ['thousand', 1000]]
      let table = new DataTable(raw)
      assert.equal(raw[0][0], table.cell(0, 0))
      assert.equal(raw[0][1], table.cell(0, 1))
      assert.equal(raw[1][0], table.cell(1, 0))
      assert.equal(raw[1][1], table.cell(1, 1))
    })
  })

  describe('subtable', () => {
    it('should view subset of cells', () => {
      let raw = [
        ['ten', '10', '1'],
        ['hundred', '100', '2'],
        ['thousand', '1000', '3'],
      ]
      let table = new DataTable(raw)

      assert.deepEqual(
        [['ten', '10'], ['hundred', '100']],
        table.subTable(0, 0, 2, 2).cells()
      )

      assert.deepEqual(
        [['100', '2'], ['1000', '3']],
        table.subTable(1, 1).cells()
      )

      assert.deepEqual(table.cells(), table.subTable(0, 0).cells())

      assert.deepEqual('ten', table.subTable(0, 0, 3, 3).cell(0, 0))
      assert.deepEqual('1', table.subTable(0, 0).cell(0, 2))
      assert.deepEqual('thousand', table.subTable(0, 0, 3, 3).cell(2, 0))
      assert.deepEqual('3', table.subTable(0, 0).cell(2, 2))
    })

    it('throws for negative from row', () => {
      let table = createSimpleTable()

      assert.throws(() => {
        table.subTable(-1, 0, 1, 1)
      }, 'IndexOutOfBoundsException')
    })

    it('throws for negative from column', () => {
      let table = createSimpleTable()

      assert.throws(() => {
        table.subTable(0, -1, 1, 1)
      }, 'IndexOutOfBoundsException')
    })

    it('throws for large to row', () => {
      let table = createSimpleTable()

      assert.throws(() => {
        table.subTable(0, 0, 4, 1)
      }, 'IndexOutOfBoundsException')
    })

    it('throws for large to column', () => {
      let table = createSimpleTable()

      assert.throws(() => {
        table.subTable(0, 0, 1, 4)
      }, 'IndexOutOfBoundsException')
    })

    it('throws for invalid from to row', () => {
      let table = createSimpleTable()

      assert.throws(() => {
        table.subTable(2, 0, 1, 1)
      }, 'IndexOutOfBoundsException')
    })

    it('throws for invalid from to column', () => {
      let table = createSimpleTable()

      assert.throws(() => {
        table.subTable(0, 2, 1, 1)
      }, 'IndexOutOfBoundsException')
    })

    it('throws for negative row', () => {
      let table = createSimpleTable()

      assert.throws(() => {
        table.subTable(0, 0, 1, 1).cell(-1, 0)
      }, 'IndexOutOfBoundsException')
    })

    it('throws for negative column', () => {
      let table = createSimpleTable()

      assert.throws(() => {
        table.subTable(0, 0, 1, 1).cell(0, -1)
      }, 'IndexOutOfBoundsException')
    })

    it('throws for large row', () => {
      let table = createSimpleTable()

      assert.throws(() => {
        table.subTable(0, 0, 1, 1).cell(1, 0)
      }, 'IndexOutOfBoundsException')
    })

    it('throws for large column', () => {
      let table = createSimpleTable()

      assert.throws(() => {
        table.subTable(0, 0, 1, 1).cell(0, 1)
      }, 'IndexOutOfBoundsException')
    })

    it('is empty when empty', () => {
      const raw = [
        ['ten', '10', '1'],
        ['hundred', '100', '2'],
        ['thousand', '1000', '3'],
      ]
      let table = new DataTable(raw)

      let subTable = table.subTable(0, 3, 1, 3)

      assert.deepEqual(DataTable.emptyDataTable(), subTable)
      assert.equal(subTable.isEmpty, true)
      assert.equal(subTable.height, 0)
      assert.equal(subTable.width, 0)
      assert.deepEqual([[]], subTable.cells())
    })
  })

  describe('row', () => {
    it('gets a row', () => {
      const raw = [
        ['ten', '10', '1'],
        ['hundred', '100', '2'],
        ['thousand', '1000', '3'],
      ]
      let table = new DataTable(raw)
      assert.deepEqual(raw[2], table.row(2))
    })
  })

  describe('rows', () => {
    it('should view subset of rows', () => {
      const raw = [['ten', '10'], ['hundred', '100'], ['thousand', '1000']]

      let table = new DataTable(raw)

      assert.deepEqual(
        [['hundred', '100'], ['thousand', '1000']],
        table.rows(1).cells()
      )

      assert.deepEqual([['hundred', '100']], table.rows(1, 2).cells())
    })
  })

  function createSimpleTable() {
    return new DataTable([
      ['one', 'four', 'seven'],
      ['4444', '55555', '666666'],
    ])
  }

  describe('column', () => {
    it('should view single column', () => {
      const raw = [['hundred', '100', '2'], ['thousand', '1000', '3']]

      let table = new DataTable(raw)

      assert.deepEqual(['100', '1000'], table.column(1))
    })

    it('should throw for negative column value', () => {
      assert.throws(() => {
        createSimpleTable().column(-1)
      }, 'IndexOutOfBoundsException')
    })

    it('should throw for large column value', () => {
      assert.throws(() => {
        createSimpleTable().column(4)
      }, 'IndexOutOfBoundsException')
    })

    describe('when transposed', () => {
      it('should view single row', () => {
        const raw = [['hundred', '100', '2'], ['thousand', '1000', '3']]

        let table = new DataTable(raw).transpose()

        assert.deepEqual(['thousand', '1000', '3'], table.column(1))
      })
    })
  })

  describe('columns', () => {
    it('should view sub table', () => {
      const raw = [['hundred', '100', '2'], ['thousand', '1000', '3']]

      let table = new DataTable(raw)

      assert.deepEqual([['100', '2'], ['1000', '3']], table.columns(1).cells())

      assert.deepEqual([['100'], ['1000']], table.columns(1, 2).cells())
    })
  })

  describe('asLists', () => {
    it('should equal raw', () => {
      const raw = [['hundred', 100], ['thousand', 1000]]
      let table = new DataTable(raw)
      assert.deepEqual(raw, table.asLists())
    })
  })

  it('empty rows are ignored', () => {
    const raw = [[], []]
    let table = new DataTable(raw)
    assert.equal(table.isEmpty, true)
    assert.equal(table.height, 0)
    assert.equal(table.width, 0)
  })

  it('cells should have three columns and two rows', () => {
    const raw = createSimpleTable().cells()
    assert.equal(2, raw.length)
    for (let i = 0; i < raw.length; i++) {
      assert.equal(3, raw[i].length)
    }
  })

  describe('transposed raw', () => {
    it('should have two columns and three rows', () => {
      const raw = createSimpleTable()
        .transpose()
        .cells()
      assert.equal(3, raw.length)
      for (let i = 0; i < raw.length; i++) {
        assert.equal(2, raw[i].length)
      }
    })
  })
})
