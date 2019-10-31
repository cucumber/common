package cucumberexpressions

import (
	"regexp"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestArgument(t *testing.T) {
	t.Run("exposes ParameterType", func(t *testing.T) {
		treeRegexp := NewTreeRegexp(regexp.MustCompile("three (.*) mice"))
		parameterTypeRegistry := NewParameterTypeRegistry()
		parameterType := parameterTypeRegistry.LookupByTypeName("string")
		parameterTypes := []*ParameterType{parameterType}
		arguments := BuildArguments(treeRegexp, "three blind mice", parameterTypes)
		argument := arguments[0]

		require.Equal(t, argument.ParameterType().name, "string")
	})
}
