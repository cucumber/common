package cucumberexpressions

import (
	"regexp"
	"strings"
)

type tokenizer func(expression string, current int) (int, token)

var tokenizers = []tokenizer{
	tokenizePattern(whiteSpaceEscaped, regexp.MustCompile(`\\\s`)),
	tokenizePattern(whiteSpace, regexp.MustCompile(`\s+`)),

	tokenizeString(beginOptionalEscaped, "\\("),
	tokenizeString(beginOptional, "("),

	tokenizeString(endOptionalEscaped, "\\)"),
	tokenizeString(endOptional, ")"),

	tokenizeString(beginParameterEscaped, "\\{"),
	tokenizeString(beginParameter, "{"),

	tokenizeString(endParameterEscaped, "\\}"),
	tokenizeString(endParameter, "}"),

	tokenizeString(alternationEscaped, "\\/"),
	tokenizeString(alternation, "/"),

	tokenizeString(escapeEscaped, "\\\\"),
	tokenizeString(escape, "\\"),

	// Should be `.` but this creates a nicer parse tree.
	tokenizePattern(text, regexp.MustCompile(`[^(){}\\/\s]+`)),
}

/*
 * token := '\' + whitespace | whitespace | '\(' | '(' | '\)' | ')' |
 *          '\{' | '{' | '\}' | '}' | '\/' | '/' | '\\' | '\' | .
 */
func tokenize(expression string) ([]token, error) {
	length := len(expression)
	tokens := make([]token, 0)

	current := 0
	for current < length {
		tokenized := false
		for _, tokenizer := range tokenizers {
			consumed, token := tokenizer(expression, current)
			if consumed != 0 {
				tokens = append(tokens, token)
				current += consumed
				tokenized = true
				break
			}
		}
		if !tokenized {
			// Can't happen if configured properly
			// Leave in to avoid looping if not configured properly
			return tokens, NewCucumberExpressionError("Could not tokenize" + expression)
		}
	}

	return tokens, nil
}

func tokenizeString(tokenType tokenType, pattern string) tokenizer {
	return func(expression string, current int) (int, token) {
		if !strings.HasPrefix(expression[current:], pattern) {
			return 0, token{"", tokenType}
		}
		return len(pattern), token{pattern, tokenType}
	}
}

func tokenizePattern(tokenType tokenType, regexp *regexp.Regexp) tokenizer {
	return func(expression string, current int) (int, token) {
		tail := expression[current:]
		loc := regexp.FindStringIndex(tail)
		if loc == nil || loc[0] != 0 {
			return 0, token{"", tokenType}
		}
		match := tail[0:loc[1]]
		return loc[1], token{match, tokenType}
	}
}
