package cucumberexpressions_test

import (
	"regexp"
	"testing"

	cucumberexpressions "."
	"github.com/stretchr/testify/require"
)

func TestCombinatorialGeneratedExpressionFactory(t *testing.T) {
	t.Run("generates multiple expressions", func(t *testing.T) {
		colorParameterType, err := cucumberexpressions.NewParameterType(
			"color",
			[]*regexp.Regexp{regexp.MustCompile("red|blue|yellow")},
			"",
			func(arg3 ...string) interface{} { return arg3[0] },
			false,
			true,
		)
		require.NoError(t, err)
		csscolorParameterType, err := cucumberexpressions.NewParameterType(
			"csscolor",
			[]*regexp.Regexp{regexp.MustCompile("red|blue|yellow")},
			"",
			func(arg3 ...string) interface{} { return arg3[0] },
			false,
			true,
		)
		require.NoError(t, err)
		dateParameterType, err := cucumberexpressions.NewParameterType(
			"date",
			[]*regexp.Regexp{regexp.MustCompile(`\d{4}-\d{2}-\d{2}`)},
			"",
			func(arg3 ...string) interface{} { return arg3[0] },
			false,
			true,
		)
		require.NoError(t, err)
		datetimeParameterType, err := cucumberexpressions.NewParameterType(
			"datetime",
			[]*regexp.Regexp{regexp.MustCompile(`\d{4}-\d{2}-\d{2}`)},
			"",
			func(arg3 ...string) interface{} { return arg3[0] },
			false,
			true,
		)
		require.NoError(t, err)
		timestampParameterType, err := cucumberexpressions.NewParameterType(
			"timestamp",
			[]*regexp.Regexp{regexp.MustCompile(`\d{4}-\d{2}-\d{2}`)},
			"",
			func(arg3 ...string) interface{} { return arg3[0] },
			false,
			true,
		)
		require.NoError(t, err)
		parameterTypeCombinations := [][]*cucumberexpressions.ParameterType{
			{colorParameterType, csscolorParameterType},
			{dateParameterType, datetimeParameterType, timestampParameterType},
		}
		factory := cucumberexpressions.NewCombinatorialGeneratedExpressionFactory("I bought a {%s} ball on {%s}", parameterTypeCombinations)
		var expressions []string
		for _, g := range factory.GenerateExpressions() {
			expressions = append(expressions, g.Source())
		}
		require.Equal(t, expressions, []string{
			"I bought a {color} ball on {date}",
			"I bought a {color} ball on {datetime}",
			"I bought a {color} ball on {timestamp}",
			"I bought a {csscolor} ball on {date}",
			"I bought a {csscolor} ball on {datetime}",
			"I bought a {csscolor} ball on {timestamp}",
		})
	})
}
