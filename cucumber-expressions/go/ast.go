package cucumberexpressions

import "strings"

const escapeCharacter = '\\'
const alternationCharacter = '/'
const beginParameterCharacter = '{'
const endParameterCharacter = '}'
const beginOptionalCharacter = '('
const endOptionalCharacter = ')'

type nodeType int

const (
	textNode nodeType = iota
	optionalNode
	alternationNode
	alternativeNode
	parameterNode
	expressionNode
)

type node struct {
	nodeType nodeType
	start    int
	end      int
	token    string
	nodes    []node
}

func (node node) text() string {
	builder := strings.Builder{}
	builder.WriteString(node.token)
	for _, c := range node.nodes {
		builder.WriteString(c.text())
	}
	return builder.String()
}

type tokenType int

const (
	startOfLine tokenType = iota
	endOfLine
	whiteSpace
	beginOptional
	endOptional
	beginParameter
	endParameter
	alternation
	escape
	text
)

type token struct {
	text      string
	tokenType tokenType
	start     int
	end       int
}

var nullNode = node{textNode, -1, -1, "", []node{}}
