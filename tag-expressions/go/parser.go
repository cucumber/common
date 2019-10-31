package tagexpressions

import (
	"bytes"
	"errors"
	"fmt"
	"strings"
	"unicode"
)

const OPERAND = "operand"
const OPERATOR = "operator"

type Evaluatable interface {
	Evaluate(variables []string) bool
	ToString() string
}

func Parse(infix string) (Evaluatable, error) {
	tokens := tokenize(infix)
	if len(tokens) == 0 {
		return &trueExpr{}, nil
	}
	expressions := &EvaluatableStack{}
	operators := &StringStack{}
	expectedTokenType := OPERAND

	for _, token := range tokens {
		if isUnary(token) {
			if err := check(expectedTokenType, OPERAND); err != nil {
				return nil, err
			}
			operators.Push(token)
			expectedTokenType = OPERAND
		} else if isBinary(token) {
			if err := check(expectedTokenType, OPERATOR); err != nil {
				return nil, err
			}
			for operators.Len() > 0 &&
				isOp(operators.Peek()) &&
				((ASSOC[token] == "left" && PREC[token] <= PREC[operators.Peek()]) ||
					(ASSOC[token] == "right" && PREC[token] < PREC[operators.Peek()])) {
				pushExpr(operators.Pop(), expressions)
			}
			operators.Push(token)
			expectedTokenType = OPERAND
		} else if "(" == token {
			if err := check(expectedTokenType, OPERAND); err != nil {
				return nil, err
			}
			operators.Push(token)
			expectedTokenType = OPERAND
		} else if ")" == token {
			if err := check(expectedTokenType, OPERATOR); err != nil {
				return nil, err
			}
			for operators.Len() > 0 && operators.Peek() != "(" {
				pushExpr(operators.Pop(), expressions)
			}
			if operators.Len() == 0 {
				return nil, errors.New("Syntax error. Unmatched )")
			}
			if operators.Peek() == "(" {
				operators.Pop()
			}
			expectedTokenType = OPERATOR
		} else {
			if err := check(expectedTokenType, OPERAND); err != nil {
				return nil, err
			}
			pushExpr(token, expressions)
			expectedTokenType = OPERATOR
		}
	}

	for operators.Len() > 0 {
		if operators.Peek() == "(" {
			return nil, errors.New("Syntax error. Unmatched (")
		}
		pushExpr(operators.Pop(), expressions)
	}

	return expressions.Pop(), nil
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

func tokenize(expr string) []string {
	var tokens []string
	var token bytes.Buffer

	collectToken := func() {
		if token.Len() > 0 {
			tokens = append(tokens, token.String())
			token.Reset()
		}
	}

	escaped := false
	for _, c := range expr {
		if unicode.IsSpace(c) {
			collectToken()
			continue
		}

		ch := string(c)

		switch ch {
		case "\\":
			escaped = true
		case "(", ")":
			if escaped {
				token.WriteString(ch)
				escaped = false
			} else {
				collectToken()
				tokens = append(tokens, ch)
			}
		default:
			token.WriteString(ch)
		}
	}

	collectToken()
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
		return fmt.Errorf("Syntax error. Expected %s", expectedTokenType)
	}
	return nil
}

func pushExpr(token string, stack *EvaluatableStack) {
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
