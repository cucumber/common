package tagexpressions

import (
	"fmt"
	"strings"
)

type Evaluatable interface {
	Evaluate(variables []string) bool
	ToString() string
}

func Parse(infix string) Evaluatable {
	return &literalExpr{value: "a"}
}

var assoc = map[string]string{
	"or":  "left",
	"and": "left",
	"not": "right",
}

var prec = map[string]int{
	"(":   -2,
	")":   -1,
	"or":  0,
	"and": 1,
	"not": 2,
}

// function tokenize(expr) {
// 	var tokens = []
// 	var isEscaped = false
// 	var token = undefined
// 	for (var i = 0; i < expr.length; i++) {
// 		var c = expr.charAt(i)
// 		if ('\\' === c) {
// 			isEscaped = true
// 		} else {
// 			if (/\s/.test(c)) {
// 				// skip
// 				if (token) {
// 					// end of token
// 					tokens.push(token.join(''))
// 					token = undefined
// 				}
// 			} else {
// 				switch (c) {
// 					case '(':
// 					case ')':
// 						if (!isEscaped) {
// 							if (token) {
// 								// end of token
// 								tokens.push(token.join(''))
// 								token = undefined
// 							}
// 							tokens.push(c)
// 							break
// 						}
// 					default:
// 						token = token ? token : [] // start of token
// 						token.push(c)
// 						break
// 				}
// 			}
// 			isEscaped = false
// 		}
// 	}
// 	if (token) {
// 		tokens.push(token.join(''))
// 	}
// 	return tokens
// }
//
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

func pushExpr(token string, stack Stack) {
	if token == "and" {
		rightAndExpr := stack.Pop()
		stack.Push(&and{
			leftExpr:  stack.Pop(),
			rightExpr: rightAndExpr,
		})
	} else if token == "or" {
		rightOrExpr := stack.Pop()
		stack.Push(&or{
			leftExpr:  stack.Pop(),
			rightExpr: rightOrExpr,
		})
	} else if token == "not" {
		stack.Push(&Not{expr: stack.Pop()})
	} else {
		stack.push(&Literal{value: token})
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
