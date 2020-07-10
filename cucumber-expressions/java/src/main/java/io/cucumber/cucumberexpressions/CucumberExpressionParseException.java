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
        String expression = createExpressionString(tokens);
        StringBuilder pointer = createPointer(tokens, current);
        return new CucumberExpressionParseException(
                "This Cucumber Expression has problem:" + "\n" +
                        "\n" +
                        expression + "\n" +
                        pointer + "\n" +
                        "The '" + beginToken.symbol() + "' at " + pointer.length() + " did not have a matching '" + endToken.symbol() + "'. " + "\n" +
                        "If you did not intended to use " + beginToken.getPurpose() + " you can use '\\" + beginToken.symbol() + "' to escape the " + beginToken.getPurpose() + "\n");
    }

    private static String createExpressionString(List<Token> expression) {
        return expression.stream().map(token -> token.text).collect(Collectors.joining());
    }

    private static StringBuilder createPointer(List<Token> expression, int current) {
        int currentInExpr = expression.stream().limit(current).mapToInt(value -> value.text.length()).sum();
        StringBuilder pointer = new StringBuilder();
        for (int i = 0; i < currentInExpr; i++) {
            pointer.append(" ");
        }
        pointer.append("^");
        return pointer;
    }

}
