import ParameterType from './ParameterType'
import GeneratedExpression from './GeneratedExpression'

class CucumberExpressionError extends Error {}

function createTheEndOfLIneCanNotBeEscaped(
  expression: string
): CucumberExpressionError {
  const index = Array.from(expression).length - 1
  return new CucumberExpressionError(
    message(
      index,
      expression,
      pointAt(index),
      'The end of line can not be escaped',
      "You can use '\\\\' to escape the the '\\'"
    )
  )
}

function createCantEscaped(expression: string, index: number) {
  return new CucumberExpressionError(
    message(
      index,
      expression,
      pointAt(index),
      "Only the characters '{', '}', '(', ')', '\\', '/' and whitespace can be escaped",
      "If you did mean to use an '\\' you can use '\\\\' to escape it"
    )
  )
}

function message(
  index: number,
  expression: string,
  pointer: any,
  problem: string,
  solution: string
): string {
  return `This Cucumber Expression has a problem at column ${index + 1}:

${expression}
${pointer}
${problem}.
${solution}`
}

function pointAt(index: number): string {
  const pointer: Array<string> = []
  for (let i = 0; i < index; i++) {
    pointer.push(' ')
  }
  pointer.push('^')
  return pointer.join('')
}

class AmbiguousParameterTypeError extends CucumberExpressionError {
  public static forConstructor(
    keyName: string,
    keyValue: string,
    parameterTypes: ReadonlyArray<ParameterType<any>>,
    generatedExpressions: ReadonlyArray<GeneratedExpression>
  ) {
    return new this(
      `parameter type with ${keyName}=${keyValue} is used by several parameter types: ${parameterTypes}, ${generatedExpressions}`
    )
  }

  public static forRegExp(
    parameterTypeRegexp: string,
    expressionRegexp: RegExp,
    parameterTypes: ReadonlyArray<ParameterType<any>>,
    generatedExpressions: ReadonlyArray<GeneratedExpression>
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

  public static _parameterTypeNames(
    parameterTypes: ReadonlyArray<ParameterType<any>>
  ) {
    return parameterTypes.map((p) => `{${p.name}}`).join('\n   ')
  }

  public static _expressions(
    generatedExpressions: ReadonlyArray<GeneratedExpression>
  ) {
    return generatedExpressions.map((e) => e.source).join('\n   ')
  }
}

class UndefinedParameterTypeError extends CucumberExpressionError {
  constructor(public readonly undefinedParameterTypeName: string) {
    super(`Undefined parameter type {${undefinedParameterTypeName}}`)
  }
}

export {
  AmbiguousParameterTypeError,
  UndefinedParameterTypeError,
  CucumberExpressionError,
  createTheEndOfLIneCanNotBeEscaped,
  createCantEscaped,
}
