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
			expressionTemplate += escapeForUtilFormat(text[pos:bestParameterTypeMatcher.Start()]) + "{%s}"
			pos = bestParameterTypeMatcher.Start() + len(bestParameterTypeMatcher.Group())
		} else {
			break
		}

		if pos > len(text) {
			break
		}
	}
	expressionTemplate += escapeForUtilFormat(text[pos:])
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

func escapeForUtilFormat(s string) string {
	return strings.Replace(s, "%", "%%", -1)
}

// const util = require('util')
// const ParameterTypeMatcher = require('./parameter_type_matcher')
// const ParameterType = require('./parameter_type')
// const CombinatorialGeneratedExpressionFactory = require('./combinatorial_generated_expression_factory')
//
// class CucumberExpressionGenerator {
//   constructor(parameterTypeRegistry) {
//     this._parameterTypeRegistry = parameterTypeRegistry
//   }
//
//   generateExpressions(text) {
//     const parameterTypeCombinations = []
//     const parameterTypeMatchers = this._createParameterTypeMatchers(text)
//     let expressionTemplate = ''
//     let pos = 0
//
//     // eslint-disable-next-line no-constant-condition
//     while (true) {
//       let matchingParameterTypeMatchers = []
//
//       for (const parameterTypeMatcher of parameterTypeMatchers) {
//         const advancedParameterTypeMatcher = parameterTypeMatcher.advanceTo(pos)
//         if (advancedParameterTypeMatcher.find) {
//           matchingParameterTypeMatchers.push(advancedParameterTypeMatcher)
//         }
//       }
//
//       if (matchingParameterTypeMatchers.length > 0) {
//         matchingParameterTypeMatchers = matchingParameterTypeMatchers.sort(
//           ParameterTypeMatcher.compare
//         )
//
//         // Find all the best parameter type matchers, they are all candidates.
//         const bestParameterTypeMatcher = matchingParameterTypeMatchers[0]
//         const bestParameterTypeMatchers = matchingParameterTypeMatchers.filter(
//           m => ParameterTypeMatcher.compare(m, bestParameterTypeMatcher) === 0
//         )
//
//         // Build a list of parameter types without duplicates. The reason there
//         // might be duplicates is that some parameter types have more than one regexp,
//         // which means multiple ParameterTypeMatcher objects will have a reference to the
//         // same ParameterType.
//         // We're sorting the list so preferential parameter types are listed first.
//         // Users are most likely to want these, so they should be listed at the top.
//         let parameterTypes = []
//         for (const parameterTypeMatcher of bestParameterTypeMatchers) {
//           if (
//             parameterTypes.indexOf(parameterTypeMatcher.parameterType) === -1
//           ) {
//             parameterTypes.push(parameterTypeMatcher.parameterType)
//           }
//         }
//         parameterTypes = parameterTypes.sort(ParameterType.compare)
//
//         parameterTypeCombinations.push(parameterTypes)
//
//         expressionTemplate += escapeForUtilFormat(
//           text.slice(pos, bestParameterTypeMatcher.start)
//         )
//         expressionTemplate += '{%s}'
//
//         pos =
//           bestParameterTypeMatcher.start + bestParameterTypeMatcher.group.length
//       } else {
//         break
//       }
//
//       if (pos >= text.length) {
//         break
//       }
//     }
//
//     expressionTemplate += escapeForUtilFormat(text.slice(pos))
//     return new CombinatorialGeneratedExpressionFactory(
//       expressionTemplate,
//       parameterTypeCombinations
//     ).generateExpressions()
//   }
//
//   /**
//    * @deprecated
//    */
//   generateExpression(text) {
//     return util.deprecate(
//       () => this.generateExpressions(text)[0],
//       'CucumberExpressionGenerator.generateExpression: Use CucumberExpressionGenerator.generateExpressions instead'
//     )()
//   }
//
//   _createParameterTypeMatchers(text) {
//     let parameterMatchers = []
//     for (const parameterType of this._parameterTypeRegistry.parameterTypes) {
//       if (parameterType.useForSnippets) {
//         parameterMatchers = parameterMatchers.concat(
//           this._createParameterTypeMatchers2(parameterType, text)
//         )
//       }
//     }
//     return parameterMatchers
//   }
//
//   _createParameterTypeMatchers2(parameterType, text) {
//     // TODO: [].map
//     const result = []
//     for (const regexp of parameterType.regexps) {
//       result.push(new ParameterTypeMatcher(parameterType, regexp, text))
//     }
//     return result
//   }
// }
//
// function escapeForUtilFormat(s) {
//   return s.replace(/%/g, '%%')
// }
//
// module.exports = CucumberExpressionGenerator
