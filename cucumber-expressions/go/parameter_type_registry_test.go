package cucumberexpressions_test

import (
	"fmt"
	"regexp"
	"testing"

	cucumberexpressions "."
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
}
