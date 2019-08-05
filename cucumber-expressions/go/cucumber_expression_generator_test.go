package cucumberexpressions

import (
	"regexp"
	"testing"

	"github.com/stretchr/testify/require"
)

type Currency struct {
	ISO4217 string
}

func TestCucumberExpressionGeneratory(t *testing.T) {
	t.Run("documents expression generation", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()

		/// [generate-expression]
		generator := NewCucumberExpressionGenerator(parameterTypeRegistry)
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

	t.Run("generates expression with escaped left parenthesis", func(t *testing.T) {
		assertExpression(t, `\(iii)`, []string{}, "(iii)")
	})

	t.Run("generates expression with escaped left curly brace", func(t *testing.T) {
		assertExpression(t, `\{iii}`, []string{}, "{iii}")
	})

	t.Run("generates expression with escaped slashes", func(t *testing.T) {
		assertExpression(
			t,
			`The {int}\/{int}\/{int} hey`,
			[]string{"int", "int2", "int3"},
			"The 1814/05/17 hey",
		)
	})

	t.Run("generates expression for int float arg", func(t *testing.T) {
		assertExpression(
			t,
			"I have {int} cukes and {float} euro",
			[]string{"int", "float"},
			"I have 2 cukes and 1.5 euro",
		)
	})

	t.Run("generates expression for strings", func(t *testing.T) {
		assertExpression(
			t,
			"I like {string} and {string}",
			[]string{"string", "string2"},
			`I like "bangers" and 'mash'`,
		)
	})

	t.Run("generates expression with % sign", func(t *testing.T) {
		assertExpression(t, "I am {int}%% foobar", []string{"int"}, "I am 20%% foobar")
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
		parameterTypeRegistry := NewParameterTypeRegistry()
		currencyParameterType, err := NewParameterType(
			"currency",
			[]*regexp.Regexp{regexp.MustCompile("[A-Z]{3}")},
			"Currency",
			func(arg3 ...*string) interface{} {
				return Currency{ISO4217: *arg3[0]}
			},
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(currencyParameterType))

		assertExpressionWithParameterTypeRegistry(
			t,
			parameterTypeRegistry,
			"I have a {currency} account",
			[]string{"currency"},
			"I have a EUR account",
		)
	})

	t.Run("prefers leftmost match when there is overlap", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		parameterType1, err := NewParameterType(
			"type1",
			[]*regexp.Regexp{regexp.MustCompile("c d")},
			"type1",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(parameterType1))
		parameterType2, err := NewParameterType(
			"type2",
			[]*regexp.Regexp{regexp.MustCompile("b c")},
			"type2",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(parameterType2))

		assertExpressionWithParameterTypeRegistry(
			t,
			parameterTypeRegistry,
			"a {type2} d e f g",
			[]string{"type2"},
			"a b c d e f g",
		)
	})

	// TODO: prefers widest match

	t.Run("generates all combinations of expressions when several parameter types match", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		parameterType1, err := NewParameterType(
			"type1",
			[]*regexp.Regexp{regexp.MustCompile("x")},
			"type1",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(parameterType1))
		parameterType2, err := NewParameterType(
			"type2",
			[]*regexp.Regexp{regexp.MustCompile("x")},
			"type2",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(parameterType2))
		generator := NewCucumberExpressionGenerator(parameterTypeRegistry)
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
		parameterTypeRegistry := NewParameterTypeRegistry()
		generator := NewCucumberExpressionGenerator(parameterTypeRegistry)
		generatedExpression := generator.GenerateExpressions("I have 2 cukes and 1.5 euro")[0]
		typeNames := make([]string, len(generatedExpression.ParameterTypes()))
		for i, parameterType := range generatedExpression.ParameterTypes() {
			typeNames[i] = parameterType.Name()
		}
		require.Equal(t, typeNames, []string{"int", "float"})
	})

	t.Run("matches parameter types with optional capture groups", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		optionalFlightParameterType, err := NewParameterType(
			"optional-flight",
			[]*regexp.Regexp{regexp.MustCompile("(1st flight)?")},
			"optional-flight",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(optionalFlightParameterType))
		optionalHotelParameterType, err := NewParameterType(
			"optional-hotel",
			[]*regexp.Regexp{regexp.MustCompile("(1 hotel)?")},
			"optional-hotel",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(optionalHotelParameterType))
		generator := NewCucumberExpressionGenerator(parameterTypeRegistry)
		generatedExpression := generator.GenerateExpressions("I reach Stage 4: 1st flight -1 hotel")[0]
		// While you would expect this to be `I reach Stage {int}: {optional-flight} -{optional-hotel}`
		// the `-1` causes {int} to match just before {optional-hotel}.
		require.Equal(t, generatedExpression.Source(), "I reach Stage {int}: {optional-flight} {int} hotel")
	})

	t.Run("generates at most 256 expressions", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		for i := 1; i <= 4; i++ {
			myType, err := NewParameterType(
				"my-type-"+string(i),
				[]*regexp.Regexp{regexp.MustCompile("([a-z] )*?[a-z]")},
				"string",
				nil,
				true,
				false,
				false,
			)
			require.NoError(t, err)
			require.NoError(t, parameterTypeRegistry.DefineParameterType(myType))
		}

		generator := NewCucumberExpressionGenerator(parameterTypeRegistry)
		// This would otherwise generate 4^11=419430 expressions and consume just shy of 1.5GB.
		generatedExpressions := generator.GenerateExpressions("a s i m p l e s t e p")
		require.Equal(t, len(generatedExpressions), 256)
	})

	t.Run("prefers expression with longest non empty match", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		zeroOrMore, err := NewParameterType(
			"zero-or-more",
			[]*regexp.Regexp{regexp.MustCompile("[a-z]*")},
			"string",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(zeroOrMore))
		exactlyOne, err := NewParameterType(
			"exactly-one",
			[]*regexp.Regexp{regexp.MustCompile("[a-z]")},
			"string",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(exactlyOne))
		generator := NewCucumberExpressionGenerator(parameterTypeRegistry)

		generatedExpressions := generator.GenerateExpressions("a simple step")
		require.Equal(t, len(generatedExpressions), 2)
		require.Equal(t, generatedExpressions[0].Source(), "{exactly-one} {zero-or-more} {zero-or-more}")
		require.Equal(t, generatedExpressions[1].Source(), "{zero-or-more} {zero-or-more} {zero-or-more}")
	})

	t.Run("does not suggest parameter when match is at the beginning of a word", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		direction, err := NewParameterType(
			"direction",
			[]*regexp.Regexp{regexp.MustCompile("(up|down)")},
			"string",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(direction))

		generator := NewCucumberExpressionGenerator(parameterTypeRegistry)
		generatedExpressions := generator.GenerateExpressions("I download a picture")

		require.Equal(t, len(generatedExpressions), 1)
		require.Equal(t, generatedExpressions[0].Source(), "I download a picture")
	})

	t.Run("does not suggest parameter when match is inside a word", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		direction, err := NewParameterType(
			"direction",
			[]*regexp.Regexp{regexp.MustCompile("(up|down)")},
			"string",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(direction))

		generator := NewCucumberExpressionGenerator(parameterTypeRegistry)
		generatedExpressions := generator.GenerateExpressions("I watch the muppet show")

		require.Equal(t, len(generatedExpressions), 1)
		require.Equal(t, generatedExpressions[0].Source(), "I watch the muppet show")
	})

	t.Run("does not suggest parameter when match is at the end of a word", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		direction, err := NewParameterType(
			"direction",
			[]*regexp.Regexp{regexp.MustCompile("(up|down)")},
			"string",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(direction))

		generator := NewCucumberExpressionGenerator(parameterTypeRegistry)
		generatedExpressions := generator.GenerateExpressions("I create a group")

		require.Equal(t, len(generatedExpressions), 1)
		require.Equal(t, generatedExpressions[0].Source(), "I create a group")
	})

	t.Run("does suggest parameter when match is a full word", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		direction, err := NewParameterType(
			"direction",
			[]*regexp.Regexp{regexp.MustCompile("(up|down)")},
			"string",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(direction))

		generator := NewCucumberExpressionGenerator(parameterTypeRegistry)

		generatedExpressions1 := generator.GenerateExpressions("I go down the road")
		require.Equal(t, len(generatedExpressions1), 1)
		require.Equal(t, generatedExpressions1[0].Source(), "I go {direction} the road")

		generatedExpressions2 := generator.GenerateExpressions("up the hill, the road goes down")
		require.Equal(t, len(generatedExpressions2), 1)
		require.Equal(t, generatedExpressions2[0].Source(), "{direction} the hill, the road goes {direction}")
	})

	t.Run("does suggest parameter when match is wrapped around punctuation characters", func(t *testing.T) {
		parameterTypeRegistry := NewParameterTypeRegistry()
		direction, err := NewParameterType(
			"direction",
			[]*regexp.Regexp{regexp.MustCompile("(up|down)")},
			"string",
			nil,
			true,
			false,
			false,
		)
		require.NoError(t, err)
		require.NoError(t, parameterTypeRegistry.DefineParameterType(direction))

		generator := NewCucumberExpressionGenerator(parameterTypeRegistry)

		generatedExpressions1 := generator.GenerateExpressions("direction is:down")
		require.Equal(t, len(generatedExpressions1), 1)
		require.Equal(t, generatedExpressions1[0].Source(), "direction is:{direction}")

		generatedExpressions2 := generator.GenerateExpressions("direction is down.")
		require.Equal(t, len(generatedExpressions2), 1)
		require.Equal(t, generatedExpressions2[0].Source(), "direction is {direction}.")
	})
}

func assertExpression(t *testing.T, expectedExpression string, expectedArgumentNames []string, text string) {
	parameterTypeRegistry := NewParameterTypeRegistry()
	assertExpressionWithParameterTypeRegistry(t, parameterTypeRegistry, expectedExpression, expectedArgumentNames, text)
}

func assertExpressionWithParameterTypeRegistry(t *testing.T, parameterTypeRegistry *ParameterTypeRegistry, expectedExpression string, expectedArgumentNames []string, text string) {
	generator := NewCucumberExpressionGenerator(parameterTypeRegistry)
	generatedExpressions := generator.GenerateExpressions(text)
	generatedExpression := generatedExpressions[0]
	require.Equal(t, generatedExpression.ParameterNames(), expectedArgumentNames)
	require.Equal(t, generatedExpression.Source(), expectedExpression)
}
