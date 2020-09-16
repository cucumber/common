package cucumberexpressions

import (
	"errors"
	"unicode"
)

func tokenize(expression string) ([]token, error) {

	tokens := make([]token, 0)

	runes := []rune(expression)

	var buffer []rune
	previousTokenType := startOfLine
	treatAsText := false
	escaped := 0

	convertBufferToToken := func(tokenType tokenType, index int) token {
		escapeTokens := 0
		if tokenType == text {
			escapeTokens = escaped
			escaped = 0
		}
		startIndex := index - len(buffer) - escapeTokens
		t := token{string(buffer), tokenType, startIndex, index}
		buffer = []rune{}
		return t
	}

	tokens = append(tokens, token{"", startOfLine, 0, 0})

	for index, r := range runes {
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

		if previousTokenType != startOfLine && (currentTokenType != previousTokenType || (currentTokenType != whiteSpace && currentTokenType != text)) {
			token := convertBufferToToken(previousTokenType, index)
			previousTokenType = currentTokenType
			buffer = append(buffer, r)
			tokens = append(tokens, token)
		} else {
			previousTokenType = currentTokenType
			buffer = append(buffer, r)
		}

	}

	if len(buffer) > 0 {
		token := convertBufferToToken(previousTokenType, len(runes))
		tokens = append(tokens, token)
	}

	if treatAsText {
		return nil, errors.New("can't escape EOL")
	}
	token := token{"", endOfLine, len(runes), len(runes)}
	tokens = append(tokens, token)
	return tokens, nil
}

func tokenTypeOf(r rune, treatAsText bool) (tokenType, error) {
	if !treatAsText {
		return typeOf(r)
	}
	if canEscape(r) {
		return text, nil
	}
	return startOfLine, errors.New("can't escape")

}

func canEscape(r rune) bool {
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
	case beginOptionalCharacter:
		return beginOptional, nil
	case endOptionalCharacter:
		return endOptional, nil
	}
	return text, nil
}
