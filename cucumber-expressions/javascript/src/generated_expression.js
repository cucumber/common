class GeneratedExpression {
  constructor(expression, parameterNames, parameterTypes) {
    this._expression = expression
    this._parameterNames = parameterNames
    this._parameterTypes = parameterTypes
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
   * @returns {Array.<ParameterType>}
   */
  get parameterTypes() {
    return this._parameterTypes
  }
}

module.exports = GeneratedExpression
