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

	//var assertContains = func(t *testing.T, expression string, expected []token) {
	//	tokens, err := tokenize(expression)
	//	require.NoError(t, err)
	//	require.Equal(t, expected, tokens)
	//}

	//t.Run("empty string", func(t *testing.T) {
	//	assertContains(t, "", []token{
	//		{"", startOfLine, 0, 0},
	//		{"", endOfLine, 0, 0},
	//	})
	//})

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
			var token []token
			err = json.Unmarshal([]byte(expectation.Expected), &token)
			require.NoError(t, err)

		})
	}
}
