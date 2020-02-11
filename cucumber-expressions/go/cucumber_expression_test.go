package cucumberexpressions

import (
	"fmt"
	"github.com/stretchr/testify/require"
	"reflect"
	"testing"
)

func TestCucumberExpression(t *testing.T) {
	t.Run("documents expression generation", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()

		/// [capture-match-arguments]
		expr := "I have {int} cuke(s)"
		expression, err := NewCucumberExpression(expr, parameterTypeRegistry)
		require.NoError(t, err)
		args, err := expression.Match("I have 7 cukes")
		require.NoError(t, err)
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

	t.Run("matches single quoted empty string as empty string", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} mice", `three '' mice`),
			[]interface{}{""},
		)
	})

	t.Run("matches double quoted empty string as empty string", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} mice", `three "" mice`),
			[]interface{}{""},
		)
	})

	t.Run("matches single quoted empty string as empty string along with other strings", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} and {string} mice", `three '' and 'handsome' mice`),
			[]interface{}{"", "handsome"},
		)
	})

	t.Run("matches double quoted empty string as empty string along with other strings", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three {string} and {string} mice", `three "" and "handsome" mice`),
			[]interface{}{"", "handsome"},
		)
	})

	t.Run("matches escaped parenthesis", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "three \\\\(exceptionally) {string} mice", `three (exceptionally) "blind" mice`),
			[]interface{}{"blind"},
		)
	})

	t.Run("matches escaped slash", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "12\\\\/2020", `12/2020`),
			[]interface{}{},
		)
	})

	t.Run("matches int", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "{int}", "22"),
			[]interface{}{22},
		)
	})

	t.Run("doesn't match float as int", func(t *testing.T) {
		require.Nil(
			t,
			MatchCucumberExpression(t, "{int}", "1.22"),
		)
	})

	t.Run("matches float", func(t *testing.T) {
		require.Equal(t, MatchCucumberExpression(t, "{float}", ""), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "."), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", ","), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "-"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "E"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "1,"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", ",1"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "1."), []interface{}(nil))

		require.Equal(t, MatchCucumberExpression(t, "{float}", "1"), []interface{}{1.0})
		require.Equal(t, MatchCucumberExpression(t, "{float}", "-1"), []interface{}{-1.0})
		require.Equal(t, MatchCucumberExpression(t, "{float}", "1.1"), []interface{}{1.1})
		require.Equal(t, MatchCucumberExpression(t, "{float}", "1,000"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "1,000,0"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "1,000.1"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "1,000,10"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "1,0.1"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "1,000,000.1"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "-1.1"), []interface{}{-1.1})

		require.Equal(t, MatchCucumberExpression(t, "{float}", ".1"), []interface{}{0.1})
		require.Equal(t, MatchCucumberExpression(t, "{float}", "-.1"), []interface{}{-0.1})
		require.Equal(t, MatchCucumberExpression(t, "{float}", "-.10000001"), []interface{}{-0.10000001})
		require.Equal(t, MatchCucumberExpression(t, "{float}", "1e1"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", ".1E1"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "E1"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "-.1E-1"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "-.1E-2"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "-.1E+1"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "-.1E+2"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "-.1E1"), []interface{}(nil))
		require.Equal(t, MatchCucumberExpression(t, "{float}", "-.10E2"), []interface{}(nil))
	})

	t.Run("matches float with zero", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "{float}", "0"),
			[]interface{}{0.0},
		)
		require.Equal(
			t,
			MatchCucumberExpression(t, "{float}", "-1"),
			[]interface{}{-1.0},
		)
	})

	t.Run("matches anonymous", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "{}", ".22", reflect.TypeOf(float64(0))),
			[]interface{}{float64(0.22)},
		)
		require.Equal(
			t,
			MatchCucumberExpression(t, "{}", "0.22", reflect.TypeOf(float64(0))),
			[]interface{}{float64(0.22)},
		)
	})

	t.Run("does not allow parameter type with left bracket", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		_, err := NewCucumberExpression("{[string]}", parameterTypeRegistry)
		require.Error(t, err)
		require.Equal(t, err.Error(), "illegal character '[' in parameter name {[string]}")
	})

	t.Run("does not allow optional parameter types", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		_, err := NewCucumberExpression("({int})", parameterTypeRegistry)
		require.Error(t, err)
		require.Equal(t, "Parameter types cannot be optional: ({int})", err.Error())
	})

	t.Run("allows escaped optional parameters", func(t *testing.T) {
		require.Equal(
			t,
			MatchCucumberExpression(t, "\\\\({int})", `(3)`),
			[]interface{}{3},
		)
	})

	t.Run("does not allow text/parameter type alternation", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		_, err := NewCucumberExpression("x/{int}", parameterTypeRegistry)
		require.Error(t, err)
		require.Equal(t, "Parameter types cannot be alternative: x/{int}", err.Error())
	})

	t.Run("does not allow parameter type/text alternation", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		_, err := NewCucumberExpression("{int}/x", parameterTypeRegistry)
		require.Error(t, err)
		require.Equal(t, "Parameter types cannot be alternative: {int}/x", err.Error())
	})

	t.Run("returns UndefinedParameterTypeExpression for unknown parameter", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		_, err := NewCucumberExpression("{unknown}", parameterTypeRegistry)
		require.Error(t, err)
	})

	t.Run("exposes source", func(t *testing.T) {
		expr := "I have {int} cuke(s)"
		parameterTypeRegistry := NewParameterTypeRegistry()
		expression, err := NewCucumberExpression(expr, parameterTypeRegistry)
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
			parameterTypeRegistry := NewParameterTypeRegistry()
			expression, err := NewCucumberExpression(expr, parameterTypeRegistry)
			require.NoError(t, err)
			args, err := expression.Match("I have 800 cukes and 3")
			require.NoError(t, err)
			require.Nil(t, args)
			args, err = expression.Match("I have 800 cukes and .")
			require.NoError(t, err)
			require.NotNil(t, args)
		})

		t.Run("escapes |", func(t *testing.T) {
			expr := "I have {int} cuke(s) and a|b"
			parameterTypeRegistry := NewParameterTypeRegistry()
			expression, err := NewCucumberExpression(expr, parameterTypeRegistry)
			require.NoError(t, err)
			args, err := expression.Match("I have 800 cukes and a")
			require.NoError(t, err)
			require.Nil(t, args)
			args, err = expression.Match("I have 800 cukes and b")
			require.NoError(t, err)
			require.Nil(t, args)
			args, err = expression.Match("I have 800 cukes and a|b")
			require.NoError(t, err)
			require.NotNil(t, args)
		})
	})
}

func MatchCucumberExpression(t *testing.T, expr string, text string, typeHints ...reflect.Type) []interface{} {
	parameterTypeRegistry := NewParameterTypeRegistry()
	expression, err := NewCucumberExpression(expr, parameterTypeRegistry)
	require.NoError(t, err)
	args, err := expression.Match(text, typeHints...)
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
