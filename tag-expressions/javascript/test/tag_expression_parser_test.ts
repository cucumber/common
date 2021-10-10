import assert from 'assert'
import parse from '../src'

describe('TagExpressionParser', () => {
  describe('#parse', () => {
    const tests = [
      ['', 'true'],
      ['a and b', '( a and b )'],
      ['a or b', '( a or b )'],
      ['not a', 'not ( a )'],
      ['( a and b ) or ( c and d )', '( ( a and b ) or ( c and d ) )'],
      [
        'not a or b and not c or not d or e and f',
        '( ( ( not ( a ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )',
      ],
      [
        'not a\\(\\) or b and not c or not d or e and f',
        '( ( ( not ( a\\(\\) ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )',
      ],
      ['a\\\\ and b', '( a\\\\ and b )'],
      ['\\a and b', '( a and b )'],
      ['a\\ and b', '( a and b )'],
      ['a and b\\', '( a and b )'],
      ['( a and b\\\\)', '( a and b\\\\ )'],
      ['a\\\\\\( and b\\\\\\)', '( a\\\\\\( and b\\\\\\) )'],
      ['(a and \\b)', '( a and b )'],
      // a or not b
    ]
    tests.forEach(function (inOut) {
      it(inOut[0], function () {
        const infix = inOut[0]
        const expr = parse(infix)
        assert.strictEqual(expr.toString(), inOut[1])

        const roundtripTokens = expr.toString()
        const roundtripExpr = parse(roundtripTokens)
        assert.strictEqual(roundtripExpr.toString(), inOut[1])
      })
    })
    ;[
      ['@a @b or', 'Syntax error. Expected operator'],
      ['@a and (@b not)', 'Syntax error. Expected operator'],
      ['@a and (@b @c) or', 'Syntax error. Expected operator'],
      ['@a and or', 'Syntax error. Expected operand'],
      ['or or', 'Syntax error. Expected operand'],
      ['a b', 'Syntax error. Expected operator'],
      ['( a and b ) )', 'Syntax error. Unmatched )'],
      ['( ( a and b )', 'Syntax error. Unmatched ('],
      // a or not b
    ].forEach(function (inOut) {
      it(inOut[0] + ' fails', function () {
        const infix = inOut[0]
        try {
          parse(infix)
          throw new Error('Expected syntax error')
        } catch (expected) {
          assert.strictEqual(expected.message, inOut[1])
        }
      })
    })

    // evaluation

    it('evaluates not', function () {
      const expr = parse('not   x')
      assert.strictEqual(expr.evaluate(['x']), false)
      assert.strictEqual(expr.evaluate(['y']), true)
    })

    it('evaluates and', function () {
      const expr = parse('x and y')
      assert.strictEqual(expr.evaluate(['x', 'y']), true)
      assert.strictEqual(expr.evaluate(['y']), false)
      assert.strictEqual(expr.evaluate(['x']), false)
    })

    it('evaluates or', function () {
      const expr = parse('  x or(y) ')
      assert.strictEqual(expr.evaluate([]), false)
      assert.strictEqual(expr.evaluate(['y']), true)
      assert.strictEqual(expr.evaluate(['x']), true)
    })

    it('evaluates expressions with escaped chars', function () {
      const expr = parse('  x\\(1\\) or(y\\(2\\)) ')
      assert.strictEqual(expr.evaluate([]), false)
      assert.strictEqual(expr.evaluate(['y(2)']), true)
      assert.strictEqual(expr.evaluate(['x(1)']), true)
      assert.strictEqual(expr.evaluate(['y']), false)
      assert.strictEqual(expr.evaluate(['x']), false)
    })

    it('evaluates empty expressions to true', function () {
      const expr = parse('')
      assert.strictEqual(expr.evaluate([]), true)
      assert.strictEqual(expr.evaluate(['y']), true)
      assert.strictEqual(expr.evaluate(['x']), true)
    })

    it('evaluates expressions with escaped backslash', function () {
      const expr = parse('x\\\\ or(y\\\\\\)) or(z\\\\)')
      assert.strictEqual(expr.evaluate([]), false)
      assert.strictEqual(expr.evaluate(['x\\']), true)
      assert.strictEqual(expr.evaluate(['y\\)']), true)
      assert.strictEqual(expr.evaluate(['z\\']), true)
      assert.strictEqual(expr.evaluate(['x']), false)
      assert.strictEqual(expr.evaluate(['y)']), false)
      assert.strictEqual(expr.evaluate(['z']), false)
    })

    it('evaluates expressions with backslash', function () {
      const expr = parse('\\x or y\\ or z\\')
      assert.strictEqual(expr.evaluate([]), false)
      assert.strictEqual(expr.evaluate(['x']), true)
      assert.strictEqual(expr.evaluate(['y']), true)
      assert.strictEqual(expr.evaluate(['z']), true)
      assert.strictEqual(expr.evaluate(['\\x']), false)
      assert.strictEqual(expr.evaluate(['y\\']), false)
      assert.strictEqual(expr.evaluate(['z\\']), false)
    })
  })
})
