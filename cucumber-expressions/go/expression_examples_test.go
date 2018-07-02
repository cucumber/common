package cucumberexpressions

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"regexp"
	"strings"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestExamples(t *testing.T) {
	examples, err := ioutil.ReadFile("./examples.txt")
	require.NoError(t, err)

	chunks := strings.Split(string(examples), "---")
	for _, chunk := range chunks {
		lines := strings.Split(strings.TrimSpace(chunk), "\n")
		expressionText, text, expectedArgs := lines[0], lines[1], lines[2]
		t.Run(fmt.Sprintf("works with %s", expressionText), func(t *testing.T) {
			args := MatchExample(t, expressionText, text)
			argsJson, err := json.Marshal(args)
			require.NoError(t, err)
			require.Equal(t, expectedArgs, string(argsJson))
		})
	}
}

func MatchExample(t *testing.T, expressionText, text string) []interface{} {
	parameterTypeRegistry := NewParameterTypeRegistry()
	var expression Expression
	if strings.HasPrefix(expressionText, "/") {
		r := regexp.MustCompile(expressionText[1 : len(expressionText)-1])
		expression = NewRegularExpression(r, parameterTypeRegistry)
	} else {
		var err error
		expression, err = NewCucumberExpression(expressionText, parameterTypeRegistry)
		require.NoError(t, err)
	}
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
