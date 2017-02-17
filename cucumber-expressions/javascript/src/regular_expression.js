const matchPattern = require('./build_arguments')

class RegularExpression {
  constructor(regexp, types, parameterRegistry) {
    this._regexp = regexp
    this._parameters = []

    const CAPTURE_GROUP_PATTERN = /\(([^(]+)\)/g

    let typeIndex = 0
    let match
    while ((match = CAPTURE_GROUP_PATTERN.exec(regexp.source)) !== null) {
      const captureGroupPattern = match[1]
      const type = types.length <= typeIndex ? null : types[typeIndex++]

      let parameter
      if (type) {
        parameter = parameterRegistry.lookupByType(type)
      }
      if (!parameter) {
        parameter = parameterRegistry.lookupByCaptureGroupRegexp(captureGroupPattern)
      }
      if (!parameter) {
        parameter = parameterRegistry.createAnonymousLookup(s => s)
      }
      this._parameters.push(parameter)
    }
  }

  match(text) {
    return matchPattern(this._regexp, text, this._parameters)
  }

  getSource() {
    return this._regexp.toString()
  }
}

module.exports = RegularExpression
