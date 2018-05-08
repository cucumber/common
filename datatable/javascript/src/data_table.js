class DataTable {
  // TODO: jsdoc
  // TODO: fail on unequal rows?

  constructor(rawTable) {
    this._rawTable = rawTable
  }

  get cells() {
    return this._rawTable
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

  static create(rawTable) {
    return new DataTable(rawTable)
  }

  transpose() {
    let transposedRaw = this.cells[0].map((col, i) =>
      this.cells.map(row => row[i])
    )
    return DataTable.create(transposedRaw)
  }

  row(index) {
    return this.cells[index]
  }

  rows(fromRow, toRow) {
    let rows = this.cells.filter((row, rowIndex) => {
      return rowIndex >= fromRow && (!toRow || rowIndex < toRow)
    })
    return DataTable.create(rows)
  }

  column(index) {
    return this.cells.map(row => {
      return row[index]
    })
  }

  columns(fromColumn, toColumn) {
    let columns = this.cells.map(row => {
      return row.filter((cell, columnIndex) => {
        return (
          columnIndex >= fromColumn && (!toColumn || columnIndex < toColumn)
        )
      })
    })
    return DataTable.create(columns)
  }

  subTable(fromRow, fromColumn, toRow, toColumn) {
    return this.rows(fromRow, toRow).columns(fromColumn, toColumn)
  }
}

module.exports = DataTable
