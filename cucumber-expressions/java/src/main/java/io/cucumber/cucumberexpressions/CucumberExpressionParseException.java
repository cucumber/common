package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Token;
import io.cucumber.cucumberexpressions.Ast.Token.Type;

import java.util.List;
import java.util.stream.Collectors;

class CucumberExpressionParseException extends CucumberExpressionException {

    CucumberExpressionParseException(String message) {
        super(message);
    }

    static CucumberExpressionException createMissingEndTokenException(Type beginToken, Type endToken, List<Token> expression, int current) {
        String expr = expression.stream().map(token -> token.text).collect(Collectors.joining());
        int currentInExpr = expression.stream().limit(current).mapToInt(value -> value.text.length()).sum();
        StringBuilder pointer = new StringBuilder();
        for (int i = 0; i < currentInExpr; i++) {
            pointer.append(" ");
        }
        pointer.append("^");

        return new CucumberExpressionParseException(
                new StringBuilder()
                        .append("This Cucumber Expression has problem:").append("\n")
                        .append("\n")
                        .append(expr).append("\n")
                        .append(pointer).append("\n")
                        .append("The '").appendCodePoint(beginToken.codePoint()).append("' at ").append(pointer.length()).append(" did not have a matching '").appendCodePoint(endToken.codePoint()).append("'. ").append("\n")
                        .append("If you did not intended to use ").append(beginToken.getPurpose()).append(" you can use '\\").appendCodePoint(beginToken.codePoint()).append("' to escape the ").append(beginToken.getPurpose()).append("\n")
                        .toString());
    }
}
