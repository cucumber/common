class GeneratedExpression {
  constructor(expression, transforms) {
    this._expression = expression
    this._transforms = transforms
  }

  get source() {
    return this._expression
  }

  get transforms() {
    return this._transforms
  }
}

module.exports = GeneratedExpression
