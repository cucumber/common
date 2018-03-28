package cucumberexpressions

import (
	"fmt"
	"strings"
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
