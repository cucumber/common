package cucumberexpressions

type tokenizer func(expression string, current int) (int, token)

func tokenize(expression string) ([]token, error) {
	tokens := make([]token, 0)
	index := 0

	tokens = append(tokens, token{"", startOfLine, 0, 0})

	tokens = append(tokens, token{"", endOfLine, index, index})

	return tokens, nil
}
