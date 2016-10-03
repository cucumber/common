class GeneratedExpression {
  constructor(expression, argumentNames, transforms) {
    this._expression = expression
    this._argumentNames = argumentNames
    this._transforms = transforms

  }

  get source() {
    return this._expression
  }

  get transforms() {
    return this._transforms
  }

  get argumentNames() {
    return this._argumentNames
  }
}

module.exports = GeneratedExpression
