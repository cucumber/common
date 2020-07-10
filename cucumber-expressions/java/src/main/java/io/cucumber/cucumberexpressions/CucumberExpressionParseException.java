package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Token;
import io.cucumber.cucumberexpressions.Ast.Token.Type;

import java.util.List;
import java.util.stream.Collectors;

class CucumberExpressionParseException extends CucumberExpressionException {

    CucumberExpressionParseException(String message) {
        super(message);
    }

    static CucumberExpressionException createMissingEndTokenException(Type beginToken, Type endToken, List<Token> tokens, int current) {
        return new CucumberExpressionParseException(
                "This Cucumber Expression has problem:" + "\n" +
                        "\n" +
                        expressionOf(tokens) + "\n" +
                        pointAtCurrentToken(tokens, current) + "\n" +
                        "The '" + beginToken.symbol() + "' at " + pointAtCurrentToken(tokens, current).length() + " did not have a matching '" + endToken.symbol() + "'. " + "\n" +
                        "If you did not intended to use " + beginToken.purpose() + " you can use '\\" + beginToken.symbol() + "' to escape the " + beginToken.purpose() + "\n");
    }

    private static String expressionOf(List<Token> expression) {
        return expression.stream().map(token -> token.text).collect(Collectors.joining());
    }

    private static StringBuilder pointAtCurrentToken(List<Token> expression, int current) {
        int currentInExpr = expression.stream().limit(current).mapToInt(value -> value.text.length()).sum();
        StringBuilder pointer = new StringBuilder();
        for (int i = 0; i < currentInExpr; i++) {
            pointer.append(" ");
        }
        pointer.append("^");
        return pointer;
    }

}
