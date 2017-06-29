module.exports = function TagExpressionParser() {
  /**
   * Parses infix boolean expression (using Dijkstra's Shunting Yard algorithm)
   * and builds a tree of expressions. The root node of the expression is returned.
   *
   * This expression can be evaluated by passing in an array of literals that resolve to true
   */
  this.parse = function(infix) {
    var tokens = infix
      .replace(/\(/g, ' ( ')
      .replace(/\)/g, ' ) ')
      .trim()
      .split(/\s+/)
    var exprs = []
    var ops = []

    tokens.forEach(function(token) {
      if (isOp(token)) {
        while (
          ops.length > 0 &&
          isOp(peek(ops)) &&
          ((ASSOC[token] === 'left' && PREC[token] <= PREC[peek(ops)]) ||
            (ASSOC[token] === 'right' && PREC[token] < PREC[peek(ops)]))
        ) {
          pushExpr(pop(ops), exprs)
        }
        ops.push(token)
      } else if ('(' === token) {
        ops.push(token)
      } else if (')' === token) {
        while (ops.length > 0 && peek(ops) !== '(') {
          pushExpr(pop(ops), exprs)
        }
        if (ops.length === 0) {
          throw Error('Unclosed (')
        }
        if (peek(ops) === '(') {
          pop(ops)
        }
      } else {
        pushExpr(token, exprs)
      }
    })

    while (ops.length > 0) {
      if (peek(ops) === '(') {
        throw Error('Unclosed (')
      }
      pushExpr(pop(ops), exprs)
    }

    var expr = pop(exprs)
    if (exprs.length > 0) {
      throw new Error('Not empty')
    }
    return expr
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

  function isOp(token) {
    return ASSOC[token] !== undefined
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
      return value
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
}
