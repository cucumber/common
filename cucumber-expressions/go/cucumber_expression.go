package cucumberexpressions

import (
	"fmt"
	"reflect"
	"regexp"
	"strings"
)

var escapeRegexp = regexp.MustCompile(`([\\^\[({$.|?*+})\]])`)

type CucumberExpression struct {
	source                string
	parameterTypes        []*ParameterType
	treeRegexp            *TreeRegexp
	parameterTypeRegistry *ParameterTypeRegistry
}

func NewCucumberExpression(expression string, parameterTypeRegistry *ParameterTypeRegistry) (Expression, error) {
	result := &CucumberExpression{source: expression, parameterTypeRegistry: parameterTypeRegistry}

	ast, err := parse(expression)
	if err != nil {
		return nil, err
	}

	pattern, err := result.rewriteNodeToRegex(ast)
	if err != nil {
		return nil, err
	}
	result.treeRegexp = NewTreeRegexp(regexp.MustCompile(pattern))
	return result, nil
}

func (c *CucumberExpression) rewriteNodeToRegex(node node) (string, error) {
	switch node.NodeType {
	case textNode:
		return c.processEscapes(node.Token), nil
	case optionalNode:
		return c.rewriteOptional(node)
	case alternationNode:
		return c.rewriteAlternation(node)
	case alternativeNode:
		return c.rewriteAlternative(node)
	case parameterNode:
		return c.rewriteParameter(node)
	case expressionNode:
		return c.rewriteExpression(node)
	default:
		// Can't happen as long as the switch case is exhaustive
		return "", NewCucumberExpressionError(fmt.Sprintf("Could not rewrite %s", c.source))
	}
}

func (c *CucumberExpression) processEscapes(expression string) string {
	return escapeRegexp.ReplaceAllString(expression, `\$1`)
}

func (c *CucumberExpression) rewriteOptional(node node) (string, error) {
	err := c.assertNoParameters(node, c.createParameterIsNotAllowedInOptional())
	if err != nil {
		return "", err
	}
	err = c.assertNoOptionals(node, c.createOptionalIsNotAllowedInOptional())
	if err != nil {
		return "", err
	}
	err = c.assertNotEmpty(node, c.createOptionalMayNotBeEmpty())
	if err != nil {
		return "", err
	}
	return c.rewriteNodesToRegex(node.Nodes, "", "(?:", ")?")
}

func (c *CucumberExpression) createParameterIsNotAllowedInOptional() func(node) error {
	return func(node node) error {
		return createParameterIsNotAllowedInOptional(node, c.source)
	}
}

func (c *CucumberExpression) createOptionalIsNotAllowedInOptional() func(node) error {
	return func(node node) error {
		return createOptionalIsNotAllowedInOptional(node, c.source)
	}
}

func (c *CucumberExpression) createOptionalMayNotBeEmpty() func(node) error {
	return func(node node) error {
		return createOptionalMayNotBeEmpty(node, c.source)
	}
}

func (c *CucumberExpression) rewriteAlternation(node node) (string, error) {
	// Make sure the alternative parts aren't empty and don't contain parameter types
	for _, alternative := range node.Nodes {
		if len(alternative.Nodes) == 0 {
			return "", createAlternativeMayNotBeEmpty(alternative, c.source)
		}
		err := c.assertNotEmpty(alternative, c.createAlternativeMayNotExclusivelyContainOptionals())
		if err != nil {
			return "", err
		}
	}
	return c.rewriteNodesToRegex(node.Nodes, "|", "(?:", ")")
}

func (c *CucumberExpression) createAlternativeMayNotExclusivelyContainOptionals() func(node) error {
	return func(node node) error {
		return createAlternativeMayNotExclusivelyContainOptionals(node, c.source)
	}
}

func (c *CucumberExpression) rewriteAlternative(node node) (string, error) {
	return c.rewriteNodesToRegex(node.Nodes, "", "", "")
}

func (c *CucumberExpression) rewriteParameter(node node) (string, error) {
	buildCaptureRegexp := func(regexps []*regexp.Regexp) string {
		if len(regexps) == 1 {
			return fmt.Sprintf("(%s)", regexps[0].String())
		}

		captureGroups := make([]string, len(regexps))
		for i, r := range regexps {
			captureGroups[i] = fmt.Sprintf("(?:%s)", r.String())
		}

		return fmt.Sprintf("(%s)", strings.Join(captureGroups, "|"))
	}
	typeName := node.text()
	parameterType := c.parameterTypeRegistry.LookupByTypeName(typeName)
	if parameterType == nil {
		return "", createUndefinedParameterType(node, c.source, typeName)
	}
	c.parameterTypes = append(c.parameterTypes, parameterType)
	return buildCaptureRegexp(parameterType.regexps), nil
}

func (c *CucumberExpression) rewriteExpression(node node) (string, error) {
	return c.rewriteNodesToRegex(node.Nodes, "", "^", "$")
}

func (c *CucumberExpression) rewriteNodesToRegex(nodes []node, delimiter string, prefix string, suffix string) (string, error) {
	builder := strings.Builder{}
	builder.WriteString(prefix)
	for i, node := range nodes {
		if i > 0 {
			builder.WriteString(delimiter)
		}
		s, err := c.rewriteNodeToRegex(node)
		if err != nil {
			return s, err
		}
		builder.WriteString(s)
	}
	builder.WriteString(suffix)
	return builder.String(), nil
}

func (c *CucumberExpression) assertNotEmpty(node node, createNodeWasNotEmptyError func(node) error) error {
	for _, node := range node.Nodes {
		if node.NodeType == textNode {
			return nil
		}
	}
	return createNodeWasNotEmptyError(node)
}

func (c *CucumberExpression) assertNoParameters(node node, createParameterIsNotAllowedInOptionalError func(node) error) error {
	for _, node := range node.Nodes {
		if node.NodeType == parameterNode {
			return createParameterIsNotAllowedInOptionalError(node)
		}
	}
	return nil
}

func (c *CucumberExpression) assertNoOptionals(node node, createOptionalIsNotAllowedInOptionalError func(node) error) error {
	for _, node := range node.Nodes {
		if node.NodeType == optionalNode {
			return createOptionalIsNotAllowedInOptionalError(node)
		}
	}
	return nil
}

func (c *CucumberExpression) Match(text string, typeHints ...reflect.Type) ([]*Argument, error) {
	hintOrDefault := func(i int, typeHints ...reflect.Type) reflect.Type {
		typeHint := reflect.TypeOf("")
		if i < len(typeHints) {
			typeHint = typeHints[i]
		}
		return typeHint
	}

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

func (c *CucumberExpression) Regexp() *regexp.Regexp {
	return c.treeRegexp.Regexp()
}

func (c *CucumberExpression) Source() string {
	return c.source
}

func (c *CucumberExpression) objectMapperTransformer(typeHint reflect.Type) func(args ...*string) interface{} {
	return func(args ...*string) interface{} {
		i, err := c.parameterTypeRegistry.defaultTransformer.Transform(*args[0], typeHint)
		if err != nil {
			panic(err)
		}
		return i
	}
}
