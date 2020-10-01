package cucumberexpressions

func tokenize(expression string) ([]token, error) {

	tokens := make([]token, 0)

	runes := []rune(expression)

	var buffer []rune
	previousTokenType := startOfLine
	treatAsText := false
	escaped := 0
	bufferStartIndex := 0

	convertBufferToToken := func(tokenType tokenType) token {
		escapeTokens := 0
		if tokenType == text {
			escapeTokens = escaped
			escaped = 0
		}
		consumedIndex := bufferStartIndex + len(buffer) + escapeTokens
		t := token{string(buffer), tokenType, bufferStartIndex, consumedIndex}
		buffer = []rune{}
		bufferStartIndex = consumedIndex
		return t
	}

	tokenTypeOf := func(r rune, treatAsText bool) (tokenType, error) {
		if !treatAsText {
			return typeOf(r)
		}
		if canEscape(r) {
			return text, nil
		}
		return startOfLine, createCantEscaped(expression, bufferStartIndex+len(buffer)+escaped)
	}

	shouldCreateNewToken := func(currentTokenType tokenType, previousTokenType tokenType) bool {
		if currentTokenType != previousTokenType {
			return true
		}
		return currentTokenType != whiteSpace && currentTokenType != text
	}

	if len(runes) == 0 {
		tokens = append(tokens, token{"", startOfLine, 0, 0})
	}

	for _, r := range runes {
		if !treatAsText && isEscapeCharacter(r) {
			escaped++
			treatAsText = true
			continue
		}

		currentTokenType, err := tokenTypeOf(r, treatAsText)
		if err != nil {
			return nil, err
		}
		treatAsText = false

		if shouldCreateNewToken(currentTokenType, previousTokenType) {
			token := convertBufferToToken(previousTokenType)
			previousTokenType = currentTokenType
			buffer = append(buffer, r)
			tokens = append(tokens, token)
		} else {
			previousTokenType = currentTokenType
			buffer = append(buffer, r)
		}
	}

	if len(buffer) > 0 {
		token := convertBufferToToken(previousTokenType)
		tokens = append(tokens, token)
	}

	if treatAsText {
		return nil, createTheEndOfLineCanNotBeEscaped(expression)
	}
	token := token{"", endOfLine, len(runes), len(runes)}
	tokens = append(tokens, token)
	return tokens, nil
}
