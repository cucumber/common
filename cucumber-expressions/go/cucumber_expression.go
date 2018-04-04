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

func (c *CucumberExpression) Match(text string) ([]*Argument, error) {
	return BuildArguments(c.treeRegexp, text, c.parameterTypes), nil
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
