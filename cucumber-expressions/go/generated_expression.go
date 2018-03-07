package cucumberexpressions

import "fmt"

type GeneratedExpression struct {
	expressionTemplate string
	parameterTypes     []*ParameterType
}

func NewGeneratedExpression(expressionTemplate string, parameterTypes []*ParameterType) *GeneratedExpression {
	return &GeneratedExpression{
		expressionTemplate: expressionTemplate,
		parameterTypes:     parameterTypes,
	}
}

func (g *GeneratedExpression) Source() string {
	names := make([]interface{}, len(g.parameterTypes))
	for i, p := range g.parameterTypes {
		names[i] = p.Name()
	}
	return fmt.Sprintf(g.expressionTemplate, names...)
}

func (g *GeneratedExpression) ParameterNames() []string {
	usageByTypeName := map[string]int{}
	result := make([]string, len(g.parameterTypes))
	for i, p := range g.parameterTypes {
		result[i] = getParameterName(p.Name(), usageByTypeName)
	}
	return result
}

func (g *GeneratedExpression) ParameterTypes() []*ParameterType {
	return g.parameterTypes
}

func getParameterName(typeName string, usageByTypeName map[string]int) string {
	count, ok := usageByTypeName[typeName]
	if !ok {
		count = 0
	}
	usageByTypeName[typeName] = count + 1
	if count == 1 {
		return typeName
	}
	return fmt.Sprintf("%s%d", typeName, count)
}
