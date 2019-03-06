package cucumberexpressions

import (
	"fmt"
	"reflect"
	"regexp"
	"strings"
)

var ESCAPE_REGEXP = regexp.MustCompile(`([\\^[$.|?*+])`)
var PARAMETER_REGEXP = regexp.MustCompile(`(\\\\\\\\)?{([^}]*)}`)
var OPTIONAL_REGEXP = regexp.MustCompile(`(\\\\\\\\)?\([^)]+\)`)
var ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = regexp.MustCompile(`([^\s^/]+)((/[^\s^/]+)+)`)
var DOUBLE_ESCAPE = `\\\\`
var PAREN_WRAPPED_PARAMETER = regexp.MustCompile(`\\\\\({.+}\)`)

type CucumberExpression struct {
	source                string
	parameterTypes        []*ParameterType
	treeRegexp            *TreeRegexp
	parameterTypeRegistry *ParameterTypeRegistry
}

func NewCucumberExpression(expression string, parameterTypeRegistry *ParameterTypeRegistry) (*CucumberExpression, error) {
	result := &CucumberExpression{source: expression, parameterTypeRegistry: parameterTypeRegistry}

	expression = result.processEscapes(expression)

	expression, err := result.processOptional(expression)
	if err != nil {
		return nil, err
	}

	expression, err = result.processAlteration(expression)
	if err != nil {
		return nil, err
	}

	expression, err = result.processParameters(expression, parameterTypeRegistry)
	if err != nil {
		return nil, err
	}

	expression = "^" + expression + "$"

	result.treeRegexp = NewTreeRegexp(regexp.MustCompile(expression))
	return result, nil
}

func (c *CucumberExpression) Match(text string, typeHints ...reflect.Type) ([]*Argument, error) {
	parameterTypes := make([]*ParameterType, len(c.parameterTypes))
	copy(parameterTypes, c.parameterTypes)
	for i := 0; i < len(parameterTypes); i++ {
		if parameterTypes[i].isAnonymous() {
			typeHint := hintOrDefault(i, typeHints...)
			parameterType, err := parameterTypes[i].deAnonymize(typeHint, c.objectMapperTransformer(typeHint))
			if err != nil {
				return nil, err
			}
			parameterTypes[i] = parameterType
		}
	}
	return BuildArguments(c.treeRegexp, text, parameterTypes), nil
}

func hintOrDefault(i int, typeHints ...reflect.Type) reflect.Type {
	typeHint := reflect.TypeOf("")
	if i < len(typeHints) {
		typeHint = typeHints[i]
	}
	return typeHint
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

func (c *CucumberExpression) processOptional(expression string) (string, error) {
	var err error
	result := OPTIONAL_REGEXP.ReplaceAllStringFunc(expression, func(match string) string {
		if PARAMETER_REGEXP.MatchString(match) && !PAREN_WRAPPED_PARAMETER.MatchString(match) {
			err = NewCucumberExpressionError(fmt.Sprintf("Parameter types cannot be optional: %s", c.source))
			return match
		}

		if strings.HasPrefix(match, DOUBLE_ESCAPE) {
			return fmt.Sprintf(`\(%s\)`, match[5:len(match)-1])
		}
		return fmt.Sprintf("(?:%s)?", match[1:len(match)-1])
	})
	return result, err
}

func (c *CucumberExpression) processAlteration(expression string) (string, error) {
	var err error
	result := ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP.ReplaceAllStringFunc(expression, func(match string) string {
		// replace \/ with /
		// replace / with |
		replacement := strings.Replace(match, "/", "|", -1)
		replacement = strings.Replace(replacement, `\\\\|`, "/", -1)

		if strings.Contains(replacement, "|") {
			parts := strings.Split(replacement, ":")
			for _, part := range parts {
				if PARAMETER_REGEXP.MatchString(part) {
					err = NewCucumberExpressionError(fmt.Sprintf("Parameter types cannot be alternative: %s", c.source))
					return match
				}
			}
			return fmt.Sprintf("(?:%s)", replacement)
		} else {
			return replacement
		}
	})
	return result, err
}

func (c *CucumberExpression) processParameters(expression string, parameterTypeRegistry *ParameterTypeRegistry) (string, error) {
	var err error
	result := PARAMETER_REGEXP.ReplaceAllStringFunc(expression, func(match string) string {
		if strings.HasPrefix(match, DOUBLE_ESCAPE) {
			return fmt.Sprintf(`\{%s\}`, match[5:len(match)-1])
		}

		typeName := match[1 : len(match)-1]
		err = CheckParameterTypeName(typeName)
		if err != nil {
			return ""
		}
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
func (r *CucumberExpression) objectMapperTransformer(typeHint reflect.Type) func(args ...*string) interface{} {
	return func(args ...*string) interface{} {
		i, err := r.parameterTypeRegistry.defaultTransformer.Transform(*args[0], typeHint)
		if err != nil {
			panic(err)
		}
		return i
	}
}
