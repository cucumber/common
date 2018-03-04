package tagexpressions

import (
	"fmt"
	"regexp"
	"strings"
)

type Evaluatable interface {
	Evaluate(variables []string) bool
	ToString() string
}

func Parse(infix string) Evaluatable {
	return &literalExpr{value: "a"}
}

var ASSOC = map[string]string{
	"or":  "left",
	"and": "left",
	"not": "right",
}

var PREC = map[string]int{
	"(":   -2,
	")":   -1,
	"or":  0,
	"and": 1,
	"not": 2,
}

var whitespaceRegex = regexp.MustCompile("\\s")

func tokenize(expr string) []string {
	tokens := []string{}
	isEscaped := false
	token := []rune{}
	for _, c := range expr {
		if '\\' == c {
			isEscaped = true
		} else {
			if whitespaceRegex.MatchString(string(c)) {
				// skip
				if len(token) > 0 {
					// end of token
					tokens = append(tokens, string(token))
					token = []rune{}
				}
			} else {
				switch c {
				case '(', ')':
					if !isEscaped {
						if len(token) > 0 {
							// end of token
							tokens = append(tokens, string(token))
							token = []rune{}
						}
						tokens = append(tokens, string(c))
						break
					}
				default:
					token = append(token, c)
					break
				}
			}
			isEscaped = false
		}
	}
	if len(token) > 0 {
		tokens = append(tokens, string(token))
	}
	return tokens
}

func isUnary(token string) bool {
	return "not" == token
}

func isBinary(token string) bool {
	return "or" == token || "and" == token
}

func isOp(token string) bool {
	_, ok := ASSOC[token]
	return ok
}

func check(expectedTokenType, tokenType string) error {
	if expectedTokenType != tokenType {
		return fmt.Errorf("Syntax error. Expected %s, but received %s", expectedTokenType, tokenType)
	}
}

func pushExpr(token string, stack EvaluatableStack) {
	if token == "and" {
		rightAndExpr := stack.Pop()
		stack.Push(&andExpr{
			leftExpr:  stack.Pop(),
			rightExpr: rightAndExpr,
		})
	} else if token == "or" {
		rightOrExpr := stack.Pop()
		stack.Push(&orExpr{
			leftExpr:  stack.Pop(),
			rightExpr: rightOrExpr,
		})
	} else if token == "not" {
		stack.Push(&notExpr{expr: stack.Pop()})
	} else {
		stack.Push(&literalExpr{value: token})
	}
}

type literalExpr struct {
	value string
}

func (l *literalExpr) Evaluate(variables []string) bool {
	for _, variable := range variables {
		if variable == l.value {
			return true
		}
	}
	return false
}

func (l *literalExpr) ToString() string {
	return strings.Replace(
		strings.Replace(l.value, "(", "\\(", -1),
		")",
		"\\)",
		-1,
	)
}

type orExpr struct {
	leftExpr  Evaluatable
	rightExpr Evaluatable
}

func (o *orExpr) Evaluate(variables []string) bool {
	return o.leftExpr.Evaluate(variables) || o.rightExpr.Evaluate(variables)
}

func (o *orExpr) ToString() string {
	return fmt.Sprintf("( %s or %s )", o.leftExpr.ToString(), o.rightExpr.ToString())
}

type andExpr struct {
	leftExpr  Evaluatable
	rightExpr Evaluatable
}

func (a *andExpr) Evaluate(variables []string) bool {
	return a.leftExpr.Evaluate(variables) && a.rightExpr.Evaluate(variables)
}

func (a *andExpr) ToString() string {
	return fmt.Sprintf("( %s and %s )", a.leftExpr.ToString(), a.rightExpr.ToString())
}

type notExpr struct {
	expr Evaluatable
}

func (n *notExpr) Evaluate(variables []string) bool {
	return !n.expr.Evaluate(variables)
}

func (n *notExpr) ToString() string {
	return fmt.Sprintf("not ( %s )", n.expr.ToString())
}

type trueExpr struct{}

func (t *trueExpr) Evaluate(variables []string) bool {
	return true
}

func (t *trueExpr) ToString() string {
	return "true"
}
