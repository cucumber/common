package cucumberexpressions_test

import (
	"regexp"
	"testing"

	cucumberexpressions "github.com/cucumber/cucumber/cucumber-expressions/go"
	"github.com/stretchr/testify/require"
)

type Currency struct {
	ISO4217 string
}

func TestCucumberExpressionGeneratory(t *testing.T) {
	t.Run("documents expression generation", func(t *testing.T) {
		parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
		require.NoError(t, err)

		/// [generate-expression]
		generator := cucumberexpressions.NewCucumberExpressionGenerator(parameterTypeRegistry)
		undefinedStepText := "I have 2 cucumbers and 1.5 tomato"
		generatedExpression := generator.GenerateExpressions(undefinedStepText)[0]
		require.Equal(t, generatedExpression.Source(), "I have {int} cucumbers and {float} tomato")
		require.Equal(t, generatedExpression.ParameterNames()[0], "int")
		require.Equal(t, generatedExpression.ParameterTypes()[1].Name(), "float")
		/// [generate-expression]
	})

	t.Run("generates expression for no args", func(t *testing.T) {
		assertExpression(t, "hello", []string{}, "hello")
	})

	t.Run("generates expression for int float arg", func(t *testing.T) {
		assertExpression(
			t,
			"I have {int} cukes and {float} euro",
			[]string{"int", "float"},
			"I have 2 cukes and 1.5 euro",
		)
	})

	t.Run("generates expression for strings with % sign", func(t *testing.T) {
		assertExpression(t, "I am {int}%% foobar", []string{"int"}, "I am 20%% foobar")
	})

	t.Run("generates expression for int float arg", func(t *testing.T) {
		assertExpression(
			t,
			"I like {string} and {string}",
			[]string{"string", "string2"},
			`I like "bangers" and 'mash'`,
		)
	})

	t.Run("generates expression for just int", func(t *testing.T) {
		assertExpression(t, "{int}", []string{"int"}, "99999")
	})

	t.Run("numbers only second argument when builtin type is not reserved keyword", func(t *testing.T) {
		assertExpression(
			t,
			"I have {float} cukes and {float} euro",
			[]string{"float", "float2"},
			"I have 2.5 cukes and 1.5 euro",
		)
	})

	t.Run("generates expression for custom type", func(t *testing.T) {
		parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
		require.NoError(t, err)
		currencyParameterType, err := cucumberexpressions.NewParameterType(
			"currency",
			[]*regexp.Regexp{regexp.MustCompile("[A-Z]{3}")},
			"Currency",
			func(arg3 ...string) interface{} {
				return Currency{ISO4217: arg3[0]}
			},
			true,
			false,
		)
		require.NoError(t, err)
		parameterTypeRegistry.DefineParameterType(currencyParameterType)

		assertExpressionWithParameterTypeRegistry(
			t,
			parameterTypeRegistry,
			"I have a {currency} account",
			[]string{"currency"},
			"I have a EUR account",
		)
	})

	t.Run("prefers leftmost match when there is overlap", func(t *testing.T) {
		parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
		require.NoError(t, err)
		parameterType1, err := cucumberexpressions.NewParameterType(
			"type1",
			[]*regexp.Regexp{regexp.MustCompile("cd")},
			"type1",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		parameterTypeRegistry.DefineParameterType(parameterType1)
		parameterType2, err := cucumberexpressions.NewParameterType(
			"type2",
			[]*regexp.Regexp{regexp.MustCompile("bc")},
			"type2",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		parameterTypeRegistry.DefineParameterType(parameterType2)

		assertExpressionWithParameterTypeRegistry(
			t,
			parameterTypeRegistry,
			"a{type2}defg",
			[]string{"type2"},
			"abcdefg",
		)
	})

	// TODO: prefers widest match

	t.Run("generates all combinations of expressions when several parameter types match", func(t *testing.T) {
		parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
		require.NoError(t, err)
		parameterType1, err := cucumberexpressions.NewParameterType(
			"type1",
			[]*regexp.Regexp{regexp.MustCompile("x")},
			"type1",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		parameterTypeRegistry.DefineParameterType(parameterType1)
		parameterType2, err := cucumberexpressions.NewParameterType(
			"type2",
			[]*regexp.Regexp{regexp.MustCompile("x")},
			"type2",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		parameterTypeRegistry.DefineParameterType(parameterType2)
		generator := cucumberexpressions.NewCucumberExpressionGenerator(parameterTypeRegistry)
		generatedExpressions := generator.GenerateExpressions("I have x and x and another x")
		sources := make([]string, len(generatedExpressions))
		for i, generatedExpression := range generatedExpressions {
			sources[i] = generatedExpression.Source()
		}
		require.Equal(t, sources, []string{
			"I have {type1} and {type1} and another {type1}",
			"I have {type1} and {type1} and another {type2}",
			"I have {type1} and {type2} and another {type1}",
			"I have {type1} and {type2} and another {type2}",
			"I have {type2} and {type1} and another {type1}",
			"I have {type2} and {type1} and another {type2}",
			"I have {type2} and {type2} and another {type1}",
			"I have {type2} and {type2} and another {type2}",
		})
	})

	t.Run("exposes parameter type names in generated expression", func(t *testing.T) {
		parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
		require.NoError(t, err)
		generator := cucumberexpressions.NewCucumberExpressionGenerator(parameterTypeRegistry)
		generatedExpression := generator.GenerateExpressions("I have 2 cukes and 1.5 euro")[0]
		typeNames := make([]string, len(generatedExpression.ParameterTypes()))
		for i, parameterType := range generatedExpression.ParameterTypes() {
			typeNames[i] = parameterType.Name()
		}
		require.Equal(t, typeNames, []string{"int", "float"})
	})

	t.Run("ignores parameter types with optional capture groups", func(t *testing.T) {
		parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
		require.NoError(t, err)
		optionalFlightParameterType, err := cucumberexpressions.NewParameterType(
			"optional-flight",
			[]*regexp.Regexp{regexp.MustCompile("(1st flight)?")},
			"optional-flight",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		parameterTypeRegistry.DefineParameterType(optionalFlightParameterType)
		optionalHotelParameterType, err := cucumberexpressions.NewParameterType(
			"optional-hotel",
			[]*regexp.Regexp{regexp.MustCompile("(1st hotel)?")},
			"optional-hotel",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		parameterTypeRegistry.DefineParameterType(optionalHotelParameterType)
		generator := cucumberexpressions.NewCucumberExpressionGenerator(parameterTypeRegistry)
		generatedExpression := generator.GenerateExpressions("I reach Stage4: 1st flight-1st hotel")[0]
		require.Equal(t, generatedExpression.Source(), "I reach Stage{int}: {int}st flight{int}st hotel")
	})
}

func assertExpression(t *testing.T, expectedExpression string, expectedArgumentNames []string, text string) {
	parameterTypeRegistry, err := cucumberexpressions.NewParameterTypeRegistry()
	require.NoError(t, err)
	assertExpressionWithParameterTypeRegistry(t, parameterTypeRegistry, expectedExpression, expectedArgumentNames, text)
}

func assertExpressionWithParameterTypeRegistry(t *testing.T, parameterTypeRegistry *cucumberexpressions.ParameterTypeRegistry, expectedExpression string, expectedArgumentNames []string, text string) {
	generator := cucumberexpressions.NewCucumberExpressionGenerator(parameterTypeRegistry)
	generatedExpressions := generator.GenerateExpressions(text)
	require.Len(t, generatedExpressions, 1)
	generatedExpression := generatedExpressions[0]
	require.Equal(t, generatedExpression.ParameterNames(), expectedArgumentNames)
	require.Equal(t, generatedExpression.Source(), expectedExpression)
}
