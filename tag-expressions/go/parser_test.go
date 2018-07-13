package tagexpressions

import (
	"testing"
	"github.com/stretchr/testify/require"
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
			// a or not b
		}
		for _, example := range examples {
			infix := example[0]
			expectedStr := example[1]
			actual, err := Parse(infix)
			require.NoError(t, err)
			actualStr := actual.ToString()
			require.Equal(t, expectedStr, actualStr)

			roundTripActual, err := Parse(actualStr)
			require.NoError(t, err)
			roundTripActualStr := roundTripActual.ToString()
			require.Equal(t, expectedStr, roundTripActualStr)
		}
	})

	t.Run("syntax errors", func(t *testing.T) {
		examples := [][]string{
			{"@a @b or", "Syntax error. Expected operator"},
			{"@a and (@b not)", "Syntax error. Expected operator"},
			{"@a and (@b @c) or", "Syntax error. Expected operator"},
			{"@a and or", "Syntax error. Expected operand"},
			{"or or", "Syntax error. Expected operand"},
			{"a b", "Syntax error. Expected operator"},
			{"( a and b ) )", "Syntax error. Unmatched )"},
			{"( ( a and b )", "Syntax error. Unmatched ("},
			// a or not b
		}
		for _, example := range examples {
			infix := example[0]
			expectedErrMessage := example[1]
			_, err := Parse(infix)
			require.Error(t, err)
			require.Equal(t, expectedErrMessage, err.Error())
		}
	})

	t.Run("evalutation errors", func(t *testing.T) {

		t.Run("evaluates not", func(t *testing.T) {
			expr, err := Parse("not   x")
			require.NoError(t, err)
			require.False(t, expr.Evaluate([]string{"x"}))
			require.True(t, expr.Evaluate([]string{"y"}))
		})

		t.Run("evaluates and", func(t *testing.T) {
			expr, err := Parse("x and y")
			require.NoError(t, err)
			require.True(t, expr.Evaluate([]string{"x", "y"}))
			require.False(t, expr.Evaluate([]string{"y"}))
			require.False(t, expr.Evaluate([]string{"x"}))
		})

		t.Run("evaluates or", func(t *testing.T) {
			expr, err := Parse("  x or(y) ")
			require.NoError(t, err)
			require.False(t, expr.Evaluate([]string{}))
			require.True(t, expr.Evaluate([]string{"y"}))
			require.True(t, expr.Evaluate([]string{"x"}))
		})

		t.Run("evaluates expressions with escaped chars", func(t *testing.T) {
			expr, err := Parse("  x\\(1\\) or(y\\(2\\)) ")
			require.NoError(t, err)
			require.False(t, expr.Evaluate([]string{}))
			require.True(t, expr.Evaluate([]string{"y(2)"}))
			require.True(t, expr.Evaluate([]string{"x(1)"}))
			require.False(t, expr.Evaluate([]string{"y"}))
			require.False(t, expr.Evaluate([]string{"x"}))
		})

		t.Run("evaluates empty expressions to true", func(t *testing.T) {
			expr, err := Parse("")
			require.NoError(t, err)
			require.True(t, expr.Evaluate([]string{}))
			require.True(t, expr.Evaluate([]string{"y"}))
			require.True(t, expr.Evaluate([]string{"x"}))
		})
	})
}
