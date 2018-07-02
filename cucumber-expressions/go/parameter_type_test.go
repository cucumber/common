package cucumberexpressions_test

import (
	"regexp"
	"testing"

	cucumberexpressions "./"
	"github.com/stretchr/testify/require"
)

func TestParameterType(t *testing.T) {
	t.Run("does not allow ignore flag on regexp", func(t *testing.T) {
		_, err := cucumberexpressions.NewParameterType(
			"case-insensitive",
			[]*regexp.Regexp{regexp.MustCompile("(?i)[a-z]+")},
			"case-insensitive",
			nil,
			true,
			true,
		)
		require.EqualError(t, err, "ParameterType Regexps can't use flags")
	})
}
