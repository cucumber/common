package cucumberexpressions

type tokenizer func(expression string, current int) (int, token)

func tokenize(expression string) ([]token, error) {
	tokens := make([]token, 0)

	return tokens, nil
}
