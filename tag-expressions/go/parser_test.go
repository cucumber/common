package tagexpressions_test

import (
	"testing"

	tagexpressions "github.com/cucumber/cucumber/tag-expressions/go"
)

func TestParse(t *testing.T) {
	t.Run("toString", func(t *testing.T) {
		examples := [][]string{
			{"a and b", "( a and b )"},
			{"a or b", "( a or b )"},
			{"not a", "not ( a )"},
			{"( a and b ) or ( c and d )", "( ( a and b ) or ( c and d ) )"},
			{
				"not a or b and not c or not d or e and f",
				"( ( ( not ( a ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )",
			},
			{
				"not a\\(\\) or b and not c or not d or e and f",
				"( ( ( not ( a\\(\\) ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )",
			},
		}
		for _, example := range examples {
			infix := example[0]
			expected := example[1]
			actual := tagexpressions.Parse(infix).ToString()
			if expected != actual {
				t.Errorf("Expected %s to equal %s", actual, expected)
			}
			roundTripActual := tagexpressions.Parse(actual).ToString()
			if expected != roundTripActual {
				t.Errorf("Expected %s to equal %s", roundTripActual, expected)
			}
		}
	})
}

// /* eslint-env mocha */
// var assert = require('assert')
// var TagExpressionParser = require('../lib/tag_expression_parser')
// var parser = new TagExpressionParser()
//
// describe('TagExpressionParser', function() {
//   describe('#parse', function() {
//     ;[
//       ['a and b', '( a and b )'],
//       ['a or b', '( a or b )'],
//       ['not a', 'not ( a )'],
//       ['( a and b ) or ( c and d )', '( ( a and b ) or ( c and d ) )'],
//       [
//         'not a or b and not c or not d or e and f',
//         '( ( ( not ( a ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )',
//       ],
//       [
//         'not a\\(\\) or b and not c or not d or e and f',
//         '( ( ( not ( a\\(\\) ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )',
//       ],
//       // a or not b
//     ].forEach(function(inOut) {
//       it(inOut[0], function() {
//         var infix = inOut[0]
//         var expr = parser.parse(infix)
//         assert.equal(expr.toString(), inOut[1])
//
//         var roundtripTokens = expr.toString()
//         var roundtripExpr = parser.parse(roundtripTokens)
//         assert.equal(roundtripExpr.toString(), inOut[1])
//       })
//     })
//     ;[
//       ['@a @b or', 'Syntax error. Expected operator'],
//       ['@a and (@b not)', 'Syntax error. Expected operator'],
//       ['@a and (@b @c) or', 'Syntax error. Expected operator'],
//       ['@a and or', 'Syntax error. Expected operand'],
//       ['or or', 'Syntax error. Expected operand'],
//       ['a b', 'Syntax error. Expected operator'],
//       ['( a and b ) )', 'Syntax error. Unmatched )'],
//       ['( ( a and b )', 'Syntax error. Unmatched ('],
//       // a or not b
//     ].forEach(function(inOut) {
//       it(inOut[0] + ' fails', function() {
//         var infix = inOut[0]
//         try {
//           parser.parse(infix)
//           throw new Error('Expected syntax error')
//         } catch (expected) {
//           assert.equal(expected.message, inOut[1])
//         }
//       })
//     })
//
//     // evaluation
//
//     it('evaluates not', function() {
//       var expr = parser.parse('not   x')
//       assert.equal(expr.evaluate(['x']), false)
//       assert.equal(expr.evaluate(['y']), true)
//     })
//
//     it('evaluates and', function() {
//       var expr = parser.parse('x and y')
//       assert.equal(expr.evaluate(['x', 'y']), true)
//       assert.equal(expr.evaluate(['y']), false)
//       assert.equal(expr.evaluate(['x']), false)
//     })
//
//     it('evaluates or', function() {
//       var expr = parser.parse('  x or(y) ')
//       assert.equal(expr.evaluate([]), false)
//       assert.equal(expr.evaluate(['y']), true)
//       assert.equal(expr.evaluate(['x']), true)
//     })
//
//     it('evaluates expressions with escaped chars', function() {
//       var expr = parser.parse('  x\\(1\\) or(y\\(2\\)) ')
//       assert.equal(expr.evaluate([]), false)
//       assert.equal(expr.evaluate(['y(2)']), true)
//       assert.equal(expr.evaluate(['x(1)']), true)
//       assert.equal(expr.evaluate(['y']), false)
//       assert.equal(expr.evaluate(['x']), false)
//     })
//
//     it('evaluates empty expressions to true', function() {
//       var expr = parser.parse('')
//       assert.equal(expr.evaluate([]), true)
//       assert.equal(expr.evaluate(['y']), true)
//       assert.equal(expr.evaluate(['x']), true)
//     })
//   })
// })
