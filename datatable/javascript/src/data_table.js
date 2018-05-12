class DataTable {
  // TODO: jsdoc
  // TODO: fail on unequal rows?

  constructor(rawTable) {
    this._rawTable = rawTable
  }

  get cells() {
    return this._rawTable.slice(0)
  }

  get height() {
    return this._rawTable.length
  }

  get width() {
    return this._rawTable[0].length
  }

  get isEmpty() {
    return this.height <= 1 && this.width === 0
  }

  transpose() {
    let transposedRaw = this.cells[0].map((col, i) =>
      this.cells.map(row => row[i])
    )
    return new DataTable(transposedRaw)
  }

  row(index) {
    return this.cells[index]
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
    let rows = this.cells.filter((row, rowIndex) => {
      return rowIndex >= fromRow && (!toRow || rowIndex < toRow)
    })
    return new DataTable(rows)
  }

  column(index) {
    return this.cells.map(row => {
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
    let columns = this.cells.map(row => {
      return row.filter((cell, columnIndex) => {
        return (
          columnIndex >= fromColumn && (!toColumn || columnIndex < toColumn)
        )
      })
    })
    return new DataTable(columns)
  }

  subTable(fromRow, fromColumn, toRow, toColumn) {
    return this.rows(fromRow, toRow).columns(fromColumn, toColumn)
  }

  /**
   * @returns  returns an array of objects where each row is converted to an object (column header is the key)
   */
  hashes() {
    const copy = this.cells
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
    return this.cells
  }

  /**
   * @returns returns an object where each row corresponds to an entry (first column is the key, second column is the value)
   */
  rowHash() {
    return this.cells.reduce((acc, target) => {
      return Object.assign(acc, { [target[0]]: target[1] })
    }, {})
  }

  /**
   * @returns a flattened array of all cells
   */
  flat() {
    return this.cells.reduce((accumulator, row) => {
      return accumulator.concat(row)
    }, [])
  }
}

module.exports = DataTable
