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

func createCantEscaped(expression string, index int) error {
	return NewCucumberExpressionError(message(
		index,
		expression,
		pointAt(index),
		"Only the characters '{', '}', '(', ')', '\\', '/' and whitespace can be escaped",
		"If you did mean to use an '\\' you can use '\\\\' to escape it",
	))
}

func pointAt(index int) strings.Builder {
	pointer := strings.Builder{}
	for i := 0; i < index; i++ {
		pointer.WriteString(" ")
	}
	pointer.WriteString("^")
	return pointer
}

func pointAtToken(node token) strings.Builder {
	pointer := pointAt(node.Start)
	if node.Start+1 < node.End {
		for i := node.Start + 1; i < node.End-1; i++ {
			pointer.WriteString("-")
		}
		pointer.WriteString("^")
	}
	return pointer
}

func message(index int, expression string, pointer strings.Builder, problem string, solution string) string {
	return thisCucumberExpressionHasAProblemAt(index) +
		"\n" +
		expression + "\n" +
		pointer.String() + "\n" +
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

func NewUndefinedParameterTypeError(typeName string) error {
	return &UndefinedParameterTypeError{s: fmt.Sprintf("Undefined parameter type {%s}", typeName)}
}

func (e *UndefinedParameterTypeError) Error() string {
	return e.s
}
