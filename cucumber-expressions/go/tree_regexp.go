package cucumberexpressions

import (
	"regexp"
)

type TreeRegexp struct {
	regexp       *regexp.Regexp
	groupBuilder *GroupBuilder
}

func NewTreeRegexp(regexp *regexp.Regexp) *TreeRegexp {
	stack := GroupBuilderStack{}
	stack.Push(NewGroupBuilder())
	groupStartStack := IntStack{}
	var last rune
	escaping := false
	nonCapturingMaybe := false
	for n, c := range regexp.String() {
		if c == '(' && !escaping {
			stack.Push(NewGroupBuilder())
			groupStartStack.Push(n + 1)
			nonCapturingMaybe = false
		} else if c == ')' && !escaping {
			gb := stack.Pop()
			groupStart := groupStartStack.Pop()
			if gb.Capturing() {
				gb.SetSource(regexp.String()[groupStart:n])
				stack.Peek().Add(gb)
			} else {
				gb.MoveChildrenTo(stack.Peek())
			}
			nonCapturingMaybe = false
		} else if c == '?' && last == '(' {
			nonCapturingMaybe = true
		} else if nonCapturingMaybe {
			if c == ':' || isFlagCharacter(c) {
				stack.Peek().SetNonCapturing()
			}
			nonCapturingMaybe = false
		}
		escaping = c == '\\' && !escaping
		last = c
	}

	return &TreeRegexp{
		regexp:       regexp,
		groupBuilder: stack.Pop(),
	}
}

func (t *TreeRegexp) Regexp() *regexp.Regexp {
	return t.regexp
}

func (t *TreeRegexp) GroupBuilder() *GroupBuilder {
	return t.groupBuilder
}

func (t *TreeRegexp) Match(s string) *Group {
	indicies := t.Regexp().FindAllStringSubmatchIndex(s, -1)
	if indicies == nil {
		return nil
	}
	var submatches []*Submatch
	for i := range indicies[0] {
		if i%2 == 0 {
			continue
		}
		start, end := indicies[0][i-1], indicies[0][i]
		value := ""
		if start != -1 {
			value = s[start:end]
		}
		submatches = append(submatches, &Submatch{
			value: value,
			start: start,
			end:   end,
		})
	}
	return t.groupBuilder.Build(submatches, NewIntIterator(len(submatches)))
}

func isFlagCharacter(c rune) bool {
	switch c {
	case 'i', 'm', 's', 'U', '-':
		return true
	default:
		return false
	}
}

//
//   match(s) {
//     const match = this._regex.exec(s)
//     if (!match) return null
//     let groupIndex = 0
//     const nextGroupIndex = () => groupIndex++
//     return this._groupBuilder.build(match, nextGroupIndex)
//   }
// }
