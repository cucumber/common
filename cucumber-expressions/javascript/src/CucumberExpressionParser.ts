import { Node, NodeType, Token, TokenType } from './Ast'
import CucumberExpressionTokenizer from './CucumberExpressionTokenizer'
import {
  createAlternationNotAllowedInOptional,
  createInvalidParameterTypeNameInNode,
  createMissingEndToken,
} from './Errors'

/*
 * text := whitespace | ')' | '}' | .
 */
function parseText(expression: string, tokens: readonly Token[], current: number) {
  const token = tokens[current]
  switch (token.type) {
    case TokenType.whiteSpace:
    case TokenType.text:
    case TokenType.endParameter:
    case TokenType.endOptional:
      return {
        consumed: 1,
        ast: [new Node(NodeType.text, undefined, token.text, token.start, token.end)],
      }
    case TokenType.alternation:
      throw createAlternationNotAllowedInOptional(expression, token)
    case TokenType.startOfLine:
    case TokenType.endOfLine:
    case TokenType.beginOptional:
    case TokenType.beginParameter:
    default:
      // If configured correctly this will never happen
      return { consumed: 0 }
  }
}

/*
 * parameter := '{' + name* + '}'
 */
function parseName(expression: string, tokens: readonly Token[], current: number) {
  const token = tokens[current]
  switch (token.type) {
    case TokenType.whiteSpace:
    case TokenType.text:
      return {
        consumed: 1,
        ast: [new Node(NodeType.text, undefined, token.text, token.start, token.end)],
      }
    case TokenType.beginOptional:
    case TokenType.endOptional:
    case TokenType.beginParameter:
    case TokenType.endParameter:
    case TokenType.alternation:
      throw createInvalidParameterTypeNameInNode(token, expression)
    case TokenType.startOfLine:
    case TokenType.endOfLine:
    default:
      // If configured correctly this will never happen
      return { consumed: 0 }
  }
}

/*
 * parameter := '{' + text* + '}'
 */
const parseParameter = parseBetween(
  NodeType.parameter,
  TokenType.beginParameter,
  TokenType.endParameter,
  [parseName]
)

/*
 * optional := '(' + option* + ')'
 * option := optional | parameter | text
 */
const optionalSubParsers: Array<Parser> = []
const parseOptional = parseBetween(
  NodeType.optional,
  TokenType.beginOptional,
  TokenType.endOptional,
  optionalSubParsers
)
optionalSubParsers.push(parseOptional, parseParameter, parseText)

/*
 * alternation := alternative* + ( '/' + alternative* )+
 */
function parseAlternativeSeparator(expression: string, tokens: readonly Token[], current: number) {
  if (!lookingAt(tokens, current, TokenType.alternation)) {
    return { consumed: 0 }
  }
  const token = tokens[current]
  return {
    consumed: 1,
    ast: [new Node(NodeType.alternative, undefined, token.text, token.start, token.end)],
  }
}

const alternativeParsers: readonly Parser[] = [
  parseAlternativeSeparator,
  parseOptional,
  parseParameter,
  parseText,
]

/*
 * alternation := (?<=left-boundary) + alternative* + ( '/' + alternative* )+ + (?=right-boundary)
 * left-boundary := whitespace | } | ^
 * right-boundary := whitespace | { | $
 * alternative: = optional | parameter | text
 */
const parseAlternation: Parser = (expression, tokens, current) => {
  const previous = current - 1
  if (
    !lookingAtAny(tokens, previous, [
      TokenType.startOfLine,
      TokenType.whiteSpace,
      TokenType.endParameter,
    ])
  ) {
    return { consumed: 0 }
  }

  const result = parseTokensUntil(expression, alternativeParsers, tokens, current, [
    TokenType.whiteSpace,
    TokenType.endOfLine,
    TokenType.beginParameter,
  ])
  const subCurrent = current + result.consumed
  if (!result.ast.some((astNode) => astNode.type == NodeType.alternative)) {
    return { consumed: 0 }
  }

  const start = tokens[current].start
  const end = tokens[subCurrent].start
  // Does not consume right hand boundary token
  return {
    consumed: result.consumed,
    ast: [
      new Node(
        NodeType.alternation,
        splitAlternatives(start, end, result.ast),
        undefined,
        start,
        end
      ),
    ],
  }
}

/*
 * cucumber-expression :=  ( alternation | optional | parameter | text )*
 */
const parseCucumberExpression = parseBetween(
  NodeType.expression,
  TokenType.startOfLine,
  TokenType.endOfLine,
  [parseAlternation, parseOptional, parseParameter, parseText]
)

