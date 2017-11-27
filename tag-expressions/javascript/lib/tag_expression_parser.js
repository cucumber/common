const OPERAND = 'operand'
const OPERATOR = 'operator'

module.exports = function TagExpressionParser() {
  /**
   * Parses infix boolean expression (using Dijkstra's Shunting Yard algorithm)
   * and builds a tree of expressions. The root node of the expression is returned.
   *
   * This expression can be evaluated by passing in an array of literals that resolve to true
   */
  this.parse = function(infix) {
    var tokens = tokenize(infix)
    if (tokens.length === 0) return new True()
    var expressions = []
    var operators = []
    var expectedTokenType = OPERAND

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

  var ASSOC = {
    or: 'left',
    and: 'left',
    not: 'right',
  }

  var PREC = {
    '(': -2,
    ')': -1,
    or: 0,
    and: 1,
    not: 2,
  }

  function tokenize(expr) {
    var tokens = []
    var isEscaped = false
    var token = undefined
    for (var i = 0; i < expr.length; i++) {
      var c = expr.charAt(i)
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
          switch (c) {
            case '(':
            case ')':
              if (!isEscaped) {
                if (token) {
                  // end of token
                  tokens.push(token.join(''))
                  token = undefined
                }
                tokens.push(c)
                break
              }
            default:
              token = token ? token : [] // start of token
              token.push(c)
              break
          }
        }
        isEscaped = false
      }
    }
    if (token) {
      tokens.push(token.join(''))
    }
    return tokens
  }

  function isUnary(token) {
    return 'not' === token
  }

  function isBinary(token) {
    return 'or' === token || 'and' === token
  }

  function isOp(token) {
    return ASSOC[token] !== undefined
  }

  function check(expectedTokenType, tokenType) {
    if (expectedTokenType !== tokenType) {
      throw new Error('Syntax error. Expected ' + expectedTokenType)
    }
  }

  function peek(stack) {
    return stack[stack.length - 1]
  }

  function pop(stack) {
    if (stack.length === 0) throw new Error('empty stack')
    return stack.pop()
  }

  function pushExpr(token, stack) {
    if (token === 'and') {
      var rightAndExpr = pop(stack)
      stack.push(new And(pop(stack), rightAndExpr))
    } else if (token === 'or') {
      var rightOrExpr = pop(stack)
      stack.push(new Or(pop(stack), rightOrExpr))
    } else if (token === 'not') {
      stack.push(new Not(pop(stack)))
    } else {
      stack.push(new Literal(token))
    }
  }

  function Literal(value) {
    this.evaluate = function(variables) {
      return variables.indexOf(value) !== -1
    }

    this.toString = function() {
      return value.replace(/\(/g, '\\(').replace(/\)/g, '\\)')
    }
  }

  function Or(leftExpr, rightExpr) {
    this.evaluate = function(variables) {
      return leftExpr.evaluate(variables) || rightExpr.evaluate(variables)
    }

    this.toString = function() {
      return '( ' + leftExpr.toString() + ' or ' + rightExpr.toString() + ' )'
    }
  }

  function And(leftExpr, rightExpr) {
    this.evaluate = function(variables) {
      return leftExpr.evaluate(variables) && rightExpr.evaluate(variables)
    }

    this.toString = function() {
      return '( ' + leftExpr.toString() + ' and ' + rightExpr.toString() + ' )'
    }
  }

  function Not(expr) {
    this.evaluate = function(variables) {
      return !expr.evaluate(variables)
    }

    this.toString = function() {
      return 'not ( ' + expr.toString() + ' )'
    }
  }

  function True() {
    this.evaluate = function() {
      return true
    }

    this.toString = function() {
      return 'true'
    }
  }
}
