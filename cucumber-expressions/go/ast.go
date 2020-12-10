package cucumberexpressions

import (
	"strings"
	"unicode"
)

const escapeCharacter rune = '\\'
const alternationCharacter rune = '/'
const beginParameterCharacter rune = '{'
const endParameterCharacter rune = '}'
const beginOptionalCharacter rune = '('
const endOptionalCharacter rune = ')'

type nodeType string

const (
	textNode        nodeType = "TEXT_NODE"
	optionalNode    nodeType = "OPTIONAL_NODE"
	alternationNode nodeType = "ALTERNATION_NODE"
	alternativeNode nodeType = "ALTERNATIVE_NODE"
	parameterNode   nodeType = "PARAMETER_NODE"
	expressionNode  nodeType = "EXPRESSION_NODE"
)

type node struct {
	NodeType nodeType `json:"type"`
	Start    int      `json:"start"`
	End      int      `json:"end"`
	Token    string   `json:"token"`
	Nodes    []node   `json:"nodes"`
}

func (node node) text() string {
	builder := strings.Builder{}
	builder.WriteString(node.Token)

	if node.Nodes == nil {
		return builder.String()
	}

	for _, c := range node.Nodes {
		builder.WriteString(c.text())
	}
	return builder.String()
}

type tokenType string

const (
	startOfLine    tokenType = "START_OF_LINE"
	endOfLine      tokenType = "END_OF_LINE"
	whiteSpace     tokenType = "WHITE_SPACE"
	beginOptional  tokenType = "BEGIN_OPTIONAL"
	endOptional    tokenType = "END_OPTIONAL"
	beginParameter tokenType = "BEGIN_PARAMETER"
	endParameter   tokenType = "END_PARAMETER"
	alternation    tokenType = "ALTERNATION"
	text           tokenType = "TEXT"
)

type token struct {
	Text      string    `json:"text"`
	TokenType tokenType `json:"type"`
	Start     int       `json:"start"`
	End       int       `json:"end"`
}

var nullNode = node{textNode, -1, -1, "", nil}

func isEscapeCharacter(r rune) bool {
	return r == escapeCharacter
}

func canEscape(r rune) bool {
	if unicode.Is(unicode.White_Space, r) {
		return true
	}
	switch r {
	case escapeCharacter:
		return true
	case alternationCharacter:
		return true
	case beginParameterCharacter:
		return true
	case endParameterCharacter:
		return true
	case beginOptionalCharacter:
		return true
	case endOptionalCharacter:
		return true
	}
	return false
}

func typeOf(r rune) (tokenType, error) {
	if unicode.Is(unicode.White_Space, r) {
		return whiteSpace, nil
	}
	switch r {
	case alternationCharacter:
		return alternation, nil
	case beginParameterCharacter:
		return beginParameter, nil
	case endParameterCharacter:
		return endParameter, nil
	case beginOptionalCharacter:
		return beginOptional, nil
	case endOptionalCharacter:
		return endOptional, nil
	}
	return text, nil
}

func symbol(tokenType tokenType) string {
	switch tokenType {
	case beginOptional:
		return string(beginOptionalCharacter)
	case endOptional:
		return string(endOptionalCharacter)
	case beginParameter:
		return string(beginParameterCharacter)
	case endParameter:
		return string(endParameterCharacter)
	case alternation:
		return string(alternationCharacter)
	}

	return ""
}

func purpose(tokenType tokenType) string {
	switch tokenType {
	case beginOptional:
		return "optional text"
	case endOptional:
		return "optional text"
	case beginParameter:
		return "a parameter"
	case endParameter:
		return "optional text"
	case alternation:
		return "alternation"
	}

	return ""
}
