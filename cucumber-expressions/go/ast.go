package cucumberexpressions

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
