package cucumberexpressions

import (
	"encoding/json"
	"fmt"
	"github.com/stretchr/testify/require"
	"gopkg.in/yaml.v3"
	"io/ioutil"
	"testing"
)

type expectation struct {
	Expression string `yaml:"expression"`
	Text       string `yaml:"text"`
	Expected   string `yaml:"expected"`
	Exception  string `yaml:"exception"`
}

func TestCucumberExpressionTokenizer(t *testing.T) {

	directory := "testdata/tokens/"
	files, err := ioutil.ReadDir(directory)
	require.NoError(t, err)

	for _, file := range files {
		contents, err := ioutil.ReadFile(directory + file.Name())
		require.NoError(t, err)
		t.Run(fmt.Sprintf("%s", file.Name()), func(t *testing.T) {
			var expectation expectation
			err = yaml.Unmarshal(contents, &expectation)
			require.NoError(t, err)

			if expectation.Exception == "" {
				var token []token
				err = json.Unmarshal([]byte(expectation.Expected), &token)
				require.NoError(t, err)
				assertTokenizes(t, token, expectation.Expression)
			} else {
				assertThrows(t, expectation.Exception, expectation.Expression)
			}
		})
	}
}

func assertTokenizes(t *testing.T, expected []token, expression string) {
	tokens, err := tokenize(expression)
	require.NoError(t, err)
	require.Equal(t, expected, tokens)
}

func assertThrows(t *testing.T, expected string, expression string) {
	_, err := tokenize(expression)
	require.Error(t, err)
	require.Equal(t, expected, err.Error())
}
