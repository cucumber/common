class CucumberExpressionError extends Error {}

class AmbiguousParameterTypeError extends CucumberExpressionError {
  static forConstructor(
    keyName,
    keyValue,
    parameterTypes,
    generatedExpressions
  ) {
    return new this(
      `parameter type with ${keyName}=${keyValue} is used by several parameter types: ${parameterTypes}, ${generatedExpressions}`
    )
  }

  static forRegExp(
    parameterTypeRegexp,
    expressionRegexp,
    parameterTypes,
    generatedExpressions
  ) {
    return new this(
      `Your Regular Expression ${expressionRegexp}
matches multiple parameter types with regexp ${parameterTypeRegexp}:
   ${this._parameterTypeNames(parameterTypes)}

I couldn't decide which one to use. You have two options:

1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:
   ${this._expressions(generatedExpressions)}

2) Make one of the parameter types preferential and continue to use a Regular Expression.
`
    )
  }

  static _parameterTypeNames(parameterTypes) {
    return parameterTypes.map(p => `{${p.name}}`).join('\n   ')
  }

  static _expressions(generatedExpressions) {
    return generatedExpressions.map(e => e.source).join('\n   ')
  }
}

class UndefinedParameterTypeError extends CucumberExpressionError {
  constructor(typeName) {
    super(`Undefined parameter type {${typeName}}`)
  }
}

module.exports = {
  AmbiguousParameterTypeError,
  UndefinedParameterTypeError,
  CucumberExpressionError,
}
