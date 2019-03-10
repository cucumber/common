package cucumberexpressions

// 256 generated expressions ought to be enough for anybody
const maxExpressions = 256

type CombinatorialGeneratedExpressionFactory struct {
	expressionTemplate        string
	parameterTypeCombinations [][]*ParameterType
}

func NewCombinatorialGeneratedExpressionFactory(expressionTemplate string, parameterTypeCombinations [][]*ParameterType) *CombinatorialGeneratedExpressionFactory {
	return &CombinatorialGeneratedExpressionFactory{
		expressionTemplate:        expressionTemplate,
		parameterTypeCombinations: parameterTypeCombinations,
	}
}

func (c *CombinatorialGeneratedExpressionFactory) GenerateExpressions() []*GeneratedExpression {
	generatedExpressions := &GeneratedExpressionList{}
	c.generatePermutations(generatedExpressions, 0, nil)
	return generatedExpressions.ToArray()
}

func (c *CombinatorialGeneratedExpressionFactory) generatePermutations(generatedExpressions *GeneratedExpressionList, depth int, currentParameterTypes []*ParameterType) {
	if len(generatedExpressions.elements) >= maxExpressions {
		return
	}

	if depth == len(c.parameterTypeCombinations) {
		generatedExpressions.Push(
			NewGeneratedExpression(c.expressionTemplate, currentParameterTypes),
		)
		return
	}

	for _, parameterType := range c.parameterTypeCombinations[depth] {
		// Avoid recursion if no elements can be added.
		if len(generatedExpressions.elements) >= maxExpressions {
			return
		}

		c.generatePermutations(
			generatedExpressions,
			depth+1,
			append(currentParameterTypes, parameterType),
		)
	}
}

type GeneratedExpressionList struct {
	elements []*GeneratedExpression
}

func (g *GeneratedExpressionList) Push(expr *GeneratedExpression) {
	g.elements = append(g.elements, expr)
}

func (g *GeneratedExpressionList) ToArray() []*GeneratedExpression {
	return g.elements
}
