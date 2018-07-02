package cucumberexpressions_test

import (
	"fmt"
	"regexp"
	"testing"

	cucumberexpressions "./"
	"github.com/stretchr/testify/require"
)

var CAPITALISED_WORD_REGEXPS = []*regexp.Regexp{
	regexp.MustCompile(`[A-Z]+\w+`),
}

func TestParameterTypeRegistry(t *testing.T) {
	t.Run("does not allow more than one preferential parameter type for each regexp", func(t *testing.T) {
		parameterTypeRegistry := cucumberexpressions.NewParameterTypeRegistry()
		nameParameterType, err := cucumberexpressions.NewParameterType(
			"name",
			CAPITALISED_WORD_REGEXPS,
			"name",
			nil,
			true,
			true,
		)
		require.NoError(t, err)
		err = parameterTypeRegistry.DefineParameterType(nameParameterType)
		require.NoError(t, err)
		personParameterType, err := cucumberexpressions.NewParameterType(
			"person",
			CAPITALISED_WORD_REGEXPS,
			"person",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		err = parameterTypeRegistry.DefineParameterType(personParameterType)
		require.NoError(t, err)
		placeParameterType, err := cucumberexpressions.NewParameterType(
			"place",
			CAPITALISED_WORD_REGEXPS,
			"place",
			nil,
			true,
			true,
		)
		require.NoError(t, err)
		err = parameterTypeRegistry.DefineParameterType(placeParameterType)
		require.EqualError(t, err, fmt.Sprintf("There can only be one preferential parameter type per regexp. The regexp /%s/ is used for two preferential parameter types, {name} and {place}", CAPITALISED_WORD_REGEXPS[0].String()))
	})

	t.Run("looks up preferential parameter type by regexp", func(t *testing.T) {
		parameterTypeRegistry := cucumberexpressions.NewParameterTypeRegistry()
		nameParameterType, err := cucumberexpressions.NewParameterType(
			"name",
			CAPITALISED_WORD_REGEXPS,
			"name",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		err = parameterTypeRegistry.DefineParameterType(nameParameterType)
		require.NoError(t, err)
		personParameterType, err := cucumberexpressions.NewParameterType(
			"person",
			CAPITALISED_WORD_REGEXPS,
			"person",
			nil,
			true,
			true,
		)
		require.NoError(t, err)
		err = parameterTypeRegistry.DefineParameterType(personParameterType)
		require.NoError(t, err)
		placeParameterType, err := cucumberexpressions.NewParameterType(
			"place",
			CAPITALISED_WORD_REGEXPS,
			"place",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		err = parameterTypeRegistry.DefineParameterType(placeParameterType)
		require.NoError(t, err)
		matchingParameterType, err := parameterTypeRegistry.LookupByRegexp(`[A-Z]+\w+`, `([A-Z]+\w+) and ([A-Z]+\w+)`, "Lisa and Bob")
		require.NoError(t, err)
		require.Equal(t, matchingParameterType, personParameterType)
	})

	t.Run("throws ambiguous exception on lookup when no parameter types are preferential", func(t *testing.T) {
		parameterTypeRegistry := cucumberexpressions.NewParameterTypeRegistry()
		nameParameterType, err := cucumberexpressions.NewParameterType(
			"name",
			CAPITALISED_WORD_REGEXPS,
			"name",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		err = parameterTypeRegistry.DefineParameterType(nameParameterType)
		require.NoError(t, err)
		personParameterType, err := cucumberexpressions.NewParameterType(
			"person",
			CAPITALISED_WORD_REGEXPS,
			"person",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		err = parameterTypeRegistry.DefineParameterType(personParameterType)
		require.NoError(t, err)
		placeParameterType, err := cucumberexpressions.NewParameterType(
			"place",
			CAPITALISED_WORD_REGEXPS,
			"place",
			nil,
			true,
			false,
		)
		require.NoError(t, err)
		err = parameterTypeRegistry.DefineParameterType(placeParameterType)
		require.NoError(t, err)
		_, err = parameterTypeRegistry.LookupByRegexp(`[A-Z]+\w+`, `([A-Z]+\w+) and ([A-Z]+\w+)`, "Lisa and Bob")
		require.EqualError(
			t,
			err,
			"Your Regular Expression /([A-Z]+\\w+) and ([A-Z]+\\w+)/\n"+
				"matches multiple parameter types with regexp /[A-Z]+\\w+/:\n"+
				"   {name}\n"+
				"   {person}\n"+
				"   {place}\n"+
				"\n"+
				"I couldn't decide which one to use. You have two options:\n"+
				"\n"+
				"1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:\n"+
				"   {name} and {name}\n"+
				"   {name} and {person}\n"+
				"   {name} and {place}\n"+
				"   {person} and {name}\n"+
				"   {person} and {person}\n"+
				"   {person} and {place}\n"+
				"   {place} and {name}\n"+
				"   {place} and {person}\n"+
				"   {place} and {place}\n"+
				"\n"+
				"2) Make one of the parameter types preferential and continue to use a Regular Expression.\n"+
				"\n",
		)
	})
}
