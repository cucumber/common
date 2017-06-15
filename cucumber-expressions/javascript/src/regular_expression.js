const buildArguments = require('./build_arguments')
const ParameterType = require('./parameter_type')

class RegularExpression {
  constructor(regexp, parameterTypeRegistry) {
    this._regexp = regexp
    this._parameterTypeRegistry = parameterTypeRegistry
  }

  match(text) {
    const parameterTypes = []

    const CAPTURE_GROUP_PATTERN = /\((?!\?:)([^(]+)\)/g

    let match
    while ((match = CAPTURE_GROUP_PATTERN.exec(this._regexp.source)) !== null) {
      const parameterTypeRegexp = match[1]

      let parameterType = this._parameterTypeRegistry.lookupByRegexp(
        parameterTypeRegexp,
        this._regexp,
        text
      )
      if (!parameterType) {
        parameterType = new ParameterType(
          '*',
          String,
          parameterTypeRegexp,
          false,
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
