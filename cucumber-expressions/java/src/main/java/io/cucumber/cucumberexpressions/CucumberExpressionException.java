package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.AstNode;
import io.cucumber.cucumberexpressions.Ast.Token;
import io.cucumber.cucumberexpressions.Ast.Token.Type;
import org.apiguardian.api.API;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@API(status = API.Status.STABLE)
public class CucumberExpressionException extends RuntimeException {

    CucumberExpressionException(String message) {
        super(message);
    }

    CucumberExpressionException(String message, Throwable cause) {
        super(message, cause);
    }

    static CucumberExpressionException createCaptureGroupParameterTypeMisMatch(TreeRegexp treeRegexp,
            List<ParameterType<?>> parameterTypes, List<Group> argGroups) {
        return new CucumberExpressionException(
                String.format("Expression /%s/ has %s capture groups (%s), but there were %s parameter types (%s)",
                        treeRegexp.pattern().pattern(),
                        argGroups.size(),
                        getGroupValues(argGroups),
                        parameterTypes.size(),
                        getParameterTypeNames(parameterTypes)
                ));
    }

    private static List<String> getParameterTypeNames(List<ParameterType<?>> parameterTypes) {
        List<String> list = new ArrayList<>();
        for (ParameterType<?> type : parameterTypes) {
            String name = type.getName();
            list.add(name);
        }
        return list;
    }

    private static List<Object> getGroupValues(List<Group> argGroups) {
        List<Object> list = new ArrayList<>();
        for (Group argGroup : argGroups) {
            String value = argGroup.getValue();
            list.add(value);
        }
        return list;
    }

    static CucumberExpressionException createMissingEndTokenException(Type beginToken, Type endToken,
            List<Token> tokens, int current) {
        return new CucumberExpressionException(message(
                currentTokenIndex(tokens, current),
                expressionOf(tokens),
                pointAt(tokens.get(current)),
                "The '" + beginToken.symbol() + "' does not have a matching '" + endToken.symbol() + "'",
                "If you did not intend to use " + beginToken.purpose() + " you can use '\\" + beginToken
                        .symbol() + "' to escape the " + beginToken.purpose()));
    }

    private static String expressionOf(List<Token> expression) {
        return expression.stream().map(token -> token.text).collect(Collectors.joining());
    }

    private static int currentTokenIndex(List<Token> expression, int current) {
        return expression.stream().limit(current).mapToInt(value -> value.text.length()).sum();
    }

    static CucumberExpressionException createTheEndOfLineCanNotBeEscapedException(String expression) {
        int index = expression.length();
        return new CucumberExpressionException(message(
                index,
                expression,
                pointAt(index),
                "The end of line can not be escaped",
                "You can use '\\\\' to escape the the '\\'"
        ));
    }

    static CucumberExpressionException createAlternativeIsEmpty(String expression, AstNode node) {
        return new CucumberExpressionException(message(
                node.start(),
                expression,
                pointAt(node),
                "Alternative may not be empty",
                "If you did not mean to use an alternative you can use '\\/' to escape the the '/'"));
    }

    public static CucumberExpressionException createParameterIsNotAllowedHere(AstNode node, String expression,
            String message) {
        return new CucumberExpressionException(message(
                node.start(),
                expression,
                pointAt(node),
                message,
                "If you did not mean to use an alternative you can use '\\{' to escape the the '{'"));
    }

    private static String thisCucumberExpressionHasAProblemAt(int index) {
        return "This Cucumber Expression has problem at column " + (index + 1) + ":" + "\n";
    }

    static CucumberExpressionException createCantEscape(String expression, int index) {
        return new CucumberExpressionException(message(
                index,
                expression,
                pointAt(index),
                "Only the characters '{', '}', '(', ')', '\\', '/' and whitespace can be escaped",
                "If you did mean to use an '\\' you can use '\\\\' to escape it"));
    }

    private static String message(int index, String expression, StringBuilder pointer, String problem,
            String solution) {
        return thisCucumberExpressionHasAProblemAt(index) +
                "\n" +
                expression + "\n" +
                pointer + "\n" +
                problem + ".\n" +
                solution;
    }

    private static StringBuilder pointAt(int index) {
        StringBuilder pointer = new StringBuilder();
        for (int i = 0; i < index; i++) {
            pointer.append(" ");
        }
        pointer.append("^");
        return pointer;
    }

    //TODO: Dedupe
    private static StringBuilder pointAt(AstNode node) {
        StringBuilder pointer = new StringBuilder();
        for (int i = 0; i < node.start(); i++) {
            pointer.append(" ");
        }
        pointer.append("^");
        if (node.start() + 1 < node.end()) {
            for (int i = node.start() + 1; i < node.end() - 1; i++) {
                pointer.append("-");
            }
            pointer.append("^");
        }
        return pointer;
    }

    private static StringBuilder pointAt(Token token) {
        StringBuilder pointer = new StringBuilder();
        for (int i = 0; i < token.start(); i++) {
            pointer.append(" ");
        }
        pointer.append("^");
        if (token.start() + 1 < token.end()) {
            for (int i = token.start() + 1; i < token.end() - 1; i++) {
                pointer.append("-");
            }
            pointer.append("^");
        }
        return pointer;
    }

}
