package cucumberexpressions

import (
	//"regexp"
	//"strings"
)

type tokenizer func(expression string, current int) (int, token)

func tokenize(expression string) ([]token, error) {
	return []token{}, nil
}
