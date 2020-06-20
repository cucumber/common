package cucumberexpressions

import (
	"regexp"
)

type TreeRegexp struct {
	regexp       *regexp.Regexp
	groupBuilder *GroupBuilder
}

func NewTreeRegexp(regexp *regexp.Regexp) *TreeRegexp {
	return &TreeRegexp{
		regexp:       regexp,
		groupBuilder: createGroupBuilder(regexp),
	}
}

func createGroupBuilder(regexp *regexp.Regexp) *GroupBuilder {
	source := regexp.String()
	stack := GroupBuilderStack{}
	stack.Push(NewGroupBuilder())
	groupStartStack := IntStack{}
	escaping := false
	charClass := false
	for i, c := range source {
		if c == '[' && !escaping {
			charClass = true
		} else if c == ']' && !escaping {
			charClass = false
		} else if c == '(' && !escaping && !charClass {
			groupStartStack.Push(i)
			groupBuilder := NewGroupBuilder()
			nonCapturing := isNonCapturing(source, i)
			if nonCapturing {
				groupBuilder.SetNonCapturing()
			}
			stack.Push(groupBuilder)
		} else if c == ')' && !escaping && !charClass {
			gb := stack.Pop()
			groupStart := groupStartStack.Pop()
			if gb.Capturing() {
				gb.SetSource(source[groupStart+1 : i])
				stack.Peek().Add(gb)
			} else {
				gb.MoveChildrenTo(stack.Peek())
			}
		}
		escaping = c == '\\' && !escaping
	}

	pop := stack.Pop()
	return pop
}

func isNonCapturing(source string, i int) bool {
	// Regex is valid. Bounds check not required.
	if source[i+1] != '?' {
		// (X)
		return false
	}
	if source[i+2] == 'P' {
		if source[i+3] == '<' {
			// (?P<name>X)
			return false
		}
	}
	// (?...)
	return true
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
		var value *string
		if start != -1 {
			valueStr := s[start:end]
			value = &valueStr
		}
		submatches = append(submatches, &Submatch{
			value: value,
			start: start,
			end:   end,
		})
	}
	return t.groupBuilder.Build(submatches, NewIntIterator(len(submatches)))
}
