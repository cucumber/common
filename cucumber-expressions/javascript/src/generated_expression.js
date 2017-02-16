class GeneratedExpression {
  constructor(expression, parameterNames, parameters) {
    this._expression = expression
    this._parameterNames = parameterNames
    this._parameters = parameters
  }

  get source() {
    return this._expression
  }

  /**
   * Returns an array of parameter names to use in generated function/method signatures
   *
   * @returns {Array.<String>}
   */
  get parameterNames() {
    return this._parameterNames
  }

  /**
   * @returns {Array.<Parameter>}
   */
  get parameters() {
    return this._parameters
  }
}

module.exports = GeneratedExpression
