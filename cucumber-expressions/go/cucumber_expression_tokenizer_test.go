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
			{"three", text, -1, -1},
			{" ", whiteSpace, -1, -1},
			{"blind", text, -1, -1},
			{" ", whiteSpace, -1, -1},
			{"mice", text, -1, -1},
		})
	})

	t.Run("optional", func(t *testing.T) {
		assertContains(t, "(blind)", []token{
			{"(", beginOptional, -1, -1},
			{"blind", text, -1, -1},
			{")", endOptional, -1, -1},
		})
	})

	t.Run("escaped optional", func(t *testing.T) {
		assertContains(t, "\\(blind\\)", []token{
			{"\\(", beginOptionalEscaped, -1, -1},
			{"blind", text, -1, -1},
			{"\\)", endOptionalEscaped, -1, -1},
		})
	})

	t.Run("optional phrase", func(t *testing.T) {
		assertContains(t, "three (blind) mice", []token{
			{"three", text, -1, -1},
			{" ", whiteSpace, -1, -1},
			{"(", beginOptional, -1, -1},
			{"blind", text, -1, -1},
			{")", endOptional, -1, -1},
			{" ", whiteSpace, -1, -1},
			{"mice", text, -1, -1},
		})
	})

	t.Run("parameter", func(t *testing.T) {
		assertContains(t, "{string}", []token{
			{"{", beginParameter, -1, -1},
			{"string", text, -1, -1},
			{"}", endParameter, -1, -1},
		})
	})

	t.Run("escaped parameter", func(t *testing.T) {
		assertContains(t, "\\{string\\}", []token{
			{"\\{", beginParameterEscaped, -1, -1},
			{"string", text, -1, -1},
			{"\\}", endParameterEscaped, -1, -1},
		})
	})

	t.Run("parameter phrase", func(t *testing.T) {
		assertContains(t, "three {string} mice", []token{
			{"three", text, -1, -1},
			{" ", whiteSpace, -1, -1},
			{"{", beginParameter, -1, -1},
			{"string", text, -1, -1},
			{"}", endParameter, -1, -1},
			{" ", whiteSpace, -1, -1},
			{"mice", text, -1, -1},
		})
	})
	t.Run("alternation", func(t *testing.T) {
		assertContains(t, "blind/cripple", []token{
			{"blind", text, -1, -1},
			{"/", alternation, -1, -1},
			{"cripple", text, -1, -1},
		})
	})

	t.Run("escaped alternation", func(t *testing.T) {
		assertContains(t, "blind\\ and\\ famished\\/cripple mice", []token{
			{"blind", text, -1, -1},
			{"\\ ", whiteSpaceEscaped, -1, -1},
			{"and", text, -1, -1},
			{"\\ ", whiteSpaceEscaped, -1, -1},
			{"famished", text, -1, -1},
			{"\\/", alternationEscaped, -1, -1},
			{"cripple", text, -1, -1},
			{" ", whiteSpace, -1, -1},
			{"mice", text, -1, -1},
		})
	})

	t.Run("alternation phrase", func(t *testing.T) {
		assertContains(t, "three blind/cripple mice", []token{
			{"three", text, -1, -1},
			{" ", whiteSpace, -1, -1},
			{"blind", text, -1, -1},
			{"/", alternation, -1, -1},
			{"cripple", text, -1, -1},
			{" ", whiteSpace, -1, -1},
			{"mice", text, -1, -1},
		})
	})

}
