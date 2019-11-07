package cucumberexpressions

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestCucumberExpressionTokenizer(t *testing.T) {
	var assertContains = func(t *testing.T, expression string, expected []token) {
		tokens, err := tokenize(expression)
		require.NoError(t, err)
		require.Equal(t, expected, tokens)
	}

	t.Run("empty string", func(t *testing.T) {
		assertContains(t, "", []token{})
	})
	t.Run("phrase", func(t *testing.T) {
		assertContains(t, "three blind mice", []token{
			{"three", text},
			{" ", whiteSpace},
			{"blind", text},
			{" ", whiteSpace},
			{"mice", text},
		})
	})

	t.Run("optional", func(t *testing.T) {
		assertContains(t, "(blind)", []token{
			{"(", beginOptional},
			{"blind", text},
			{")", endOptional},
		})
	})

	t.Run("escaped optional", func(t *testing.T) {
		assertContains(t, "\\(blind\\)", []token{
			{"\\(", beginOptionalEscaped},
			{"blind", text},
			{"\\)", endOptionalEscaped},
		})
	})

	t.Run("optional phrase", func(t *testing.T) {
		assertContains(t, "three (blind) mice", []token{
			{"three", text},
			{" ", whiteSpace},
			{"(", beginOptional},
			{"blind", text},
			{")", endOptional},
			{" ", whiteSpace},
			{"mice", text},
		})
	})

	t.Run("parameter", func(t *testing.T) {
		assertContains(t, "{string}", []token{
			{"{", beginParameter},
			{"string", text},
			{"}", endParameter},
		})
	})

	t.Run("escaped parameter", func(t *testing.T) {
		assertContains(t, "\\{string\\}", []token{
			{"\\{", beginParameterEscaped},
			{"string", text},
			{"\\}", endParameterEscaped},
		})
	})

	t.Run("parameter phrase", func(t *testing.T) {
		assertContains(t, "three {string} mice", []token{
			{"three", text},
			{" ", whiteSpace},
			{"{", beginParameter},
			{"string", text},
			{"}", endParameter},
			{" ", whiteSpace},
			{"mice", text},
		})
	})
	t.Run("alternation", func(t *testing.T) {
		assertContains(t, "blind/cripple", []token{
			{"blind", text},
			{"/", alternation},
			{"cripple", text},
		})
	})

	t.Run("escaped alternation", func(t *testing.T) {
		assertContains(t, "blind\\ and\\ famished\\/cripple mice", []token{
			{"blind", text},
			{"\\ ", whiteSpaceEscaped},
			{"and", text},
			{"\\ ", whiteSpaceEscaped},
			{"famished", text},
			{"\\/", alternationEscaped},
			{"cripple", text},
			{" ", whiteSpace},
			{"mice", text},
		})
	})

	t.Run("alternation phrase", func(t *testing.T) {
		assertContains(t, "three blind/cripple mice", []token{
			{"three", text},
			{" ", whiteSpace},
			{"blind", text},
			{"/", alternation},
			{"cripple", text},
			{" ", whiteSpace},
			{"mice", text},
		})
	})

}
