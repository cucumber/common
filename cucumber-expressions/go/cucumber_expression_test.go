package cucumberexpressions_test

import (
	"fmt"
	"testing"

	cucumberexpressions "."
	"github.com/stretchr/testify/require"
)

func TestCucumberExpression(t *testing.T) {
	t.Run("documents expression generation", func(t *testing.T) {
		parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
		require.NoError(t, err)

		/// [capture-match-arguments]
		expr := "I have {int} cuke(s)"
		expression, err := cucumberexpressions.NewCucumberExpression(expr, parameterTypeRegistry)
		require.NoError(t, err)
		args := expression.Match("I have 7 cukes")
		require.Equal(t, args[0].GetValue(), 7)
		/// [capture-match-arguments]
	})

	t.Run("matches word", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {word} mice", "three blind mice"),
			[]interface{}{"blind"},
		)
	})

	t.Run("matches double quoted string", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} mice", `three "blind" mice`),
			[]interface{}{"blind"},
		)
	})

	t.Run("matches multiple double quoted strings", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} and {string} mice", `three "blind" and "crippled" mice`),
			[]interface{}{"blind", "crippled"},
		)
	})

	t.Run("matches single quoted string", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} mice", `three 'blind' mice`),
			[]interface{}{"blind"},
		)
	})

	t.Run("matches multiple single quoted strings", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} and {string} mice", `three 'blind' and 'crippled' mice`),
			[]interface{}{"blind", "crippled"},
		)
	})

	t.Run("does not match misquoted string", func(t *testing.T) {
		require.Nil(
			t,
			MatchCucumberExpression(t, "three {string} mice", `three "blind' mice`),
		)
	})

	t.Run("matches single quoted strings with double quotes", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} mice", `three '"blind"' mice`),
			[]interface{}{`"blind"`},
		)
	})

	t.Run("matches double quoted strings with single quotes", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} mice", `three "'blind'" mice`),
			[]interface{}{`'blind'`},
		)
	})

	t.Run("matches double quoted string with escaped double quote", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} mice", `three "bl\"nd" mice`),
			[]interface{}{`bl\"nd`},
		)
	})

	t.Run("matches single quoted string with escaped single quote", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} mice", `three 'bl\'nd' mice`),
			[]interface{}{`bl\'nd`},
		)
	})

	t.Run("matches escaped parenthesis", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three \\\\(exceptionally) {string} mice", `three (exceptionally) "blind" mice`),
			[]interface{}{"blind"},
		)
	})

	t.Run("doesn't match float as int", func(t *testing.T) {
		require.Nil(
			t,
			MatchCucumberExpression(t, "{int}", "1.22"),
		)
	})

	t.Run("matches float", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "{float}", "0.22"),
			[]interface{}{0.22},
		)
		require.Equal(
			t,
			MatchCucumberExpression(t, "{float}", ".22"),
			[]interface{}{0.22},
		)
	})

	t.Run("returns error for unknown parameter float", func(t *testing.T) {
		parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
		require.NoError(t, err)
		_, err = cucumberexpressions.NewCucumberExpression("{unknown}", parameterTypeRegistry)
		require.Error(t, err)
		require.Equal(t, err.Error(), "Undefined parameter type {unknown}")
	})

	t.Run("exposes source", func(t *testing.T) {
		expr := "I have {int} cuke(s)"
		parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
		require.NoError(t, err)
		expression, err := cucumberexpressions.NewCucumberExpression(expr, parameterTypeRegistry)
		require.NoError(t, err)
		require.Equal(t, expression.Source(), expr)
	})

	t.Run("escapes special characters", func(t *testing.T) {
		for _, char := range []string{"\\", "[", "]", "^", "$", ".", "|", "?", "*", "+"} {
			t.Run(fmt.Sprintf("escapes %s", char), func(t *testing.T) {
				require.Equal(
					t,
					MatchCucumberExpression(
						t,
						fmt.Sprintf("I have {int} cuke(s) and %s", char),
						fmt.Sprintf("I have 800 cukes and %s", char),
					),
					[]interface{}{800},
				)
			})
		}

		t.Run("escapes .", func(t *testing.T) {
			expr := "I have {int} cuke(s) and ."
			parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
			require.NoError(t, err)
			expression, err := cucumberexpressions.NewCucumberExpression(expr, parameterTypeRegistry)
			require.NoError(t, err)
			require.Nil(t, expression.Match("I have 800 cukes and 3"))
			require.NotNil(t, expression.Match("I have 800 cukes and ."))
		})

		t.Run("escapes |", func(t *testing.T) {
			expr := "I have {int} cuke(s) and a|b"
			parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
			require.NoError(t, err)
			expression, err := cucumberexpressions.NewCucumberExpression(expr, parameterTypeRegistry)
			require.NoError(t, err)
			require.Nil(t, expression.Match("I have 800 cukes and a"))
			require.Nil(t, expression.Match("I have 800 cukes and b"))
			require.NotNil(t, expression.Match("I have 800 cukes and a|b"))
		})
	})
}

func MatchCucumberExpression(t *testing.T, expr string, text string) []interface{} {
	parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
	require.NoError(t, err)
	expression, err := cucumberexpressions.NewCucumberExpression(expr, parameterTypeRegistry)
	require.NoError(t, err)
	args := expression.Match(text)
	require.NoError(t, err)
	if args == nil {
		return nil
	}
	result := make([]interface{}, len(args))
	for i, arg := range args {
		result[i] = arg.GetValue()
	}
	return result
}
