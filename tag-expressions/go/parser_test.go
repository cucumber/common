package tagexpressions

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestParseForValidCases(t *testing.T) {
	cases := []struct {
		name     string
		given    string
		expected string
	}{
		{
			name:     "test and",
			given:    "a and b",
			expected: "( a and b )",
		},
		{
			name:     "test or",
			given:    "a or b",
			expected: "( a or b )",
		},
		{
			name:     "test unary not",
			given:    "not a",
			expected: "not ( a )",
		},
		{
			name:     "test and & or",
			given:    "( a and b ) or ( c and d )",
			expected: "( ( a and b ) or ( c and d ) )",
		},
		{
			name:     "test and, or, not",
			given:    "not a or b and not c or not d or e and f",
			expected: "( ( ( not ( a ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )",
		},
		{
			name:     "test escaping",
			given:    "not a\\(\\) or b and not c or not d or e and f",
			expected: "( ( ( not ( a\\(\\) ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )",
		},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			actual, err := Parse(tc.given)
			require.NoError(t, err)

			actualStr := actual.ToString()
			require.Equal(t, tc.expected, actualStr)

			roundTripActual, err := Parse(actualStr)
			require.NoError(t, err)

			roundTripActualStr := roundTripActual.ToString()
			require.Equal(t, tc.expected, roundTripActualStr)
		})
	}
}

func TestParseForSyntaxErrors(t *testing.T) {
	cases := []struct {
		name     string
		given    string
		expected string
	}{
		{
			name:     "no operators",
			given:    "a b",
			expected: "Syntax error. Expected operator",
		},
		{
			name:     "missing operator in binary expression",
			given:    "@a @b or",
			expected: "Syntax error. Expected operator",
		},
		{
			name:     "missing operator in unary expression",
			given:    "@a and (@b not)",
			expected: "Syntax error. Expected operator",
		},
		{
			name:     "missing operator between operands",
			given:    "@a and (@b @c) or",
			expected: "Syntax error. Expected operator",
		},
		{
			name:     "no operands",
			given:    "or or",
			expected: "Syntax error. Expected operand",
		},
		{
			name:     "missing operand",
			given:    "@a and or",
			expected: "Syntax error. Expected operand",
		},
		{
			name:     "unmatched closing parenthesis",
			given:    "( a and b ) )",
			expected: "Syntax error. Unmatched )",
		},
		{
			name:     "unmatched opening parenthesis",
			given:    "( ( a and b )",
			expected: "Syntax error. Unmatched (",
		},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			_, err := Parse(tc.given)
			require.Error(t, err)
			require.Equal(t, tc.expected, err.Error())
		})
	}
}

func TestParseForEvaluationErrors(t *testing.T) {
	cases := []struct {
		name         string
		given        string
		expectations func(*testing.T, Evaluatable)
	}{
		{
			name:  "evaluate not",
			given: "not   x",
			expectations: func(t *testing.T, expr Evaluatable) {
				require.False(t, expr.Evaluate([]string{"x"}))
				require.True(t, expr.Evaluate([]string{"y"}))
			},
		},
		{
			name:  "evaluate and",
			given: "x and y",
			expectations: func(t *testing.T, expr Evaluatable) {
				require.True(t, expr.Evaluate([]string{"x", "y"}))
				require.False(t, expr.Evaluate([]string{"y"}))
				require.False(t, expr.Evaluate([]string{"x"}))
			},
		},
		{
			name:  "evaluate or",
			given: "  x or(y) ",
			expectations: func(t *testing.T, expr Evaluatable) {
				require.False(t, expr.Evaluate([]string{}))
				require.True(t, expr.Evaluate([]string{"y"}))
				require.True(t, expr.Evaluate([]string{"x"}))
			},
		},
		{
			name:  "evaluate expressions with escaped chars",
			given: "  x\\(1\\) or(y\\(2\\)) ",
			expectations: func(t *testing.T, expr Evaluatable) {
				require.False(t, expr.Evaluate([]string{}))
				require.True(t, expr.Evaluate([]string{"y(2)"}))
				require.True(t, expr.Evaluate([]string{"x(1)"}))
				require.False(t, expr.Evaluate([]string{"y"}))
				require.False(t, expr.Evaluate([]string{"x"}))
			},
		},
		{
			name:  "evaluate empty expressions to true",
			given: "",
			expectations: func(t *testing.T, expr Evaluatable) {
				require.True(t, expr.Evaluate([]string{}))
				require.True(t, expr.Evaluate([]string{"y"}))
				require.True(t, expr.Evaluate([]string{"x"}))
			},
		},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			expr, err := Parse(tc.given)
			require.NoError(t, err)
			tc.expectations(t, expr)
		})
	}
}
