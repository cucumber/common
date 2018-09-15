class DataTableTransformer {
  constructor(transformFn) {
    this._transformFn = transformFn
  }

  transform(dataTable) {
    return this._transformFn(dataTable)
  }

  static table(transformFn) {
    return new DataTableTransformer(dataTable => {
      return transformFn(dataTable)
    })
  }

  static cell(transformFn) {
    return new DataTableTransformer(dataTable => {
      return dataTable.raw().map(row => {
        return row.map(transformFn)
      })
    })
  }

  static row(transformFn) {
    return new DataTableTransformer(dataTable => {
      return dataTable.raw().map(transformFn)
    })
  }

  static entry(transformFn) {
    return new DataTableTransformer(dataTable => {
      return dataTable.hashes().map(transformFn)
    })
  }

  static list(transformFn) {
    return new DataTableTransformer(dataTable => {
      return dataTable.flat().map(cell => {
        return transformFn(cell)
      })
    })
  }
}

module.exports = DataTableTransformer
