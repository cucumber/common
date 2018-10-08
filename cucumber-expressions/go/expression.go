package cucumberexpressions

import (
	"reflect"
	"regexp"
)

type Expression interface {
	Match(text string, typeHints ...reflect.Type) ([]*Argument, error)
	Regexp() *regexp.Regexp
	Source() string
}
