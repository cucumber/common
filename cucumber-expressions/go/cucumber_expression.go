package cucumberexpressions

import (
	"fmt"
	"reflect"
	"regexp"
	"strings"
)

const alternativesMayNotBeEmpty = "Alternatives may not be empty: %s"
const parameterTypesCanNotBeAlternative = "Parameter types cannot be alternative: %s"

var escapeRegexp = regexp.MustCompile(`([\\^[({$.|?*+})\]])`)
var parameterRegexp = regexp.MustCompile(`(\\\\\\\\)?{([^}]*)}`)
var optionalRegexp = regexp.MustCompile(`(\\\\\\\\)?\([^)]+\)`)
var alternativeNonWhitespaceTextRegexp = regexp.MustCompile(`([^\s^/]+)((/[^\s^/]+)+)`)

const doubleEscape = `\\`
const parameterTypesCanNotBeOptional = "Parameter types cannot be optional: %s"

type tokenType int

const (
	text        tokenType = 0
	optional    tokenType = 1
	alternation tokenType = 2
	parameter   tokenType = 3
)

type token struct {
	text      string
	tokenType tokenType
}

type CucumberExpression struct {
	source                string
	parameterTypes        []*ParameterType
	treeRegexp            *TreeRegexp
	parameterTypeRegistry *ParameterTypeRegistry
}

func NewCucumberExpression(expression string, parameterTypeRegistry *ParameterTypeRegistry) (Expression, error) {
	result := &CucumberExpression{source: expression, parameterTypeRegistry: parameterTypeRegistry}

	tokens := make([]token, 1)
	tokens = append(tokens, token{expression, text})

	tokens, err := result.processOptional(tokens)
	if err != nil {
		return nil, err
	}

	tokens, err = result.processAlteration(tokens)
	if err != nil {
		return nil, err
	}

	tokens, err = result.processParameters(tokens, parameterTypeRegistry)
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
	return escapeRegexp.ReplaceAllString(expression, `\$1`)
}

func (c *CucumberExpression) processOptional(expression []token) ([]token, error) {
	var err error
	result := splitTextTokens(expression, optionalRegexp, func(match string) (token) {
		// look for double-escaped parentheses
		if strings.HasPrefix(match, doubleEscape) {
			return token{fmt.Sprintf(`(%s)`, match[5:len(match)-1]), text}
		}
		if parameterRegexp.MatchString(match) {
			err = NewCucumberExpressionError(fmt.Sprintf(parameterTypesCanNotBeOptional, c.source))
		}
		return token{fmt.Sprintf("(?:%s)?", match[1:len(match)-1]), optional}
	})
	return result, err
}

func (c *CucumberExpression) processAlteration(expression []token) ([]token, error) {
	var err error
	result := splitTextTokens(expression, alternativeNonWhitespaceTextRegexp, func(match string) token {
		// replace \/ with /
		// replace / with |
		replacement := strings.Replace(match, "/", "|", -1)
		replacement = strings.Replace(replacement, `\\\\|`, "/", -1)

		if !strings.Contains(replacement, "|") {
			// All / were escaped
			return token{replacement, text}
		}

		// Make sure the alternative parts aren't empty and don't contain parameter types
		parts := strings.Split(replacement, "|")

		if len(parts) == 0 {
			err = NewCucumberExpressionError(fmt.Sprintf(alternativesMayNotBeEmpty, c.source))
		}
		for _, part := range parts {
			if len(part) == 0 {
				err = NewCucumberExpressionError(fmt.Sprintf(alternativesMayNotBeEmpty, c.source))
			}
			if parameterRegexp.MatchString(part) {
				err = NewCucumberExpressionError(fmt.Sprintf(parameterTypesCanNotBeAlternative, c.source))
			}
		}
		return token{fmt.Sprintf("(?:%s)", replacement), alternation}

	})
	return result, err
}

func (c *CucumberExpression) processParameters(expression []token, parameterTypeRegistry *ParameterTypeRegistry) ([]token, error) {
	var err error
	result := splitTextTokens(expression, alternativeNonWhitespaceTextRegexp, func(match string) token {
		if strings.HasPrefix(match, doubleEscape) {
			return token{fmt.Sprintf(`{%s}`, match[5:len(match)-1]), text}
		}
		typeName := match[1 : len(match)-1]
		err = CheckParameterTypeName(typeName)
		if err != nil {
			return token{match, parameter}
		}
		parameterType := parameterTypeRegistry.LookupByTypeName(typeName)
		if parameterType == nil {
			err = NewUndefinedParameterTypeError(typeName)
			return token{match, parameter}
		}
		c.parameterTypes = append(c.parameterTypes, parameterType)
		return token{buildCaptureRegexp(parameterType.regexps), parameter}
	})
	return result, err
}

func splitTextTokens(tokens []token, regexp *regexp.Regexp, processor func(string) (token)) ([]token) {
	newTokens := make([]token, len(tokens))
	for _, token := range tokens {
		if token.tokenType != text {
			newTokens = append(newTokens, token)
			continue
		}
		regexp.FindAllStringSubmatchIndex()
			//TODO: You wer here.
	}


	return newTokens
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
