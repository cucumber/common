const buildArguments = require('./build_arguments')

class RegularExpression {
  constructor(regexp, types, parameterTypeRegistry) {
    this._regexp = regexp
    this._parameterTypes = []

    const CAPTURE_GROUP_PATTERN = /\(([^(]+)\)/g

    let typeIndex = 0
    let match
    while ((match = CAPTURE_GROUP_PATTERN.exec(regexp.source)) !== null) {
      const captureGroupPattern = match[1]
      const type = types.length <= typeIndex ? null : types[typeIndex++]

      let parameterType
      if (type) {
        parameterType = parameterTypeRegistry.lookupByType(type)
      }
      if (!parameterType) {
        parameterType = parameterTypeRegistry.lookupByRegexp(
          captureGroupPattern
        )
      }
      if (!parameterType) {
        parameterType = parameterTypeRegistry.createAnonymousLookup(s => s)
      }
      this._parameterTypes.push(parameterType)
    }
  }

  match(text) {
    return buildArguments(this._regexp, text, this._parameterTypes)
  }

  getSource() {
    return this._regexp.toString()
  }
}

module.exports = RegularExpression
