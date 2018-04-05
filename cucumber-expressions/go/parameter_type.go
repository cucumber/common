package cucumberexpressions

import (
	"errors"
	"regexp"
)

var HAS_FLAG_REGEKP = regexp.MustCompile(`\(\?[imsU-]+(\:.*)?\)`)

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
			return s[0]
		}
	}
	for _, r := range regexps {
		if HAS_FLAG_REGEKP.MatchString(r.String()) {
			return nil, errors.New("ParameterType Regexps can't use flags")
		}
	}
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

func CompareParameterTypes(pt1, pt2 *ParameterType) int {
	if pt1.PreferForRegexpMatch() && !pt2.PreferForRegexpMatch() {
		return -1
	}
	if pt2.PreferForRegexpMatch() && !pt1.PreferForRegexpMatch() {
		return 1
	}
	if pt1.Name() < pt2.Name() {
		return -1
	}
	if pt1.Name() > pt2.Name() {
		return 1
	}
	return 0
}
