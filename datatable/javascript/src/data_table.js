class DataTable {
  // TODO: jsdoc
  // TODO: fail on unequal rows?

  constructor(rawTable) {
    const raw = ignoreEmptyRows(requireRectangular(rawTable))
    this._rawTable = raw
  }

  static emptyDataTable() {
    return new DataTable([[]])
  }

  get height() {
    // Since javascript doesnt know 2d arrays, its really an array with an array in it
    // If there are no rows with content ( `[[]]` ), we consider height === 0
    const length = this._rawTable.length
    if (length === 1 && this.width === 0) {
      return 0
    }
    return length
  }

  get width() {
    return this._rawTable[0].length
  }

  get isEmpty() {
    return this.height === 0 || this.width === 0
  }

  cells() {
    return this._rawTable
  }

  cell(row, column) {
    rangeCheckRow(row, this.height)
    rangeCheckColumn(column, this.width)
    return this.cells()[row][column]
  }

  transpose() {
    let transposedRaw = this.cells()[0].map((col, i) =>
      this.cells().map(row => row[i])
    )
    return new DataTable(transposedRaw)
  }

  row(index) {
    rangeCheckRow(index, this.height)
    return this.cells()[index]
  }

  /**
   * The table as a 2-D array, without the first row, unless a range is specified
   * @param {number} fromRow The first row (including).
   * @param {number} toRow The last row (excluding).
   */
  rows(fromRow, toRow) {
    if (typeof fromRow === 'undefined') {
      fromRow = 1
    }
    let rows = this.cells().filter((row, rowIndex) => {
      return rowIndex >= fromRow && (!toRow || rowIndex < toRow)
    })
    return new DataTable(rows)
  }

  column(index) {
    rangeCheckColumn(index, this.width)
    return this.cells().map(row => {
      return row[index]
    })
  }

  /**
   * The table as a 2-D array, without the first column, unless a range is specified
   * @param {number} fromColumn The first column (including).
   * @param {number} toColumn The last column (excluding).
   */
  columns(fromColumn, toColumn) {
    if (typeof fromColumn === 'undefined') {
      fromColumn = 1
    }
    let columns = this.cells().map(row => {
      return row.filter((cell, columnIndex) => {
        return (
          columnIndex >= fromColumn && (!toColumn || columnIndex < toColumn)
        )
      })
    })
    return new DataTable(columns)
  }

  subTable(fromRow, fromColumn, toRow, toColumn) {
    if (fromRow < 0) {
      throw new IndexOutOfBoundsException(`fromRow: ${fromRow}`)
    }
    if (fromColumn < 0) {
      throw new IndexOutOfBoundsException(`fromColumn: ${fromColumn}`)
    }
    if (toRow > this.height) {
      throw new IndexOutOfBoundsException(`toRow: ${toRow}`)
    }
    if (toColumn > this.width) {
      throw new IndexOutOfBoundsException(`toColumn: ${toColumn}`)
    }
    if (fromRow > toRow) {
      throw new IndexOutOfBoundsException(
        `fromRow (${fromRow}) > toRow(${toRow})`
      )
    }
    if (fromColumn > toColumn) {
      throw new IndexOutOfBoundsException(
        `fromColumn (${fromRow}) > toColumn(${toRow})`
      )
    }

    return this.rows(fromRow, toRow).columns(fromColumn, toColumn)
  }

  /**
   * @returns  returns an array of objects where each row is converted to an object (column header is the key)
   */
  hashes() {
    const copy = this.cells()
    const keys = copy[0]
    const values = copy.slice(1)

    return values.map(row => {
      const obj = {}
      keys.forEach((key, i) => {
        obj[key] = row[i]
      })
      return obj
    }, {})
  }

  /**
   * @returns the table as a 2-D array
   */
  raw() {
    return this.cells()
  }

  /**
   * @returns returns an object where each row corresponds to an entry (first column is the key, second column is the value)
   */
  rowHash() {
    return this.cells().reduce((acc, target) => {
      return Object.assign(acc, { [target[0]]: target[1] })
    }, {})
  }

  /**
   * @returns a flattened array of all cells
   */
  flat() {
    return this.cells().reduce((accumulator, row) => {
      return accumulator.concat(row)
    }, [])
  }

  asLists() {
    return this.cells()
  }

  toString() {
    function getColumnWidth(table, columnIndex) {
      return table.column(columnIndex).sort((a, b) => {
        return b.toString().length - a.toString().length
      })[0].length
    }

    function formatCell(cell, columnWidth) {
      return ` ${cell.toString()}${' '.repeat(
        columnWidth - cell.toString().length
      )} |`
    }

    let table = this
    return this._rawTable
      .map(row => {
        return `|${row
          .map((cell, colIndex) => {
            return formatCell(cell, getColumnWidth(table, colIndex))
          })
          .join('')}`
      })
      .join('\n')
  }
}

function requireRectangular(rawTable) {
  var columns = rawTable[0].length
  for (var i = 1; i < rawTable.length; i++) {
    if (columns !== rawTable[i].length) {
      throw new IllegalArgumentException(
        `Table is not rectangular: expected ${columns} column(s) but found ${
          rawTable[i].length
        }.`
      )
    }
  }
  return rawTable
}

function ignoreEmptyRows(rawTable) {
  rawTable = rawTable.filter(row => {
    return row.length > 0
  })
  if (rawTable.length === 0) {
    return [[]]
  }
  return rawTable
}

function rangeCheckRow(row, height) {
  if (row < 0 || row >= height) {
    throw new IndexOutOfBoundsException(`row: ${row}, Height: ${height}`)
  }
}

function rangeCheckColumn(column, width) {
  if (column < 0 || column >= width) {
    throw new IndexOutOfBoundsException(`column: ${column}, Width: ${width}`)
  }
}

class IndexOutOfBoundsException extends TypeError {
  constructor() {
    super(...arguments)
    this.name = 'IndexOutOfBounds'
  }
}

class IllegalArgumentException extends TypeError {
  constructor() {
    super(...arguments)
    this.name = 'IllegalArgumentException'
  }
}

module.exports = DataTable
