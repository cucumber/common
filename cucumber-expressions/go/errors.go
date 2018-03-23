package cucumberexpressions

import "fmt"

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

func NewAmbiguousParameterTypeErrorForConstructor(keyName, keyValue string, parameterTypes []*ParameterType, generatedExpressions []string) error {
	return &AmbiguousParameterTypeError{
		s: fmt.Sprintf(
			"parameter type with %s=%s is used by several parameter types: %v, %v",
			keyName,
			keyValue,
			parameterTypes,
			generatedExpressions,
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

//
// class CucumberExpressionError extends Error {}
//
// class AmbiguousParameterTypeError extends CucumberExpressionError {
//   static forConstructor(
//     keyName,
//     keyValue,
//     parameterTypes,
//     generatedExpressions
//   ) {
//     return new this(
//       `parameter type with ${keyName}=${keyValue} is used by several parameter types: ${parameterTypes}, ${generatedExpressions}`
//     )
//   }
//
//   static forRegExp(
//     parameterTypeRegexp,
//     expressionRegexp,
//     parameterTypes,
//     generatedExpressions
//   ) {
//     return new this(
//       `Your Regular Expression ${expressionRegexp}
// matches multiple parameter types with regexp ${parameterTypeRegexp}:
//    ${this._parameterTypeNames(parameterTypes)}
//
// I couldn't decide which one to use. You have two options:
//
// 1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:
//    ${this._expressions(generatedExpressions)}
//
// 2) Make one of the parameter types preferential and continue to use a Regular Expression.
// `
//     )
//   }
//
//   static _parameterTypeNames(parameterTypes) {
//     return parameterTypes.map(p => `{${p.name}}`).join('\n   ')
//   }
//
//   static _expressions(generatedExpressions) {
//     return generatedExpressions.map(e => e.source).join('\n   ')
//   }
// }
//
// class UndefinedParameterTypeError extends CucumberExpressionError {
//   constructor(typeName) {
//     super(`Undefined parameter type {${typeName}}`)
//   }
// }
//
// module.exports = {
//   AmbiguousParameterTypeError,
//   UndefinedParameterTypeError,
//   CucumberExpressionError,
// }