export default class CucumberExpressionParser {
  parse(expression: string): Node {
    const tokenizer = new CucumberExpressionTokenizer()
    const tokens = tokenizer.tokenize(expression)
    const result = parseCucumberExpression(expression, tokens, 0)
    return result.ast[0]
  }
}

interface Parser {
  (expression: string, tokens: readonly Token[], current: number): Result
}

interface Result {
  readonly consumed: number
  readonly ast?: readonly Node[]
}

function parseBetween(
  type: NodeType,
  beginToken: TokenType,
  endToken: TokenType,
  parsers: Array<Parser>
): Parser {
  return (expression, tokens, current) => {
    if (!lookingAt(tokens, current, beginToken)) {
      return { consumed: 0 }
    }
    let subCurrent = current + 1
    const result = parseTokensUntil(expression, parsers, tokens, subCurrent, [
      endToken,
      TokenType.endOfLine,
    ])
    subCurrent += result.consumed

    // endToken not found
    if (!lookingAt(tokens, subCurrent, endToken)) {
      throw createMissingEndToken(expression, beginToken, endToken, tokens[current])
    }
    // consumes endToken
    const start = tokens[current].start
    const end = tokens[subCurrent].end
    const consumed = subCurrent + 1 - current
    const ast = [new Node(type, result.ast, undefined, start, end)]
    return { consumed, ast }
  }
}

function parseToken(
  expression: string,
  parsers: readonly Parser[],
  tokens: readonly Token[],
  startAt: number
): Result {
  for (let i = 0; i < parsers.length; i++) {
    const parse = parsers[i]
    const result = parse(expression, tokens, startAt)
    if (result.consumed != 0) {
      return result
    }
  }
  // If configured correctly this will never happen
  throw new Error('No eligible parsers for ' + tokens)
}

function parseTokensUntil(
  expression: string,
  parsers: readonly Parser[],
  tokens: readonly Token[],
  startAt: number,
  endTokens: readonly TokenType[]
): Result {
  let current = startAt
  const size = tokens.length
  const ast: Node[] = []
  while (current < size) {
    if (lookingAtAny(tokens, current, endTokens)) {
      break
    }
    const result = parseToken(expression, parsers, tokens, current)
    if (result.consumed == 0) {
      // If configured correctly this will never happen
      // Keep to avoid infinite loops
      throw new Error('No eligible parsers for ' + tokens)
    }
    current += result.consumed
    ast.push(...result.ast)
  }
  return { consumed: current - startAt, ast }
}

function lookingAtAny(
  tokens: readonly Token[],
  at: number,
  tokenTypes: readonly TokenType[]
): boolean {
  return tokenTypes.some((tokenType) => lookingAt(tokens, at, tokenType))
}

function lookingAt(tokens: readonly Token[], at: number, token: TokenType): boolean {
  if (at < 0) {
    // If configured correctly this will never happen
    // Keep for completeness
    return token == TokenType.startOfLine
  }
  if (at >= tokens.length) {
    return token == TokenType.endOfLine
  }
  return tokens[at].type == token
}

function splitAlternatives(
  start: number,
  end: number,
  alternation: readonly Node[]
): readonly Node[] {
  const separators: Node[] = []
  const alternatives: Node[][] = []
  let alternative: Node[] = []
  alternation.forEach((n) => {
    if (NodeType.alternative == n.type) {
      separators.push(n)
      alternatives.push(alternative)
      alternative = []
    } else {
      alternative.push(n)
    }
  })
  alternatives.push(alternative)
  return createAlternativeNodes(start, end, separators, alternatives)
}

function createAlternativeNodes(
  start: number,
  end: number,
  separators: readonly Node[],
  alternatives: readonly ReadonlyArray<Node>[]
): readonly Node[] {
  const nodes: Node[] = []

  for (let i = 0; i < alternatives.length; i++) {
    const n = alternatives[i]
    if (i == 0) {
      const rightSeparator = separators[i]
      nodes.push(new Node(NodeType.alternative, n, undefined, start, rightSeparator.start))
    } else if (i == alternatives.length - 1) {
      const leftSeparator = separators[i - 1]
      nodes.push(new Node(NodeType.alternative, n, undefined, leftSeparator.end, end))
    } else {
      const leftSeparator = separators[i - 1]
      const rightSeparator = separators[i]
      nodes.push(
        new Node(NodeType.alternative, n, undefined, leftSeparator.end, rightSeparator.start)
      )
    }
  }
  return nodes
}
