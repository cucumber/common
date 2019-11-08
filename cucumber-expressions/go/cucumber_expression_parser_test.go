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
			token{},
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
			token{},
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
					token{},
				},
			},
			token{},
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
					token{},
				},
			},
			token{},
		})
	})

	t.Run("anonymous parameter", func(t *testing.T) {
		assertAst(t, "{}", astNode{
			expressionNode,
			[]astNode{
				{parameterNode,
					[]astNode{},
					token{},
				},
			},
			token{},
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
				}, token{}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"mice", text}},
			},
			token{},
		})
	})

	t.Run("slash", func(t *testing.T) {
		assertAst(t, "\\", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"\\", escape}},
			},
			token{},
		})
	})

	t.Run("opening brace", func(t *testing.T) {
		assertAst(t, "{", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"{", beginParameter}},
			},
			token{},
		})
	})

	t.Run("opening parenthesis", func(t *testing.T) {
		assertAst(t, "(", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"(", beginOptional}},
			},
			token{},
		})
	})

	t.Run("escaped opening parenthesis", func(t *testing.T) {
		assertAst(t, "\\(", astNode{
			expressionNode,
			[]astNode{
				{textNode, []astNode{}, token{"(", beginOptional}},
			},
			token{},
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
			token{},
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
				}, token{}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"blind", text}},
				{textNode, []astNode{}, token{")", endOptional}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"mice", text}},
			},
			token{},
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
				}, token{}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"mice", text}},
			},
			token{},
		})
	})

	t.Run("alternation", func(t *testing.T) {
		assertAst(t, "mice/rats", astNode{
			expressionNode,
			[]astNode{
				{alternationNode, []astNode{
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"mice", text}},
					}, token{}},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"rats", text}},
					}, token{}},
				}, token{}},
			},
			token{},
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
			token{},
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
					}, token{}},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"blind", text}},
					}, token{}},
				}, token{}},
				{textNode, []astNode{}, token{" ", whiteSpace}},
				{textNode, []astNode{}, token{"mice", text}},
			},
			token{},
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
					}, token{}},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"blind", text}},
						{textNode, []astNode{}, token{" ", whiteSpace}},
						{textNode, []astNode{}, token{"mice", text}},
						{textNode, []astNode{}, token{" ", whiteSpace}},
					}, token{}},
				}, token{}},
			},
			token{},
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
					}, token{}},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"rats", text}},
					}, token{}},
				}, token{}},
			},
			token{},
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
					}, token{}},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"rats", text}},
						{textNode, []astNode{}, token{"(", beginOptional}},
					}, token{}},
				}, token{}},
			},
			token{},
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
					}, token{}},
					{alternativeNode, []astNode{
						{textNode, []astNode{}, token{"cat", text}},
						{optionalNode, []astNode{
							{textNode, []astNode{}, token{"s", text}},
						}, token{}},
					}, token{}},
				}, token{}},
			},
			token{},
		})
	})

}
