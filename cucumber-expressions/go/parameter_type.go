package cucumberexpressions

import (
	"errors"
	"fmt"
	"reflect"
	"regexp"
)

var HAS_FLAG_REGEXP = regexp.MustCompile(`\(\?[imsU-]+(:.*)?\)`)
var UNESCAPE_REGEXP = regexp.MustCompile(`(\\([\[$.|?*+\]]))`)
var ILLEGAL_PARAMETER_NAME_REGEXP = regexp.MustCompile(`([\[\]()$.|?*+])`)

type ParameterType struct {
	name                 string
	regexps              []*regexp.Regexp
	type1                string // Cannot have a field named type as hit a compile error
	transform            func(...*string) interface{}
	useForSnippets       bool
	preferForRegexpMatch bool
}

func CheckParameterTypeName(typeName string) error {
	unescapedTypeName := UNESCAPE_REGEXP.ReplaceAllString(typeName, "$2")
	if ILLEGAL_PARAMETER_NAME_REGEXP.MatchString(typeName) {
		c := ILLEGAL_PARAMETER_NAME_REGEXP.FindStringSubmatch(typeName)[0]
		return errors.New(fmt.Sprintf("Illegal character '%s' in parameter name {%s}", c, unescapedTypeName))
	}
	return nil
}

func NewParameterType(name string, regexps []*regexp.Regexp, type1 string, transform func(...*string) interface{}, useForSnippets bool, preferForRegexpMatch bool) (*ParameterType, error) {
	if transform == nil {
		transform = func(s ...*string) interface{} {
			return *s[0]
		}
	}
	for _, r := range regexps {
		if HAS_FLAG_REGEXP.MatchString(r.String()) {
			return nil, errors.New("ParameterType Regexps can't use flags")
		}
	}
	err := CheckParameterTypeName(name)
	if err != nil {
		return nil, err
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

func createAnonymousParameterType(parameterTypeRegexp string) (*ParameterType, error) {
	return NewParameterType(
		"",
		[]*regexp.Regexp{regexp.MustCompile(parameterTypeRegexp)},
		"unknown",
		func(args ...*string) interface{} {
			panic("Anonymous transform must be deanonymized before use")
		},
		false,
		true,
	)
}

func (p *ParameterType) deAnonymize(type1 reflect.Type, transform func(args ...*string) interface{}) (*ParameterType, error) {
	return NewParameterType(
		"anonymous",
		p.regexps,
		type1.Name(),
		transform,
		p.useForSnippets,
		p.preferForRegexpMatch,
	)
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

func (p *ParameterType) Transform(groupValues []*string) interface{} {
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

func (p *ParameterType) isAnonymous() bool {
	return len(p.name) == 0
}
