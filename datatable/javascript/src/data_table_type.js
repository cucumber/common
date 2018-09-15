const DataTable = require('../src/data_table')

class DataTableType {
  constructor(identifier, transformer) {
    this._id = identifier
    this._transformer = transformer
  }

  get identifier() {
    return this._id
  }

  transform(rawTable) {
    return this._transformer.transform(new DataTable(rawTable))
  }
}

module.exports = DataTableType
