package io.cucumber.tagexpressions;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TagExpressionParser {
    private static Map<String, Assoc> ASSOC = new HashMap<String, Assoc>() {{
        put("or", Assoc.LEFT);
        put("and", Assoc.LEFT);
        put("not", Assoc.RIGHT);
    }};
    private static Map<String, Integer> PREC = new HashMap<String, Integer>() {{
        put("(", -2);
        put(")", -1);
        put("or", 0);
        put("and", 1);
        put("not", 2);
    }};
    private static final char ESCAPING_CHAR = '\\';
    private String infix;

    
    public Expression parse(final String infix) {
	this.infix = infix;
	
        final List<String> tokens = tokenize(infix);
        if(tokens.isEmpty()) return new True();

        final Deque<String> operators = new ArrayDeque<>();
        final Deque<Expression> expressions = new ArrayDeque<>();
        TokenType expectedTokenType = TokenType.OPERAND;
        for (final String token : tokens) {
            if (isUnary(token)) {
                check(expectedTokenType, TokenType.OPERAND);
                operators.push(token);
                expectedTokenType = TokenType.OPERAND;
            } else if (isBinary(token)) {
                check(expectedTokenType, TokenType.OPERATOR);
                while (operators.size() > 0 && isOperator(operators.peek()) && (
                        (ASSOC.get(token) == Assoc.LEFT && PREC.get(token) <= PREC.get(operators.peek()))
                                ||
                                (ASSOC.get(token) == Assoc.RIGHT && PREC.get(token) < PREC.get(operators.peek())))
                        ) {
                    pushExpr(pop(operators), expressions);
                }
                operators.push(token);
                expectedTokenType = TokenType.OPERAND;
            } else if ("(".equals(token)) {
                check(expectedTokenType, TokenType.OPERAND);
                operators.push(token);
                expectedTokenType = TokenType.OPERAND;
            } else if (")".equals(token)) {
                check(expectedTokenType, TokenType.OPERATOR);
                while (operators.size() > 0 && !"(".equals(operators.peek())) {
                    pushExpr(pop(operators), expressions);
                }
                if (operators.size() == 0) {
                    throw new TagExpressionException("Tag expression '%s' could not be parsed because of syntax error: unmatched )", this.infix);
                }
                if ("(".equals(operators.peek())) {
                    pop(operators);
                }
                expectedTokenType = TokenType.OPERATOR;
            } else {
                check(expectedTokenType, TokenType.OPERAND);
                pushExpr(token, expressions);
                expectedTokenType = TokenType.OPERATOR;
            }
        }

        while (operators.size() > 0) {
            if ("(".equals(operators.peek())) {
                throw new TagExpressionException("Tag expression '%s' could not be parsed because of syntax error: unmatched (", this.infix);
            }
            pushExpr(pop(operators), expressions);
        }

        return expressions.pop();
    }

    private static List<String> tokenize(final String expr) {
        final List<String> tokens = new ArrayList<>();

        boolean isEscaped = false;
        StringBuilder token = null;
        for (int i = 0; i < expr.length(); i++) {
            final char c = expr.charAt(i);
            if (ESCAPING_CHAR == c) {
                isEscaped = true;
            } else {
                if (Character.isWhitespace(c)) { // skip
                    if (null != token) { // end of token
                        tokens.add(token.toString());
                        token = null;
                    }
                } else {
                    switch (c) {
                        case '(':
                        case ')':
                            if (!isEscaped) {
                                if (null != token) { // end of token
                                    tokens.add(token.toString());
                                    token = null;
                                }
                                tokens.add(String.valueOf(c));
                                break;
                            }
                        default:
                            if (null == token) { // start of token
                                token = new StringBuilder();
                            }
                            token.append(c);
                            break;
                    }
                }
                isEscaped = false;
            }
        }
        if (null != token) { // end of token
            tokens.add(token.toString());
        }
        return tokens;
    }

    private void check(final TokenType expectedTokenType, final TokenType tokenType) {
        if (expectedTokenType != tokenType) {
            throw new TagExpressionException("Tag expression '%s' could not be parsed because of syntax error: expected %s", this.infix, expectedTokenType.toString().toLowerCase());
        }
    }

    private <T> T pop(final Deque<T> stack) {
        if (stack.isEmpty()) throw new TagExpressionException("Tag expression '%s' could not be parsed because of an empty stack", this.infix);
        return stack.pop();
    }

    private void pushExpr(final String token, final Deque<Expression> stack) {
        switch (token) {
            case "and":
                final Expression rightAndExpr = pop(stack);
                stack.push(new And(pop(stack), rightAndExpr));
                break;
            case "or":
                final Expression rightOrExpr = pop(stack);
                stack.push(new Or(pop(stack), rightOrExpr));
                break;
            case "not":
                stack.push(new Not(pop(stack)));
                break;
            default:
                stack.push(new Literal(token));
                break;
        }
    }

    private boolean isUnary(final String token) {
        return "not".equals(token);
    }

    private boolean isBinary(final String token) {
        return "or".equals(token) || "and".equals(token);
    }

    private boolean isOperator(final String token) {
        return ASSOC.get(token) != null;
    }

    private enum TokenType {
        OPERAND,
        OPERATOR
    }

    private enum Assoc {
        LEFT,
        RIGHT
    }

    private class Literal implements Expression {
        private final String value;

        Literal(final String value) {
            this.value = value;
        }

        @Override
        public boolean evaluate(final List<String> variables) {
            return variables.contains(value);
        }

        @Override
        public String toString() {
            return value.replaceAll("\\(", "\\\\(").replaceAll("\\)", "\\\\)");
        }
    }

    private class Or implements Expression {
        private final Expression left;
        private final Expression right;

        Or(final Expression left, final Expression right) {
            this.left = left;
            this.right = right;
        }

        @Override
        public boolean evaluate(final List<String> variables) {
            return left.evaluate(variables) || right.evaluate(variables);
        }

        @Override
        public String toString() {
            return "( " + left.toString() + " or " + right.toString() + " )";
        }
    }

    private class And implements Expression {
        private final Expression left;
        private final Expression right;

        And(final Expression left, final Expression right) {
            this.left = left;
            this.right = right;
        }

        @Override
        public boolean evaluate(final List<String> variables) {
            return left.evaluate(variables) && right.evaluate(variables);
        }

        @Override
        public String toString() {
            return "( " + left.toString() + " and " + right.toString() + " )";
        }
    }

    private class Not implements Expression {
        private final Expression expr;

        Not(final Expression expr) {
            this.expr = expr;
        }

        @Override
        public boolean evaluate(final List<String> variables) {
            return !expr.evaluate(variables);
        }

        @Override
        public String toString() {
            return "not ( " + expr.toString() + " )";
        }
    }

    private class True implements Expression {
        @Override
        public boolean evaluate(final List<String> variables) {
            return true;
        }
    }
}
