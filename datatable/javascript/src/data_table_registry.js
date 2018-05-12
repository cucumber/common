const DataTableType = require('./data_table_type')
const Transformer = require('./transformer')

class DataTableRegistry {
  constructor() {
    this._registry = {}

    let listTransformer = Transformer.list(item => {
      return item
    })
    this.defineDataTableType(new DataTableType('[string]', listTransformer))

    let intlistTransformer = Transformer.list(item => {
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
