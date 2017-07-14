const Argument = require('./argument')
const TreeRegexp = require('./tree_regexp')
const ParameterType = require('./parameter_type')

class RegularExpression {
  constructor(expressionRegexp, parameterTypeRegistry) {
    this._expressionRegexp = expressionRegexp
    this._parameterTypeRegistry = parameterTypeRegistry
    this._treeRegexp = new TreeRegexp(expressionRegexp)
  }

  match(text) {
    const parameterTypes = []

    const CAPTURE_GROUP_PATTERN = /\((?!\?:)([^(]+)\)/g

    let match
    while (
      (match = CAPTURE_GROUP_PATTERN.exec(this._treeRegexp.regexp.source)) !==
      null
    ) {
      const parameterTypeRegexp = match[1]

      let parameterType = this._parameterTypeRegistry.lookupByRegexp(
        parameterTypeRegexp,
        this._treeRegexp,
        text
      )
      if (!parameterType) {
        parameterType = new ParameterType(
          parameterTypeRegexp,
          parameterTypeRegexp,
          String,
          s => s,
          false,
          false
        )
      }
      parameterTypes.push(parameterType)
    }

    return Argument.build(this._treeRegexp, text, parameterTypes)
  }

  get regexp() {
    return this._expressionRegexp
  }

  get source() {
    return this._expressionRegexp.source
  }
}

module.exports = RegularExpression
