package cucumberexpressions

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestCucumberExpressionParser(t *testing.T) {
	var assertAst = func(t *testing.T, expression string, expected astNode) {
		ast, err := parse(expression)
		require.NoError(t, err)
		require.Equal(t, expected, ast)
	}

	t.Run("empty string", func(t *testing.T) {
		assertAst(t, "", astNode{
			expressionNode,
			[]astNode{},
			nullToken,
		})
	})

	t.Run("phrase", func(t *testing.T) {
		assertAst(t, "three blind mice", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"three", text}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"blind", text}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"mice", text}},
			},
			nullToken,
		})
	})

	t.Run("optional", func(t *testing.T) {
		assertAst(t, "(blind)", astNode{
			expressionNode,
			[]astNode{
				{optionalNode,
					[]astNode{
						{textNode, []astNode{}, token{"blind", text}},
					},
					nullToken,
				},
			},
			nullToken,
		})
	})

	t.Run("parameter", func(t *testing.T) {
		assertAst(t, "{string}", astNode{
			expressionNode,
			[]astNode{
				{parameterNode,
					[]astNode{
						{textNode, []astNode{}, token{"string", text}},
					},
					nullToken,
				},
			},
			nullToken,
		})
	})

	t.Run("anonymous parameter", func(t *testing.T) {
		assertAst(t, "{}", astNode{
			expressionNode,
			[]astNode{
				{parameterNode,
					[]astNode{},
					nullToken,
				},
			},
			nullToken,
		})
	})

	t.Run("optional phrase", func(t *testing.T) {
		assertAst(t, "three (blind) mice", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"three", text}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{optionalNode, []astNode{
					{textNode, []astNode{}, token{"blind", text}},
				}, nullToken},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"mice", text}},
			},
			nullToken,
		})
	})

	t.Run("slash", func(t *testing.T) {
		assertAst(t, "\\", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"\\", escape}},
			},
			nullToken,
		})
	})

	t.Run("opening brace", func(t *testing.T) {
		assertAst(t, "{", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"{", beginParameter}},
			},
			nullToken,
		})
	})

	t.Run("unfinished parameter", func(t *testing.T) {
		assertAst(t, "{string", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"{", beginParameter}},
				{textNode, []astNode{}, token{"string", text}},
			},
			nullToken,
		})
	})

	t.Run("opening parenthesis", func(t *testing.T) {
		assertAst(t, "(", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"(", beginOptional}},
			},
			nullToken,
		})
	})

	t.Run("escaped opening parenthesis", func(t *testing.T) {
		assertAst(t, "\\(", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"(", beginOptional}},
			},
			nullToken,
		})
	})

	t.Run("escaped optional phrase", func(t *testing.T) {
		assertAst(t, "three \\(blind) mice", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"three", text}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"(", beginOptional}},
				{textNode, []astNode{}, token{"blind", text}},
				{textNode, []astNode{}, token{")", endOptional}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"mice", text}},
			},
			nullToken,
		})
	})

	t.Run("escaped optional followed by optional", func(t *testing.T) {
		assertAst(t, "three \\((very) blind) mice", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"three", text}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"(", beginOptional}},
				{optionalNode, []astNode{
					{textNode, []astNode{}, token{"very", text}},
				}, nullToken},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"blind", text}},
				{textNode, []astNode{}, token{")", endOptional}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"mice", text}},
			},
			nullToken,
		})
	})

	t.Run("optional containing escaped optional", func(t *testing.T) {
		assertAst(t, "three ((very\\) blind) mice", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"three", text}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{optionalNode, []astNode{
					{textNode, []astNode{}, token{"(", beginOptional}},
					{textNode, []astNode{}, token{"very", text}},
					{textNode, []astNode{}, token{")", endOptional}},
					{textNode, []astNode{}, token{" ", whiteSpace}},
					{textNode, []astNode{}, token{"blind", text}},
				}, nullToken},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"mice", text}},
			},
			nullToken,
		})
	})

	t.Run("alternation", func(t *testing.T) {
		assertAst(t, "mice/rats", astNode{
			expressionNode,
			[]astNode{
				{alternationNode, []astNode{
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"mice", text}},
					}, nullToken},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"rats", text}},
					}, nullToken},
				}, nullToken},
			},
			nullToken,
		})
	})

	t.Run("escaped alternation", func(t *testing.T) {
		assertAst(t, "mice\\/rats", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"mice", text}},
				{textNode, []astNode{}, token{"/", alternation}},
				{textNode, []astNode{}, token{"rats", text}},
			},
			nullToken,
		})
	})

	t.Run("alternation phrase", func(t *testing.T) {
		assertAst(t, "three hungry/blind mice", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"three", text}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{alternationNode, []astNode{
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"hungry", text}},
					}, nullToken},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"blind", text}},
					}, nullToken},
				}, nullToken},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"mice", text}},
			},
			nullToken,
		})
	})

	t.Run("alternation with whitespace", func(t *testing.T) {
		assertAst(t, "\\ three\\ hungry/blind\\ mice\\ ", astNode{
			expressionNode,
			[]astNode{
				{alternationNode, []astNode{
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{" ", whiteSpace}},
						{textNode, []astNode{}, token{"three", text}},
						{textNode, []astNode{}, token{" ", whiteSpace}},
						{textNode, []astNode{}, token{"hungry", text}},
					}, nullToken},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"blind", text}},
						{textNode, []astNode{}, token{" ", whiteSpace}},
						{textNode, []astNode{}, token{"mice", text}},
						{textNode, []astNode{}, token{" ", whiteSpace}},
					}, nullToken},
				}, nullToken},
			},
			nullToken,
		})
	})

	t.Run("alternation with unused end optional", func(t *testing.T) {
		assertAst(t, "three )blind\\ mice/rats", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"three", text}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{alternationNode, []astNode{
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{")", endOptional}},
						{textNode, []astNode{}, token{"blind", text}},
						{textNode, []astNode{}, token{" ", whiteSpace}},
						{textNode, []astNode{}, token{"mice", text}},
					}, nullToken},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"rats", text}},
					}, nullToken},
				}, nullToken},
			},
			nullToken,
		})
	})

	t.Run("alternation with unused start optional", func(t *testing.T) {
		assertAst(t, "three blind\\ mice/rats(", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"three", text}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{alternationNode, []astNode{
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"blind", text}},
						{textNode, []astNode{}, token{" ", whiteSpace}},
						{textNode, []astNode{}, token{"mice", text}},
					}, nullToken},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"rats", text}},
						{textNode, []astNode{}, token{"(", beginOptional}},
					}, nullToken},
				}, nullToken},
			},
			nullToken,
		})
	})

	t.Run("alternation with unused start optional", func(t *testing.T) {
		assertAst(t, "three blind\\ rat/cat(s)", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"three", text}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{alternationNode, []astNode{
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"blind", text}},
						{textNode, []astNode{}, token{" ", whiteSpace}},
						{textNode, []astNode{}, token{"rat", text}},
					}, nullToken},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"cat", text}},
						{optionalNode, []astNode{
							{textNode, []astNode{}, token{"s", text}},
						}, nullToken},
					}, nullToken},
				}, nullToken},
			},
			nullToken,
		})
	})

}
