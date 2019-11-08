package cucumberexpressions

var nullNode = astNode{textNode, []astNode{}, token{}}

type parser func(expression []token, current int) (int, astNode)

/*
 * parameter := '{' + text* + '}'
 */
var textParser = func(expression []token, current int) (int, astNode) {
	unEscape := func(t token) token {
		switch t.tokenType {
		case whiteSpaceEscaped:
			return token{t.text[1:], whiteSpace}
		case beginOptionalEscaped:
			return beginOptionalToken
		case endOptionalEscaped:
			return endOptionalToken
		case beginParameterEscaped:
			return beginParameterToken
		case endParameterEscaped:
			return endParameterToken
		case alternationEscaped:
			return alternationToken
		case escapeEscaped:
			return escapeToken
		default:
			return t
		}
	}
	currentToken := expression[current]
	return 1, astNode{textNode, []astNode{}, unEscape(currentToken)}
}

/*
 * parameter := '{' + text* + '}'
 */
var parameterParser = parseBetween(
	optionalNode,
	beginOptional,
	endOptional,
	textParser,
)

/*
 * optional := '(' + option* + ')'
 * option := parameter | text
 */
var optionalParser = parseBetween(
	parameterNode,
	beginParameter,
	endParameter,
	parameterParser,
	textParser,
)

func parseBetween(nodeType nodeType, beginToken tokenType, endToken tokenType, parsers ...parser) parser {
	return func(expression []token, current int) (int, astNode) {
		if !lookingAt(expression, current, beginToken) {
			return 0, nullNode
		}

		subCurrent := current + 1
		consumed, subAst := parseTokensUntil(parsers, expression, subCurrent, endToken)
		subCurrent += consumed

		// endToken not found
		if lookingAt(expression, subCurrent, endOfLine) {
			return 0, nullNode
		}
		if !lookingAt(expression, subCurrent, endToken) {
			return 0, nullNode
		}
		// consumes endToken
		return subCurrent + 1 - current, astNode{nodeType, subAst, token{}}
	}
}

var alternativeSeparatorParser = func(expression []token, current int) (int, astNode) {
	if !lookingAt(expression, current, alternation) {
		return 0, nullNode
	}
	return 1, alternativeSeparator
}

var alternativeParsers = []parser{
	alternativeSeparatorParser,
	optionalParser,
	parameterParser,
	textParser,
}

/*
 * alternation := (?<=boundary) + alternative* + ( '/' + alternative* )+ + (?=boundary)
 * boundary := whitespace | ^ | $
 * alternative: = optional | parameter | text
 */
var alternationParser = func(expression []token, current int) (int, astNode) {
	previous := current - 1
	if !lookingAtAny(expression, previous, startOfLine, whiteSpace) {
		return 0, nullNode
	}
	consumed, subAst := parseTokensUntil(alternativeParsers, expression, current, whiteSpace, endOfLine)

	var contains = func(s []astNode, node astNode) bool {
		for _, a := range s {
			if a.nodeType == node.nodeType {
				return true
			}
		}
		return false
	}

	if !contains(subAst, alternativeSeparator) {
		return 0, nullNode
	}

	splitAlternatives := func(subAst []astNode) []astNode {
		alternatives := make([]astNode, 0)
		alternative := make([]astNode, 0)
		for _, node := range subAst {
			if node.nodeType == alternativeSeparator.nodeType {
				alternatives = append(alternatives, astNode{alternativeNode, alternative, token{}})
				alternative = make([]astNode, 0)
			} else {
				alternative = append(alternative, node)
			}
		}
		return append(alternatives, astNode{alternativeNode, alternative, token{}})
	}

	// Does not consume right hand boundary token
	return consumed, astNode{alternationNode, splitAlternatives(subAst), token{}}

}

var cucumberExpressionParsers = []parser{
	alternationParser,
	optionalParser,
	parameterParser,
	textParser,
}


/*
 * cucumber-expression :=  ( alternation | optional | parameter | text )*
 */
func parse(expression string) (astNode, error) {
	tokens, err := tokenize(expression)
	if err != nil {
		return nullNode, err
	}
	consumed, ast := parseTokensUntil(cucumberExpressionParsers, tokens, 0, endOfLine)
	if consumed != len(tokens) {
		// Can't happen if configured properly
		return nullNode, NewCucumberExpressionError("Could not parse" + expression)
	}

	return astNode{expressionNode, ast, token{}}, nil
}

func parseTokensUntil(parsers []parser, expresion []token, startAt int, endTokens ...tokenType) (int, []astNode) {
	ast := make([]astNode, 0)
	current := startAt
	size := len(expresion)
	for current < size {
		if lookingAtAny(expresion, current, endTokens...) {
			break
		}
		consumed, node := parseToken(parsers, expresion, current)
		if consumed == 0 {
			break
		}
		current += consumed
		ast = append(ast, node)
	}

	return current - startAt, ast
}

func parseToken(parsers []parser, expresion []token, startAt int) (int, astNode) {
	for _, parser := range parsers {
		consumed, node := parser(expresion, startAt)
		if consumed != 0 {
			return consumed, node
		}
	}
	return 0, nullNode
}

func lookingAtAny(expression []token, at int, tokens ...tokenType) bool {
	for _, token := range tokens {
		if lookingAt(expression, at, token) {
			return true
		}
	}
	return false
}

func lookingAt(expression []token, at int, token tokenType) bool {
	size := len(expression)
	if at < 0 || at >= size {
		if token == startOfLine {
			return at < 0
		}
		if token == endOfLine {
			return at >= size
		}
		return false
	}
	return expression[at].tokenType == token
}
