package cucumberexpressions

import (
	"sort"
	"strings"
)

type CucumberExpressionGenerator struct {
	parameterTypeRegistry *ParameterTypeRegistry
}

func NewCucumberExpressionGenerator(parameterTypeRegistry *ParameterTypeRegistry) *CucumberExpressionGenerator {
	return &CucumberExpressionGenerator{
		parameterTypeRegistry: parameterTypeRegistry,
	}
}

func (c *CucumberExpressionGenerator) GenerateExpressions(text string) []*GeneratedExpression {
	parameterTypeCombinations := [][]*ParameterType{}
	parameterTypeMatchers := c.createParameterTypeMatchers(text)
	expressionTemplate := ""
	pos := 0

	for {
		matchingParameterTypeMatchers := []*ParameterTypeMatcher{}
		for _, parameterTypeMatcher := range parameterTypeMatchers {
			advancedParameterTypeMatcher := parameterTypeMatcher.AdvanceTo(pos)
			if advancedParameterTypeMatcher.Find() {
				matchingParameterTypeMatchers = append(matchingParameterTypeMatchers, advancedParameterTypeMatcher)
			}
		}
		if len(matchingParameterTypeMatchers) > 0 {
			sort.Slice(matchingParameterTypeMatchers, func(i int, j int) bool {
				return CompareParameterTypeMatchers(matchingParameterTypeMatchers[i], matchingParameterTypeMatchers[j]) <= 0
			})

			// Find all the best parameter type matchers, they are all candidates.
			bestParameterTypeMatcher := matchingParameterTypeMatchers[0]
			bestParameterTypeMatchers := []*ParameterTypeMatcher{}
			for _, parameterTypeMatcher := range matchingParameterTypeMatchers {
				if CompareParameterTypeMatchers(parameterTypeMatcher, bestParameterTypeMatcher) == 0 {
					bestParameterTypeMatchers = append(bestParameterTypeMatchers, parameterTypeMatcher)
				}
			}

			// Build a list of parameter types without duplicates. The reason there
			// might be duplicates is that some parameter types have more than one regexp,
			// which means multiple ParameterTypeMatcher objects will have a reference to the
			// same ParameterType.
			// We're sorting the list so preferential parameter types are listed first.
			// Users are most likely to want these, so they should be listed at the top.
			parameterTypesMap := map[*ParameterType]bool{}
			for _, parameterTypeMatcher := range bestParameterTypeMatchers {
				parameterTypesMap[parameterTypeMatcher.parameterType] = true
			}
			parameterTypes := []*ParameterType{}
			for parameterType := range parameterTypesMap {
				parameterTypes = append(parameterTypes, parameterType)
			}
			sort.Slice(parameterTypes, func(i int, j int) bool {
				return CompareParameterTypes(parameterTypes[i], parameterTypes[j]) <= 0
			})

			parameterTypeCombinations = append(parameterTypeCombinations, parameterTypes)
			expressionTemplate += escape(text[pos:bestParameterTypeMatcher.Start()]) + "{%s}"
			pos = bestParameterTypeMatcher.Start() + len(bestParameterTypeMatcher.Group())
		} else {
			break
		}

		if pos > len(text) {
			break
		}
	}
	expressionTemplate += escape(text[pos:])
	return NewCombinatorialGeneratedExpressionFactory(expressionTemplate, parameterTypeCombinations).GenerateExpressions()
}

func (c *CucumberExpressionGenerator) createParameterTypeMatchers(text string) []*ParameterTypeMatcher {
	result := []*ParameterTypeMatcher{}
	for _, parameterType := range c.parameterTypeRegistry.ParamaterTypes() {
		if parameterType.UseForSnippets() {
			result = append(result, c.createParameterTypeMatchers2(parameterType, text)...)
		}
	}
	return result
}

func (c *CucumberExpressionGenerator) createParameterTypeMatchers2(parameterType *ParameterType, text string) []*ParameterTypeMatcher {
	result := make([]*ParameterTypeMatcher, len(parameterType.Regexps()))
	for i, r := range parameterType.Regexps() {
		result[i] = NewParameterTypeMatcher(parameterType, r, text, 0)
	}
	return result
}

func escape(s string) string {
	result := strings.Replace(s, "%", "%%", -1)
	result = strings.Replace(result, `(`, `\(`, -1)
	return strings.Replace(result, `{`, `\{`, -1)
}
