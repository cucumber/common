const DataTableType = require('./data_table_type')
const DataTableTransformer = require('./data_table_transformer')

class DataTableRegistry {
  constructor() {
    this._registry = {}

    let listTransformer = DataTableTransformer.list(item => {
      return item
    })
    this.defineDataTableType(new DataTableType('[string]', listTransformer))

    let intlistTransformer = DataTableTransformer.list(item => {
      return parseInt(item)
    })
    this.defineDataTableType(new DataTableType('[int]', intlistTransformer))
  }

  defineDataTableType(type) {
    if (this._registry[type.identifier])
      throw new Error(`Data table type already defined: ${type.name}`)
    this._registry[type.identifier] = type
  }

  lookupTableTypeByName(identifier) {
    return this._registry[identifier]
  }
}

module.exports = DataTableRegistry
