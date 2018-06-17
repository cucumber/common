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
    const parameterTypes = this._treeRegexp.groupBuilder.children.map(
      groupBuilder => {
        const parameterTypeRegexp = groupBuilder.source

        return (
          this._parameterTypeRegistry.lookupByRegexp(
            parameterTypeRegexp,
            this._treeRegexp,
            text
          ) ||
          new ParameterType(
            null,
            parameterTypeRegexp,
            String,
            s => s,
            false,
            false
          )
        )
      }
    )

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
