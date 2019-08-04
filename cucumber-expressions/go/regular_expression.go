package cucumberexpressions

import (
	"reflect"
	"regexp"
)

type RegularExpression struct {
	expressionRegexp      *regexp.Regexp
	parameterTypeRegistry *ParameterTypeRegistry
	treeRegexp            *TreeRegexp
}

func NewRegularExpression(expressionRegexp *regexp.Regexp, parameterTypeRegistry *ParameterTypeRegistry) *RegularExpression {
	return &RegularExpression{
		expressionRegexp:      expressionRegexp,
		parameterTypeRegistry: parameterTypeRegistry,
		treeRegexp:            NewTreeRegexp(expressionRegexp),
	}
}

func (r *RegularExpression) Match(text string, typeHints ...reflect.Type) ([]*Argument, error) {
	parameterTypes := []*ParameterType{}
	for i, groupBuilder := range r.treeRegexp.GroupBuilder().Children() {
		parameterTypeRegexp := groupBuilder.Source()
		typeHint := reflect.TypeOf("")
		hasTypeHint := i < len(typeHints)
		if hasTypeHint {
			typeHint = typeHints[i]
		}

		parameterType, err := r.parameterTypeRegistry.LookupByRegexp(parameterTypeRegexp, r.expressionRegexp.String(), text)
		if err != nil {
			return nil, err
		}
		if parameterType!= nil && hasTypeHint && !parameterType.UseRegexpMatchAsStrongTypeHint() {
			if parameterType.Type() != typeHint.Name() {
				parameterType = nil
			}
		}

		if parameterType == nil {
			anonymousParameterType, err := createAnonymousParameterType(parameterTypeRegexp)
			if err != nil {
				return nil, err
			}
			parameterType = anonymousParameterType
		}

		if parameterType.isAnonymous() {
			deanonimizedParameterType, err := parameterType.deAnonymize(typeHint, r.objectMapperTransformer(typeHint))
			if err != nil {
				return nil, err
			}
			parameterType = deanonimizedParameterType
		}
		parameterTypes = append(parameterTypes, parameterType)
	}
	return BuildArguments(r.treeRegexp, text, parameterTypes), nil
}

func (r *RegularExpression) Regexp() *regexp.Regexp {
	return r.expressionRegexp
}

func (r *RegularExpression) Source() string {
	return r.expressionRegexp.String()
}

func (r *RegularExpression) objectMapperTransformer(typeHint reflect.Type) func(args ...*string) interface{} {
	return func(args ...*string) interface{} {
		i, err := r.parameterTypeRegistry.defaultTransformer.Transform(*args[0], typeHint)
		if err != nil {
			panic(err)
		}
		return i
	}
}
