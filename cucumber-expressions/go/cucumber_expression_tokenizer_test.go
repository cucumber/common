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
	Expected   string `yaml:"expected"`
	Exception  string `yaml:"exception"`
}

func TestCucumberExpressionTokenizer(t *testing.T) {

	var assertContains = func(t *testing.T, expression string, expected []token) {
		tokens, err := tokenize(expression)
		require.NoError(t, err)
		require.Equal(t, expected, tokens)
	}

	var assertThrows = func(t *testing.T, expression string, expected string) {
		_, err := tokenize(expression)
		require.Error(t, err)
		require.Equal(t, expected, err.Error())
	}

	directory := "../java/testdata/tokens/"
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
				assertContains(t, expectation.Expression, token)
			} else {
				assertThrows(t, expectation.Expression, expectation.Exception)
			}
		})
	}
}
