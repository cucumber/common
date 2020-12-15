import ParameterType from './ParameterType'
import GeneratedExpression from './GeneratedExpression'
import { Located, Node, purposeOf, symbolOf, Token, TokenType } from './Ast'

export class CucumberExpressionError extends Error {}

export function createAlternativeMayNotExclusivelyContainOptionals(
  node: Node,
  expression: string
): CucumberExpressionError {
  return new CucumberExpressionError(
    message(
      node.start,
      expression,
      pointAtLocated(node),
      'An alternative may not exclusively contain optionals',
      "If you did not mean to use an optional you can use '\\(' to escape the the '('"
    )
  )
}
export function createAlternativeMayNotBeEmpty(
  node: Node,
  expression: string
): CucumberExpressionError {
  return new CucumberExpressionError(
    message(
      node.start,
      expression,
      pointAtLocated(node),
      'Alternative may not be empty',
      "If you did not mean to use an alternative you can use '\\/' to escape the the '/'"
    )
  )
}
export function createOptionalMayNotBeEmpty(
  node: Node,
  expression: string
): CucumberExpressionError {
  return new CucumberExpressionError(
    message(
      node.start,
      expression,
      pointAtLocated(node),
      'An optional must contain some text',
      "If you did not mean to use an optional you can use '\\(' to escape the the '('"
    )
  )
}
export function createParameterIsNotAllowedInOptional(
  node: Node,
  expression: string
): CucumberExpressionError {
  return new CucumberExpressionError(
    message(
      node.start,
      expression,
      pointAtLocated(node),
      'An optional may not contain a parameter type',
      "If you did not mean to use an parameter type you can use '\\{' to escape the the '{'"
    )
  )
}

export function createOptionalIsNotAllowedInOptional(
  node: Node,
  expression: string
): CucumberExpressionError {
  return new CucumberExpressionError(
    message(
      node.start,
      expression,
      pointAtLocated(node),
      'An optional may not contain an other optional',
      "If you did not mean to use an optional type you can use '\\(' to escape the the '('. For more complicated expressions consider using a regular expression instead."
    )
  )
}

export function createTheEndOfLIneCanNotBeEscaped(
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

export function createMissingEndToken(
  expression: string,
  beginToken: TokenType,
  endToken: TokenType,
  current: Token
) {
  const beginSymbol = symbolOf(beginToken)
  const endSymbol = symbolOf(endToken)
  const purpose = purposeOf(beginToken)
  return new CucumberExpressionError(
    message(
      current.start,
      expression,
      pointAtLocated(current),
      `The '${beginSymbol}' does not have a matching '${endSymbol}'`,
      `If you did not intend to use ${purpose} you can use '\\${beginSymbol}' to escape the ${purpose}`
    )
  )
}

export function createAlternationNotAllowedInOptional(
  expression: string,
  current: Token
) {
  return new CucumberExpressionError(
    message(
      current.start,
      expression,
      pointAtLocated(current),
      'An alternation can not be used inside an optional',
      "You can use '\\/' to escape the the '/'"
    )
  )
}

export function createCantEscaped(expression: string, index: number) {
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

export function createInvalidParameterTypeName(typeName: string) {
  return new CucumberExpressionError(
    `Illegal character in parameter name {${typeName}}. Parameter names may not contain '{', '}', '(', ')', '\\' or '/'`
  )
}

export function createInvalidParameterTypeNameInNode(
  token: Token,
  expression: string
) {
  return new CucumberExpressionError(
    message(
      token.start,
      expression,
      pointAtLocated(token),
      "Parameter names may not contain '{', '}', '(', ')', '\\' or '/'",
      'Did you mean to use a regular expression?'
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

function pointAtLocated(node: Located): string {
  const pointer = [pointAt(node.start)]
  if (node.start + 1 < node.end) {
    for (let i = node.start + 1; i < node.end - 1; i++) {
      pointer.push('-')
    }
    pointer.push('^')
  }
  return pointer.join('')
}

export class AmbiguousParameterTypeError extends CucumberExpressionError {
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

export class UndefinedParameterTypeError extends CucumberExpressionError {
  constructor(
    public readonly undefinedParameterTypeName: string,
    message: string
  ) {
    super(message)
  }
}

export function createUndefinedParameterType(
  node: Node,
  expression: string,
  undefinedParameterTypeName: string
) {
  return new UndefinedParameterTypeError(
    undefinedParameterTypeName,
    message(
      node.start,
      expression,
      pointAtLocated(node),
      `Undefined parameter type '${undefinedParameterTypeName}'`,
      `Please register a ParameterType for '${undefinedParameterTypeName}'`
    )
  )
}
