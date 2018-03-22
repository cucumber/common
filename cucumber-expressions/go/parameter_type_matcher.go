package cucumberexpressions

import (
	"fmt"
	"regexp"
)

type ParameterTypeMatcher struct {
	parameterType *ParameterType
	regexp        *regexp.Regexp
	text          string
	matchPosition int
	match         []int
}

func NewParameterTypeMatcher(parameterType *ParameterType, r *regexp.Regexp, text string, matchPosition int) *ParameterTypeMatcher {
	captureGroupRegexp := regexp.MustCompile(fmt.Sprintf("(%s)", r.String()))
	return &ParameterTypeMatcher{
		parameterType: parameterType,
		regexp:        r,
		text:          text,
		matchPosition: matchPosition,
		match:         captureGroupRegexp.FindStringIndex(text[matchPosition:]),
	}
}

func (p *ParameterTypeMatcher) ParameterType() *ParameterType {
	return p.parameterType
}

func (p *ParameterTypeMatcher) AdvanceTo(newMatchPosition int) *ParameterTypeMatcher {
	return NewParameterTypeMatcher(p.parameterType, p.regexp, p.text, newMatchPosition)
}

func (p *ParameterTypeMatcher) Find() bool {
	return p.match != nil && p.Group() != ""
}

func (p *ParameterTypeMatcher) Start() int {
	return p.matchPosition + p.match[0]
}

func (p *ParameterTypeMatcher) Group() string {
	return p.text[p.matchPosition:][p.match[0]:p.match[1]]
}

func CompareParameterTypeMatchers(a, b *ParameterTypeMatcher) int {
	posComparison := a.Start() - b.Start()
	if posComparison != 0 {
		return posComparison
	}
	lengthComparison := len(b.Group()) - len(a.Group())
	if lengthComparison != 0 {
		return lengthComparison
	}
	return 0
}

//   static compare(a, b) {
//     const posComparison = a.start - b.start
//     if (posComparison !== 0) return posComparison
//     const lengthComparison = b.group.length - a.group.length
//     if (lengthComparison !== 0) return lengthComparison
//     return 0
//   }
