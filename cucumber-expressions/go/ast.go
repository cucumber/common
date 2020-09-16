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

var nullNode = node{textNode, -1, -1, "", []node{}}

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
