package cucumberexpressions

import (
	"fmt"
	"regexp"
	"strings"
)

var ESCAPE_REGEXP = regexp.MustCompile(`([\\^[$.|?*+])`)
var PARAMETER_REGEXP = regexp.MustCompile(`(\\\\\\\\)?{([^}]+)}`)
var OPTIONAL_REGEXP = regexp.MustCompile(`(\\\\\\\\)?\([^)]+\)`)
var ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = regexp.MustCompile(`([^\s^/]+)((\/[^\s^/]+)+)`)
var DOUBLE_ESCAPE = `\\\\`

type CucumberExpression struct {
	source         string
	parameterTypes []*ParameterType
	treeRegexp     *TreeRegexp
}

func NewCucumberExpression(expression string, parameterTypeRegistry *ParameterTypeRegistry) (*CucumberExpression, error) {
	result := &CucumberExpression{source: expression}

	expression = result.processEscapes(expression)
	expression = result.processOptional(expression)
	expression = result.processAlteration(expression)
	expression, err := result.processParameters(expression, parameterTypeRegistry)
	if err != nil {
		return nil, err
	}
	expression = "^" + expression + "$"

	result.treeRegexp = NewTreeRegexp(regexp.MustCompile(expression))
	return result, nil
}

func (c *CucumberExpression) Match(text string) ([]*Argument, error) {
	return BuildArguments(c.treeRegexp, text, c.parameterTypes), nil
}

func (c *CucumberExpression) Regexp() *regexp.Regexp {
	return c.treeRegexp.Regexp()
}

func (c *CucumberExpression) Source() string {
	return c.source
}

func (c *CucumberExpression) processEscapes(expression string) string {
	return ESCAPE_REGEXP.ReplaceAllString(expression, `\$1`)
}

func (c *CucumberExpression) processOptional(expression string) string {
	return OPTIONAL_REGEXP.ReplaceAllStringFunc(expression, func(match string) string {
		if strings.HasPrefix(match, DOUBLE_ESCAPE) {
			return fmt.Sprintf(`\(%s\)`, match[5:len(match)-1])
		}
		return fmt.Sprintf("(?:%s)?", match[1:len(match)-1])
	})
}

func (c *CucumberExpression) processAlteration(expression string) string {
	return ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP.ReplaceAllStringFunc(expression, func(match string) string {
		// replace \/ with /
		// replace / with |
		replacement := strings.Replace(match, "/", "|", -1)
		replacement = strings.Replace(replacement, `\\\\|`, "/", -1)
		return fmt.Sprintf("(?:%s)", replacement)
	})
}

func (c *CucumberExpression) processParameters(expression string, parameterTypeRegistry *ParameterTypeRegistry) (string, error) {
	var err error
	result := PARAMETER_REGEXP.ReplaceAllStringFunc(expression, func(match string) string {
		if strings.HasPrefix(match, DOUBLE_ESCAPE) {
			return fmt.Sprintf(`\{%s\}`, match[5:len(match)-1])
		}

		typeName := match[1 : len(match)-1]
		parameterType := parameterTypeRegistry.LookupByTypeName(typeName)
		if parameterType == nil {
			err = NewUndefinedParameterTypeError(typeName)
			return match
		}
		c.parameterTypes = append(c.parameterTypes, parameterType)
		return buildCaptureRegexp(parameterType.regexps)
	})
	return result, err
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
