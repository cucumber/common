const OPERAND = 'operand'
const OPERATOR = 'operator'
const PREC: { [key: string]: number } = {
  '(': -2,
  ')': -1,
  or: 0,
  and: 1,
  not: 2,
}
const ASSOC: { [key: string]: string } = {
  or: 'left',
  and: 'left',
  not: 'right',
}

/**
 * Parses infix boolean expression (using Dijkstra's Shunting Yard algorithm)
 * and builds a tree of expressions. The root node of the expression is returned.
 *
 * This expression can be evaluated by passing in an array of literals that resolve to true
 */
export default function parse(infix: string): Node {
  const tokens = tokenize(infix)
  if (tokens.length === 0) {
    return new True()
  }
  const expressions: Node[] = []
  const operators: string[] = []
  let expectedTokenType = OPERAND

  tokens.forEach(function(token) {
    if (isUnary(token)) {
      check(expectedTokenType, OPERAND)
      operators.push(token)
      expectedTokenType = OPERAND
    } else if (isBinary(token)) {
      check(expectedTokenType, OPERATOR)
      while (
        operators.length > 0 &&
        isOp(peek(operators)) &&
        ((ASSOC[token] === 'left' && PREC[token] <= PREC[peek(operators)]) ||
          (ASSOC[token] === 'right' && PREC[token] < PREC[peek(operators)]))
      ) {
        pushExpr(pop(operators), expressions)
      }
      operators.push(token)
      expectedTokenType = OPERAND
    } else if ('(' === token) {
      check(expectedTokenType, OPERAND)
      operators.push(token)
      expectedTokenType = OPERAND
    } else if (')' === token) {
      check(expectedTokenType, OPERATOR)
      while (operators.length > 0 && peek(operators) !== '(') {
        pushExpr(pop(operators), expressions)
      }
      if (operators.length === 0) {
        throw Error('Syntax error. Unmatched )')
      }
      if (peek(operators) === '(') {
        pop(operators)
      }
      expectedTokenType = OPERATOR
    } else {
      check(expectedTokenType, OPERAND)
      pushExpr(token, expressions)
      expectedTokenType = OPERATOR
    }
  })

  while (operators.length > 0) {
    if (peek(operators) === '(') {
      throw Error('Syntax error. Unmatched (')
    }
    pushExpr(pop(operators), expressions)
  }

  return pop(expressions)
}

function tokenize(expr: string): string[] {
  const tokens = []
  let isEscaped = false
  let token
  for (let i = 0; i < expr.length; i++) {
    const c = expr.charAt(i)
    if ('\\' === c) {
      isEscaped = true
    } else {
      if (/\s/.test(c)) {
        // skip
        if (token) {
          // end of token
          tokens.push(token.join(''))
          token = undefined
        }
      } else {
        if ((c === '(' || c === ')') && !isEscaped) {
          if (token) {
            // end of token
            tokens.push(token.join(''))
            token = undefined
          }
          tokens.push(c)
          continue
        }
        token = token ? token : [] // start of token
        token.push(c)
      }
      isEscaped = false
    }
  }
  if (token) {
    tokens.push(token.join(''))
  }
  return tokens
}

function isUnary(token: string) {
  return 'not' === token
}

function isBinary(token: string) {
  return 'or' === token || 'and' === token
}

function isOp(token: string) {
  return ASSOC[token] !== undefined
}

function check(expectedTokenType: string, tokenType: string) {
  if (expectedTokenType !== tokenType) {
    throw new Error('Syntax error. Expected ' + expectedTokenType)
  }
}

function peek(stack: string[]) {
  return stack[stack.length - 1]
}

function pop<T>(stack: T[]): T {
  if (stack.length === 0) {
    throw new Error('empty stack')
  }
  return stack.pop()
}

function pushExpr(token: string, stack: Node[]) {
  if (token === 'and') {
    const rightAndExpr = pop(stack)
    stack.push(new And(pop(stack), rightAndExpr))
  } else if (token === 'or') {
    const rightOrExpr = pop(stack)
    stack.push(new Or(pop(stack), rightOrExpr))
  } else if (token === 'not') {
    stack.push(new Not(pop(stack)))
  } else {
    stack.push(new Literal(token))
  }
}

interface Node {
  evaluate(variables: string[]): boolean
}

class Literal implements Node {
  constructor(private readonly value: string) {}

  public evaluate(variables: string[]) {
    return variables.indexOf(this.value) !== -1
  }

  public toString() {
    return this.value.replace(/\(/g, '\\(').replace(/\)/g, '\\)')
  }
}

class Or implements Node {
  constructor(
    private readonly leftExpr: Node,
    private readonly rightExpr: Node
  ) {}

  public evaluate(variables: string[]) {
    return (
      this.leftExpr.evaluate(variables) || this.rightExpr.evaluate(variables)
    )
  }

  public toString() {
    return (
      '( ' +
      this.leftExpr.toString() +
      ' or ' +
      this.rightExpr.toString() +
      ' )'
    )
  }
}

class And implements Node {
  constructor(
    private readonly leftExpr: Node,
    private readonly rightExpr: Node
  ) {}

  public evaluate(variables: string[]) {
    return (
      this.leftExpr.evaluate(variables) && this.rightExpr.evaluate(variables)
    )
  }

  public toString() {
    return (
      '( ' +
      this.leftExpr.toString() +
      ' and ' +
      this.rightExpr.toString() +
      ' )'
    )
  }
}

class Not implements Node {
  constructor(private readonly expr: Node) {}

  public evaluate(variables: string[]) {
    return !this.expr.evaluate(variables)
  }

  public toString() {
    return 'not ( ' + this.expr.toString() + ' )'
  }
}

class True implements Node {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public evaluate(variables: string[]) {
    return true
  }

  public toString() {
    return 'true'
  }
}
