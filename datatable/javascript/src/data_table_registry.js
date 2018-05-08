class DataTableRegistry {
  constructor() {
    this._registry = {}
    // TODO: built-in types
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
