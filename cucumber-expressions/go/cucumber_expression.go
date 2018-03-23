package cucumberexpressions

import (
	"fmt"
	"regexp"
	"strings"
)

type CucumberExpression struct {
	expression     string
	parameterTypes []*ParameterType
	treeRegexp     *TreeRegexp
}

func NewCucumberExpression(expression string, parameterTypeRegistry *ParameterTypeRegistry) (*CucumberExpression, error) {
	ESCAPE_REGEXP := regexp.MustCompile(`([\\^[$.|?*+])`)
	PARAMETER_REGEXP := regexp.MustCompile("{([^}]+)}")
	OPTIONAL_REGEXP := regexp.MustCompile(`(\\\\\\\\)?\([^)]+\)`)
	ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP := regexp.MustCompile(`([^\s^/]+)((\/[^\s^/]+)+)`)

	result := &CucumberExpression{expression: expression}
	parameterTypes := []*ParameterType{}
	r := "^"
	matchOffset := 0

	// Does not include (){} because they have special meaning
	expression = ESCAPE_REGEXP.ReplaceAllString(expression, "\\$1")

	// Create non-capturing, optional capture groups from parenthesis
	expression = OPTIONAL_REGEXP.ReplaceAllStringFunc(expression, func(match string) string {
		if strings.HasPrefix(match, "\\\\\\\\") {
			return fmt.Sprintf(`\(%s\)`, match[5:len(match)-1])
		}
		return fmt.Sprintf("(?:%s)?", match[1:len(match)-1])
	})

	expression = ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP.ReplaceAllStringFunc(expression, func(match string) string {
		return fmt.Sprintf("(?:%s)", strings.Replace(match, "/", "|", -1))
	})

	matches := PARAMETER_REGEXP.FindAllStringSubmatchIndex(expression[matchOffset:], -1)
	for _, indicies := range matches {
		typeName := expression[indicies[2]:indicies[3]]
		parameterType := parameterTypeRegistry.LookupByTypeName(typeName)
		if parameterType == nil {
			return nil, NewUndefinedParameterTypeError(typeName)
		}
		parameterTypes = append(parameterTypes, parameterType)
		text := expression[matchOffset:indicies[0]]
		captureRegexp := buildCaptureRegexp(parameterType.regexps)
		matchOffset = indicies[1]
		r += text
		r += captureRegexp
	}

	r += expression[matchOffset:] + "$"
	result.parameterTypes = parameterTypes
	result.treeRegexp = NewTreeRegexp(regexp.MustCompile(r))
	return result, nil
}

func (c *CucumberExpression) Match(text string) []*Argument {
	return BuildArguments(c.treeRegexp, text, c.parameterTypes)
}

func (c *CucumberExpression) Regexp() *regexp.Regexp {
	return c.treeRegexp.Regexp()
}

func (c *CucumberExpression) Source() string {
	return c.expression
}

func buildCaptureRegexp(regexps []*regexp.Regexp) string {
	if len(regexps) == 1 {
		return fmt.Sprintf("(%s)", regexps[0].String())
	}

	captureGroups := make([]string, len(regexps))
	for i, r := range regexps {
		captureGroups[i] = fmt.Sprintf("(?:%s)", r.String())
	}

	return fmt.Sprintf("(%s)", strings.Join(captureGroups, "|"))
}

// const Argument = require('./argument')
// const TreeRegexp = require('./tree_regexp')
// const { UndefinedParameterTypeError } = require('./errors')
//
// class CucumberExpression {
//   /**
//    * @param expression
//    * @param parameterTypeRegistry
//    */
//   constructor(expression, parameterTypeRegistry) {
//     // Does not include (){} characters because they have special meaning
//     const ESCAPE_REGEXP = /([\\^[$.|?*+])/g
//     const PARAMETER_REGEXP = /{([^}]+)}/g
//     const OPTIONAL_REGEXP = /(\\\\)?\(([^)]+)\)/g
//     const ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = /([^\s^/]+)((\/[^\s^/]+)+)/g
//
//     this._expression = expression
//     this._parameterTypes = []
//     let regexp = '^'
//     let match
//     let matchOffset = 0
//
//     // Does not include (){} because they have special meaning
//
//     expression = expression.replace(ESCAPE_REGEXP, '\\$1')
//
//     // Create non-capturing, optional capture groups from parenthesis
//     expression = expression.replace(
//       OPTIONAL_REGEXP,
//       (match, p1, p2) => (p1 === '\\\\' ? `\\(${p2}\\)` : `(?:${p2})?`)
//     )
//
//     expression = expression.replace(
//       ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP,
//       (_, p1, p2) => `(?:${p1}${p2.replace(/\//g, '|')})`
//     )
//
//     while ((match = PARAMETER_REGEXP.exec(expression)) !== null) {
//       const typeName = match[1]
//
//       const parameterType = parameterTypeRegistry.lookupByTypeName(typeName)
//       if (!parameterType) throw new UndefinedParameterTypeError(typeName)
//       this._parameterTypes.push(parameterType)
//
//       const text = expression.slice(matchOffset, match.index)
//       const captureRegexp = buildCaptureRegexp(parameterType.regexps)
//       matchOffset = PARAMETER_REGEXP.lastIndex
//       regexp += text
//       regexp += captureRegexp
//     }
//     regexp += expression.slice(matchOffset)
//     regexp += '$'
//     this._treeRegexp = new TreeRegexp(regexp)
//   }
//
// }
//
// function buildCaptureRegexp(regexps) {
//   if (regexps.length === 1) {
//     return `(${regexps[0]})`
//   }
//
//   const captureGroups = regexps.map(group => {
//     return `(?:${group})`
//   })
//
//   return `(${captureGroups.join('|')})`
// }
//
// module.exports = CucumberExpression
