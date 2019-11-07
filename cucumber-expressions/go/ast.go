package cucumberexpressions

type tokenType int

const (
	startOfLine tokenType = iota
	EndOfLine
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
