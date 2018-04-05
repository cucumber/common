package cucumberexpressions

import (
	"regexp"
)

type Expression interface {
	Match(text string) ([]*Argument, error)
	Regexp() *regexp.Regexp
	Source() string
}
