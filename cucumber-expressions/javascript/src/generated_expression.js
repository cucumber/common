class GeneratedExpression {
  constructor(expression, argumentNames, parameters) {
    this._expression = expression
    this._argumentNames = argumentNames
    this._parameters = parameters
  }

  get source() {
    return this._expression
  }

  get argumentNames() {
    return this._argumentNames
  }

  get parameters() {
    return this._parameters
  }
}

module.exports = GeneratedExpression
