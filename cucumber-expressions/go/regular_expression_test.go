package cucumberexpressions_test

import (
	"regexp"
	"testing"

	cucumberexpressions "."
	"github.com/stretchr/testify/require"
)

func TestRegularExpression(t *testing.T) {
	t.Run("documents match arguments", func(t *testing.T) {
		parameterTypeRegistry := cucumberexpressions.NewParameterTypeRegistry()

		/// [capture-match-arguments]
		expr := regexp.MustCompile(`I have (\d+) cukes? in my (\w+) now`)
		expression := cucumberexpressions.NewRegularExpression(expr, parameterTypeRegistry)
		args, err := expression.Match("I have 7 cukes in my belly now")
		require.NoError(t, err)
		require.Equal(t, args[0].GetValue(), 7)
		require.Equal(t, args[1].GetValue(), "belly")
		/// [capture-match-arguments]
	})

	t.Run("does no transform by default", func(t *testing.T) {
		require.Equal(t, Match(t, `(\d\d)`, "22")[0], "22")
	})

	t.Run("transforms negative int", func(t *testing.T) {
		require.Equal(t, Match(t, `(-?\d+)`, "-22")[0], -22)
	})

	t.Run("transforms positive int", func(t *testing.T) {
		require.Equal(t, Match(t, `(-?\d+)`, "22")[0], 22)
	})

	t.Run("transforms float without integer part", func(t *testing.T) {
		require.Equal(t, Match(t, `(-?\d*\.\d+)`, ".22")[0], 0.22)
	})

	t.Run("transforms float with sign", func(t *testing.T) {
		require.Equal(t, Match(t, `(-?\d*\.\d+)`, "-1.22")[0], -1.22)
	})

	t.Run("returns nil when there is no match", func(t *testing.T) {
		require.Nil(t, Match(t, "hello", "world"))
	})

	t.Run("ignores non capturing groups", func(t *testing.T) {
		require.Equal(
			t,
			Match(
				t,
				`(\S+) ?(can|cannot)? (?:delete|cancel) the (\d+)(?:st|nd|rd|th) (attachment|slide) ?(?:upload)?`,
				"I can cancel the 1st slide upload",
			),
			[]interface{}{"I", "can", 1, "slide"},
		)
	})

	t.Run("works with escaped parenthesis", func(t *testing.T) {
		require.Equal(
			t,
			Match(t, `Across the line\(s\)`, "Across the line(s)"),
			[]interface{}{},
		)
	})

	t.Run("exposes regexp and source", func(t *testing.T) {
		parameterTypeRegistry := cucumberexpressions.NewParameterTypeRegistry()
		expr := regexp.MustCompile(`I have (\d+) cukes? in my (\w+) now`)
		expression := cucumberexpressions.NewRegularExpression(expr, parameterTypeRegistry)
		require.Equal(t, expression.Regexp(), expr)
		require.Equal(t, expression.Source(), expr.String())
	})

}

func Match(t *testing.T, expr, text string) []interface{} {
	parameterTypeRegistry := cucumberexpressions.NewParameterTypeRegistry()
	expression := cucumberexpressions.NewRegularExpression(regexp.MustCompile(expr), parameterTypeRegistry)
	args, err := expression.Match(text)
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
