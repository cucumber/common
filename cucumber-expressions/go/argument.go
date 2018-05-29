package cucumberexpressions

import "fmt"

type Argument struct {
	group         *Group
	parameterType *ParameterType
}

func BuildArguments(treeRegexp *TreeRegexp, text string, parameterTypes []*ParameterType) []*Argument {
	group := treeRegexp.Match(text)
	if group == nil {
		return nil
	}
	argGroups := group.Children()
	if len(argGroups) != len(parameterTypes) {
		panic(fmt.Errorf("%s has %d capture groups (%v), but there were %d parameter types (%v)", treeRegexp.Regexp().String(), len(argGroups), argGroups, len(parameterTypes), parameterTypes))
	}
	arguments := make([]*Argument, len(parameterTypes))
	for i, parameterType := range parameterTypes {
		arguments[i] = NewArgument(argGroups[i], parameterType)
	}
	return arguments
}

func NewArgument(group *Group, parameterType *ParameterType) *Argument {
	return &Argument{
		group:         group,
		parameterType: parameterType,
	}
}

func (a *Argument) Group() *Group {
	return a.group
}

func (a *Argument) GetValue() interface{} {
	values := a.group.Values()
	if values == nil {
		return nil
	}
	return a.parameterType.Transform(values)
}

func (a *Argument) ParameterType() *ParameterType {
	return a.parameterType
}
