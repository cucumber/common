package cucumberexpressions

import (
	"fmt"
	"reflect"
	"regexp"
	"strings"
)

const alternativesMayNotBeEmpty = "Alternative may not be empty: %s"
const parameterTypesCanNotBeAlternative = "Parameter types cannot be alternative: %s"
const parameterTypesCanNotBeOptional = "Parameter types cannot be optional: %s"

var escapeRegexp = regexp.MustCompile(`([\\^\[({$.|?*+})\]])`)
var parameterRegexp = regexp.MustCompile(`(\\)?{([^}]*)}`)
var optionalRegexp = regexp.MustCompile(`(\\)?\([^)]+\)`)
var alternativeNonWhitespaceTextRegexp = regexp.MustCompile(`([^\s/]*)((/[^\s/]*)+)`)

const doubleEscape = `\`

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

	tokens := make([]token, 0)
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

	pattern := result.escapeTextTokensAndJoin(tokens, "^", "$")
	result.treeRegexp = NewTreeRegexp(regexp.MustCompile(pattern))
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

func (c *CucumberExpression) escapeTextTokensAndJoin(expression []token, prefix string, suffix string) string {
	var builder strings.Builder
	builder.WriteString(prefix)
	for _, token := range expression {
		if token.tokenType == text {
			builder.WriteString(c.processEscapes(token.text))
		} else {
			builder.WriteString(token.text)
		}
	}
	builder.WriteString(suffix)
	return builder.String()
}

func (c *CucumberExpression) processEscapes(expression string) string {
	// This will cause explicitly-escaped parentheses to be double-escaped
	return escapeRegexp.ReplaceAllString(expression, `\$1`)
}

func (c *CucumberExpression) processOptional(expression []token) ([]token, error) {
	var err error
	result := splitTextTokens(expression, optionalRegexp, func(match string) (token) {
		// look for double-escaped parentheses
		if strings.HasPrefix(match, doubleEscape) {
			return token{fmt.Sprintf(`(%s)`, match[2:len(match)-1]), text}
		}
		if parameterRegexp.MatchString(match) {
			err = NewCucumberExpressionError(fmt.Sprintf(parameterTypesCanNotBeOptional, c.source))
		}
		optionalText := c.processEscapes(match[1 : len(match)-1])
		return token{fmt.Sprintf("(?:%s)?", optionalText), optional}
	})
	return result, err
}

func (c *CucumberExpression) processAlteration(expression []token) ([]token, error) {
	var err error
	result := splitTextTokens(expression, alternativeNonWhitespaceTextRegexp, func(match string) token {
		// replace \/ with /
		// replace / with |
		replacement := strings.Replace(match, "/", "|", -1)
		replacement = strings.Replace(replacement, `\|`, "/", -1)

		if !strings.Contains(replacement, "|") {
			// All / were escaped
			return token{replacement, text}
		}

		// Make sure the alternative alternatives aren't empty and don't contain parameter types
		alternatives := strings.Split(replacement, "|")
		alternativeTexts := make([]string,0)
		if len(alternatives) == 0 {
			err = NewCucumberExpressionError(fmt.Sprintf(alternativesMayNotBeEmpty, c.source))
		}
		for _, alternative := range alternatives {
			if len(alternative) == 0 {
				err = NewCucumberExpressionError(fmt.Sprintf(alternativesMayNotBeEmpty, c.source))
			}
			if parameterRegexp.MatchString(alternative) {
				err = NewCucumberExpressionError(fmt.Sprintf(parameterTypesCanNotBeAlternative, c.source))
			}
			alternativeTexts = append(alternativeTexts, c.processEscapes(alternative))
		}
		alternativeText := strings.Join(alternativeTexts, "|")
		return token{fmt.Sprintf("(?:%s)", alternativeText), alternation}
	})
	return result, err
}

func (c *CucumberExpression) processParameters(expression []token, parameterTypeRegistry *ParameterTypeRegistry) ([]token, error) {
	var err error
	result := splitTextTokens(expression, parameterRegexp, func(match string) token {
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

func splitTextTokens(tokens []token, regexp *regexp.Regexp, processor func(string) token) []token {
	newTokens := make([]token, 0)
	for _, t := range tokens {
		if t.tokenType != text {
			newTokens = append(newTokens, t)
			continue
		}
		expression := t.text
		loc := regexp.FindAllStringIndex(expression, -1)
		previousEnd := 0
		for i := 0; i < len(loc); i++ {
			start := loc[i][0]
			end := loc[i][1]
			prefix := expression[previousEnd:start]
			if len(prefix) > 0 {
				newTokens = append(newTokens, token{prefix, text})
			}
			match := expression[start:end]
			newTokens = append(newTokens, processor(match))
			previousEnd = end
		}
		suffix := expression[previousEnd:]
		if len(suffix) > 0 {
			newTokens = append(newTokens, token{suffix, text})
		}
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
