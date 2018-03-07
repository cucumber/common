package cucumberexpressions

import "regexp"

type ParameterType struct {
	name                 string
	regexps              []*regexp.Regexp
	type1                string // Cannot have a field named type as hit a compile error
	transform            func(...string) interface{}
	useForSnippets       bool
	preferForRegexpMatch bool
}

func NewParameterType(name string, regexps []*regexp.Regexp, type1 string, transform func(...string) interface{}, useForSnippets bool, preferForRegexpMatch bool) (*ParameterType, error) {
	if transform == nil {
		transform = func(s ...string) interface{} {
			return s
		}
	}
	// TODO error if uses flags
	return &ParameterType{
		name:                 name,
		regexps:              regexps,
		type1:                type1,
		transform:            transform,
		useForSnippets:       useForSnippets,
		preferForRegexpMatch: preferForRegexpMatch,
	}, nil
}

func (p *ParameterType) Name() string {
	return p.name
}

func (p *ParameterType) Regexps() []*regexp.Regexp {
	return p.regexps
}

func (p *ParameterType) Type() string {
	return p.type1
}

func (p *ParameterType) UseForSnippets() bool {
	return p.useForSnippets
}

func (p *ParameterType) PreferForRegexpMatch() bool {
	return p.preferForRegexpMatch
}

func (p *ParameterType) Transform(groupValues []string) interface{} {
	return p.transform(groupValues...)
}
