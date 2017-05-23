const buildArguments = require('./build_arguments')

class RegularExpression {
  constructor(regexp, types, parameterTypeRegistry) {
    this._regexp = regexp
    this._types = types
    this._parameterTypeRegistry = parameterTypeRegistry
  }

  match(text) {
    const parameterTypes = []

    const CAPTURE_GROUP_PATTERN = /\(([^(]+)\)/g

    let typeIndex = 0
    let match
    while ((match = CAPTURE_GROUP_PATTERN.exec(this._regexp.source)) !== null) {
      const parameterTypeRegexp = match[1]
      const type = this._types.length <= typeIndex
        ? null
        : this._types[typeIndex++]

      let parameterType
      if (type) {
        parameterType = this._parameterTypeRegistry.lookupByType(type)
      }
      if (!parameterType) {
        parameterType = this._parameterTypeRegistry.lookupByRegexp(
          parameterTypeRegexp,
          this._regexp,
          text
        )
      }
      if (!parameterType) {
        parameterType = this._parameterTypeRegistry.createAnonymousLookup(
          s => s
        )
      }
      parameterTypes.push(parameterType)
    }

    return buildArguments(this._regexp, text, parameterTypes)
  }

  getSource() {
    return this._regexp.toString()
  }
}

module.exports = RegularExpression
