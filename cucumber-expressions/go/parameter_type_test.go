package cucumberexpressions

import (
	"regexp"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestParameterType(t *testing.T) {
	t.Run("does not allow ignore flag on regexp", func(t *testing.T) {
		_, err := NewParameterType(
			"case-insensitive",
			[]*regexp.Regexp{regexp.MustCompile("(?i)[a-z]+")},
			"case-insensitive",
			nil,
			true,
			true,
			false,
		)
		require.EqualError(t, err, "ParameterType Regexps can't use flags")
	})
}
