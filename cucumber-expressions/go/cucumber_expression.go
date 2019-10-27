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
var parameterRegexp = regexp.MustCompile(`((?:\\){0,2}){([^}]*)}`)
var optionalRegexp = regexp.MustCompile(`((?:\\){0,2})\(([^)]+)\)`)
var alternativeNonWhitespaceTextRegexp = regexp.MustCompile(`([^\s/]*)((/[^\s/]*)+)`)

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

	tokens := []token{{expression, text}}

	tokens, err := result.processOptional(tokens)
	if err != nil {
		return nil, err
	}

	tokens, err = result.processAlternation(tokens)
	if err != nil {
		return nil, err
	}

	tokens, err = result.processParameters(tokens, parameterTypeRegistry)
	if err != nil {
		return nil, err
	}

	pattern := result.escapeRegexAndJoin(tokens, "^", "$")
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

func (c *CucumberExpression) escapeRegexAndJoin(expression []token, prefix string, suffix string) string {
	var builder strings.Builder
	builder.WriteString(prefix)
	for _, token := range expression {
		if token.tokenType == text {
			builder.WriteString(c.escapeRegex(token.text))
		} else {
			builder.WriteString(token.text)
		}
	}
	builder.WriteString(suffix)
	return builder.String()
}

func (c *CucumberExpression) escapeRegex(expression string) string {
	return escapeRegexp.ReplaceAllString(expression, `\$1`)
}

func (c *CucumberExpression) processOptional(expression []token) ([]token, error) {
	var err error
	result := splitTextTokens(expression, optionalRegexp, func(match []string) (token) {
		// look for single-escaped parentheses
		optionalPart := match[2]
		escapes := match[1]
		if len(escapes) == 1 {
			return token{fmt.Sprintf(`(%s)`, optionalPart), text}
		}
		if parameterRegexp.MatchString(optionalPart) {
			err = NewCucumberExpressionError(fmt.Sprintf(parameterTypesCanNotBeOptional, c.source))
		}
		// either no or double escape
		return token{fmt.Sprintf("%s(?:%s)?", escapes, optionalPart), optional}
	})
	return result, err
}

func (c *CucumberExpression) processAlternation(expression []token) ([]token, error) {
	var err error
	result := splitTextTokens(expression, alternativeNonWhitespaceTextRegexp, func(match []string) token {
		// replace \/ with /
		// replace / with |
		replacement := strings.Replace(match[0], "/", "|", -1)
		replacement = strings.Replace(replacement, `\|`, "/", -1)

		if !strings.Contains(replacement, "|") {
			// All / were escaped
			return token{replacement, text}
		}

		// Make sure the alternative alternatives aren't empty and don't contain parameter types
		alternatives := strings.Split(replacement, "|")
		if len(alternatives) == 0 {
			err = NewCucumberExpressionError(fmt.Sprintf(alternativesMayNotBeEmpty, c.source))
		}
		alternativeTexts := make([]string, len(alternatives))
		for i, alternative := range alternatives {
			if len(alternative) == 0 {
				err = NewCucumberExpressionError(fmt.Sprintf(alternativesMayNotBeEmpty, c.source))
			}
			if parameterRegexp.MatchString(alternative) {
				err = NewCucumberExpressionError(fmt.Sprintf(parameterTypesCanNotBeAlternative, c.source))
			}
			alternativeTexts[i] = c.escapeRegex(alternative)
		}
		alternativeText := strings.Join(alternativeTexts, "|")
		return token{fmt.Sprintf("(?:%s)", alternativeText), alternation}
	})
	return result, err
}

func (c *CucumberExpression) processParameters(expression []token, parameterTypeRegistry *ParameterTypeRegistry) ([]token, error) {
	var err error
	result := splitTextTokens(expression, parameterRegexp, func(match []string) token {
		typeName := match[2]
		escapes := match[1]
		// look for single-escaped parentheses
		if len(escapes) == 1 {
			return token{fmt.Sprintf(`{%s}`, typeName), text}
		}
		err = CheckParameterTypeName(typeName)
		if err != nil {
			return token{typeName, parameter}
		}
		parameterType := parameterTypeRegistry.LookupByTypeName(typeName)
		if parameterType == nil {
			err = NewUndefinedParameterTypeError(typeName)
			return token{typeName, parameter}
		}
		c.parameterTypes = append(c.parameterTypes, parameterType)
		// either no or double escape
		return token{escapes + buildCaptureRegexp(parameterType.regexps), parameter}
	})
	return result, err
}

func splitTextTokens(tokens []token, regexp *regexp.Regexp, processor func([]string) token) []token {
	// Guesstimate: When a match is found this splitTextTokens will at a minimum
	// create 2 additional tokens. Adding 8 additional capacity allows for a few
	// more
	newTokens := make([]token, 0, len(tokens)+8)
	for _, t := range tokens {
		if t.tokenType != text {
			newTokens = append(newTokens, t)
			continue
		}
		expression := t.text
		locations := regexp.FindAllStringIndex(expression, -1)
		groups := regexp.FindAllStringSubmatch(expression, -1)
		previousEnd := 0
		for i := 0; i < len(locations); i++ {
			start := locations[i][0]
			end := locations[i][1]
			prefix := expression[previousEnd:start]
			newTokens = append(newTokens, token{prefix, text})
			newTokens = append(newTokens, processor(groups[i]))
			previousEnd = end
		}
		suffix := expression[previousEnd:]
		newTokens = append(newTokens, token{suffix, text})
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
