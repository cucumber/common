package cucumberexpressions

var errorNode = astNode{textNode, []astNode{}, token{}}

type parser func(expression []token, current int) (int, astNode)

var parameterParser = parseBetween(
	optionalNode,
	beginOptional,
	endOptional,
	textParser,
)

var optionalParser = parseBetween(
	parameterNode,
	beginParameter,
	endParameter,
	parameterParser,
	textParser,
)

var cucumberExpressionParsers = []parser{
	optionalParser,
	parameterParser,
	textParser,
}

var textParser = func(expression []token, current int) (int, astNode) {
	currentToken := expression[current]
	return 1, astNode{textNode, []astNode{}, unEscape(currentToken)}
}

func unEscape(t token) token {
	switch t.tokenType {
	case whiteSpaceEscaped:
		return token{t.text, whiteSpace}
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

func parseBetween(nodeType nodeType, beginToken tokenType, endToken tokenType, parsers ...parser) parser {
	return func(expression []token, current int) (int, astNode) {
		if !lookingAt(expression, current, beginToken) {
			return 0, errorNode
		}

		subCurrent := current + 1
		consumed, subAst := parseTokensUntil(parsers, expression, subCurrent, endToken)
		subCurrent += consumed

		// endToken not found
		if lookingAt(expression, subCurrent, endOfLine) {
			return 0, errorNode
		}
		if !lookingAt(expression, subCurrent, endToken) {
			return 0, errorNode
		}
		// consumes endToken
		return subCurrent + 1 - current, astNode{nodeType, subAst, token{}}
	}
}

/*
 * cucumber-expression :=  ( alternation | optional | parameter | text )*
 */
func parse(expression string) (astNode, error) {
	tokens, err := tokenize(expression)
	if err != nil {
		return errorNode, err
	}
	consumed, ast := parseTokensUntil(cucumberExpressionParsers, tokens, 0, endOfLine)
	if consumed != len(tokens) {
		// Can't happen if configured properly
		return errorNode, NewCucumberExpressionError("Could not parse" + expression)
	}

	return astNode{expressionNode, ast, token{}}, nil
}

func parseTokensUntil(parsers []parser, expresion []token, startAt int, endTokens ...tokenType) (int, []astNode) {
	ast := make([]astNode, 0)
	current := startAt
	size := len(expresion)
	for current < size {
		if lookingAtAny(expresion, current, endTokens) {
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
	return 0, errorNode
}

func lookingAtAny(expression []token, at int, tokens []tokenType) bool {
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
