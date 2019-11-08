package cucumberexpressions

import "strings"

type nodeType int

const (
	textNode nodeType = iota
	optionalNode
	alternationNode
	alternativeNode
	parameterNode
	expressionNode
)

type astNode struct {
	nodeType nodeType
	nodes    []astNode
	token    token
}

func (node astNode) text() string {
	builder := strings.Builder{}
	builder.WriteString(node.token.text)
	for _, c := range node.nodes {
		builder.WriteString(c.text())
	}
	return builder.String()
}

// Marker. This way we don't need to model the
// the tail end of alternation in the AST:
//
// alternation := alternative* + ( '/' + alternative* )+
var alternativeSeparator = astNode{alternativeNode, []astNode{}, token{"/", alternation}}

type tokenType int

const (
	startOfLine tokenType = iota
	endOfLine
	// In order of precedence
	whiteSpaceEscaped
	whiteSpace
	beginOptionalEscaped
	beginOptional
	endOptionalEscaped
	endOptional
	beginParameterEscaped
	beginParameter
	endParameterEscaped
	endParameter
	alternationEscaped
	alternation
	escapeEscaped
	escape
	text
)

type token struct {
	text      string
	tokenType tokenType
}

var beginOptionalToken = token{"(", beginOptional}
var endOptionalToken = token{")", endOptional}
var beginParameterToken = token{"{", beginParameter}
var endParameterToken = token{"}", endParameter}
var alternationToken = token{"/", alternation}
var escapeToken = token{"\\", escape}

var nullNode = astNode{textNode, []astNode{}, nullToken}
var nullToken = token{"", text}
