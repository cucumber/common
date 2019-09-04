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
	for advancedPos := newMatchPosition; advancedPos < len(p.text); advancedPos++ {
		var matcher = NewParameterTypeMatcher(p.parameterType, p.regexp, p.text, advancedPos)
		if matcher.Find() {
			return matcher
		}
	}
	return NewParameterTypeMatcher(p.parameterType, p.regexp, p.text, len(p.text))
}

func (p *ParameterTypeMatcher) Find() bool {
	return p.match != nil && p.FullWord() && p.Group() != ""
}

func (p *ParameterTypeMatcher) FullWord() bool {
	return p.MatchStartWord() && p.MatchEndWord()
}

func (p *ParameterTypeMatcher) MatchStartWord() bool {
	return p.Start() == 0 || p.CharacterIsWordDelimiter(p.Start()-1)
}

func (p *ParameterTypeMatcher) MatchEndWord() bool {
	return p.End() == len(p.text) || p.CharacterIsWordDelimiter(p.End())
}

func (p *ParameterTypeMatcher) CharacterIsWordDelimiter(index int) bool {
	matched, _ := regexp.MatchString(`\s|\p{P}`, p.text[index:index+1])
	return matched
}

func (p *ParameterTypeMatcher) Start() int {
	return p.matchPosition + p.match[0]
}

func (p *ParameterTypeMatcher) End() int {
	return p.Start() + len(p.Group())
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
