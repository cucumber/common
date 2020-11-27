package cucumberexpressions

import (
	"fmt"
	"strings"
	"unicode/utf8"
)

type CucumberExpressionError struct {
	s string
}

func NewCucumberExpressionError(text string) error {
	return &CucumberExpressionError{s: text}
}

func (e *CucumberExpressionError) Error() string {
	return e.s
}

func createMissingEndToken(expression string, beginToken tokenType, endToken tokenType, current token) error {
	return NewCucumberExpressionError(message(
		current.Start,
		expression,
		pointAtToken(current),
		"The '"+symbol(beginToken)+"' does not have a matching '"+symbol(endToken)+"'",
		"If you did not intend to use "+purpose(beginToken)+" you can use '\\"+symbol(beginToken)+"' to escape the "+purpose(beginToken),
	))
}

func createAlternationNotAllowedInOptional(expression string, current token) error {
	return NewCucumberExpressionError(message(
		current.Start,
		expression,
		pointAtToken(current),
		"An alternation can not be used inside an optional",
		"You can use '\\/' to escape the the '/'",
	))
}

func createTheEndOfLineCanNotBeEscaped(expression string) error {
	index := utf8.RuneCountInString(expression) - 1
	return NewCucumberExpressionError(message(
		index,
		expression,
		pointAt(index),
		"The end of line can not be escaped",
		"You can use '\\\\' to escape the the '\\'",
	))
}

func createOptionalMayNotBeEmpty(node node, expression string) error {
	return NewCucumberExpressionError(message(
		node.Start,
		expression,
		pointAtNode(node),
		"An optional must contain some text",
		"If you did not mean to use an optional you can use '\\(' to escape the the '('",
	))
}
func createParameterIsNotAllowedInOptional(node node, expression string) error {
	return NewCucumberExpressionError(message(
		node.Start,
		expression,
		pointAtNode(node),
		"An optional may not contain a parameter type",
		"If you did not mean to use an parameter type you can use '\\{' to escape the the '{'",
	))
}
func createOptionalIsNotAllowedInOptional(node node, expression string) error {
	return NewCucumberExpressionError(message(
		node.Start,
		expression,
		pointAtNode(node),
		"An optional may not contain an other optional",
		"If you did not mean to use an optional type you can use '\\(' to escape the the '('. For more complicated expressions consider using a regular expression instead.",
	))
}
func createAlternativeMayNotBeEmpty(node node, expression string) error {
	return NewCucumberExpressionError(message(
		node.Start,
		expression,
		pointAtNode(node),
		"Alternative may not be empty",
		"If you did not mean to use an alternative you can use '\\/' to escape the the '/'",
	))
}
func createAlternativeMayNotExclusivelyContainOptionals(node node, expression string) error {
	return NewCucumberExpressionError(message(
		node.Start,
		expression,
		pointAtNode(node),
		"An alternative may not exclusively contain optionals",
		"If you did not mean to use an optional you can use '\\(' to escape the the '('",
	))
}

func createCantEscaped(expression string, index int) error {
	return NewCucumberExpressionError(message(
		index,
		expression,
		pointAt(index),
		"Only the characters '{', '}', '(', ')', '\\', '/' and whitespace can be escaped",
		"If you did mean to use an '\\' you can use '\\\\' to escape it",
	))
}

func createInvalidParameterTypeName(typeName string) error {
	return NewCucumberExpressionError("Illegal character in parameter name {" + typeName + "}. Parameter names may not contain '{', '}', '(', ')', '\\' or '/'")
}

//  Not very clear, but this message has to be language independent
func createInvalidParameterTypeNameInNode(token token, expression string) error {
	return NewCucumberExpressionError(message(
		token.Start,
		expression,
		pointAtToken(token),
		"Parameter names may not contain '{', '}', '(', ')', '\\' or '/'",
		"Did you mean to use a regular expression?",
	))
}

func pointAt(index int) string {
	pointer := strings.Builder{}
	for i := 0; i < index; i++ {
		pointer.WriteString(" ")
	}
	pointer.WriteString("^")
	return pointer.String()
}

func pointAtToken(node token) string {
	pointer := strings.Builder{}
	pointer.WriteString(pointAt(node.Start))
	if node.Start+1 < node.End {
		for i := node.Start + 1; i < node.End-1; i++ {
			pointer.WriteString("-")
		}
		pointer.WriteString("^")
	}
	return pointer.String()
}

func pointAtNode(node node) string {
	pointer := strings.Builder{}
	pointer.WriteString(pointAt(node.Start))
	if node.Start+1 < node.End {
		for i := node.Start + 1; i < node.End-1; i++ {
			pointer.WriteString("-")
		}
		pointer.WriteString("^")
	}
	return pointer.String()
}

func message(index int, expression string, pointer string, problem string, solution string) string {
	return thisCucumberExpressionHasAProblemAt(index) +
		"\n" +
		expression + "\n" +
		pointer + "\n" +
		problem + ".\n" +
		solution
}

func thisCucumberExpressionHasAProblemAt(index int) string {
	return fmt.Sprintf("This Cucumber Expression has a problem at column %d:\n", index+1)
}

type AmbiguousParameterTypeError struct {
	s string
}

func NewAmbiguousParameterTypeError(parameterTypeRegexp, expressionRegexp string, parameterTypes []*ParameterType, generatedExpressions []*GeneratedExpression) error {
	parameterTypeNames := make([]string, len(parameterTypes))
	for i, parameterType := range parameterTypes {
		parameterTypeNames[i] = "{" + parameterType.Name() + "}"
	}
	generatedExpressionSources := make([]string, len(generatedExpressions))
	for i, generatedExpression := range generatedExpressions {
		generatedExpressionSources[i] = generatedExpression.Source()
	}
	return &AmbiguousParameterTypeError{
		s: fmt.Sprintf(
			`Your Regular Expression /%s/
matches multiple parameter types with regexp /%s/:
   %s

I couldn't decide which one to use. You have two options:

1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:
   %s

2) Make one of the parameter types preferential and continue to use a Regular Expression.

`,
			expressionRegexp,
			parameterTypeRegexp,
			strings.Join(parameterTypeNames, "\n   "),
			strings.Join(generatedExpressionSources, "\n   "),
		),
	}
}

func (e *AmbiguousParameterTypeError) Error() string {
	return e.s
}

type UndefinedParameterTypeError struct {
	s string
}

func NewUndefinedParameterTypeError(message string) error {
	return &UndefinedParameterTypeError{s: message}
}

func (e *UndefinedParameterTypeError) Error() string {
	return e.s
}

func createUndefinedParameterType(node node, expression string, undefinedParameterTypeName string) error {
	return NewUndefinedParameterTypeError(message(
		node.Start,
		expression,
		pointAtNode(node),
		"Undefined parameter type '"+undefinedParameterTypeName+"'",
		"Please register a ParameterType for '"+undefinedParameterTypeName+"'"))
}
