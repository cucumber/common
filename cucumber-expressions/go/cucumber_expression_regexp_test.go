package cucumberexpressions

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestCucumberExpressionRegExpTranslation(t *testing.T) {
	t.Run("translates no arguments", func(t *testing.T) {
		assertRegexp(
			t,
			"I have 10 cukes in my belly now",
			"^I have 10 cukes in my belly now$",
		)
	})

	t.Run("translates alternation", func(t *testing.T) {
		assertRegexp(
			t,
			"I had/have a great/nice/charming friend",
			"^I (?:had|have) a (?:great|nice|charming) friend$",
		)
	})

	t.Run("translates alternation with non-alpha", func(t *testing.T) {
		assertRegexp(
			t,
			"I said Alpha1/Beta1",
			"^I said (?:Alpha1|Beta1)$",
		)
	})
	t.Run("translates alternation with optional words", func(t *testing.T) {
		assertRegexp(
			t,
			"the (test )chat/(test )call/(test )email interactions are visible",
			"^the (?:(?:test )?chat|(?:test )?call|(?:test )?email) interactions are visible$",
		)
	})

	t.Run("translates parameters", func(t *testing.T) {
		assertRegexp(
			t,
			"I have {float} cukes at {int} o'clock",
			`^I have ([-+]?\d*\.?\d+) cukes at ((?:-?\d+)|(?:\d+)) o'clock$`,
		)
	})

	t.Run("translates parenthesis to non-capturing optional capture group", func(t *testing.T) {
		assertRegexp(
			t,
			"I have many big(ish) cukes",
			`^I have many big(?:ish)? cukes$`,
		)
	})

	t.Run("translates parenthesis with alpha unicode", func(t *testing.T) {
		assertRegexp(
			t,
			"Привет, Мир(ы)!",
			`^Привет, Мир(?:ы)?!$`,
		)
	})

}

func assertRegexp(t *testing.T, expression string, expectedRegexp string) {
	parameterTypeRegistry := NewParameterTypeRegistry()
	generator, err := NewCucumberExpression(expression, parameterTypeRegistry)
	require.NoError(t, err)
	require.Equal(t, expectedRegexp, generator.Regexp().String())
}
