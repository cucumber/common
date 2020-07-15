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
        int index = currentTokenIndex(tokens, current);
        return new CucumberExpressionException("" +
                thisCucumberExpressionHasAProblemAt(index) +
                "\n" +
                expressionOf(tokens) + "\n" +
                pointAt(index) + "\n" +
                "The '" + beginToken.symbol() + "' does not have a matching '" + endToken.symbol() + "'. " + "\n" +
                "If you did not intended to use " + beginToken.purpose() + " you can use '\\" + beginToken
                .symbol() + "' to escape the " + beginToken.purpose() + "\n");
    }

    private static String thisPRo(int i) {
        return "This Cucumber Expression has problem at index '" + i + "' :" + "\n";
    }

    private static String expressionOf(List<Token> expression) {
        return expression.stream().map(token -> token.text).collect(Collectors.joining());
    }

    private static int currentTokenIndex(List<Token> expression, int current) {
        return expression.stream().limit(current).mapToInt(value -> value.text.length()).sum();
    }

    static CucumberExpressionException createTheEndOfLineCanNotBeEscapedException(String expression) {
        return new CucumberExpressionException(thisCucumberExpressionHasAProblemAt(expression.length()) +
                "\n" +
                expression + "\n" +
                pointAt(expression.length()) + "\n" +
                "The end of line can not be escaped. You can use '\\\\' to escape the the '\\'");
    }

    private static StringBuilder pointAt(int index) {
        StringBuilder pointer = new StringBuilder();
        for (int i = 0; i < index; i++) {
            pointer.append(" ");
        }
        pointer.append("^");
        return pointer;
    }

    static CucumberExpressionException createAlternativeIsEmpty(String expression, AstNode node) {
        return new CucumberExpressionException(thisCucumberExpressionHasAProblemAt(node.start()) +
                "\n" +
                expression + "\n" +
                pointAt(node.start()) + "\n" +
                "Alternative may not be empty. If you did not mean to use an alternative you can use '\\\\' to escape the the '\\'");
    }

    private static String thisCucumberExpressionHasAProblemAt(int index) {
        return "This Cucumber Expression has problem at column " + (index+1) + ":" + "\n";
    }

    static CucumberExpressionException createCantEscape(String expression, int index) {
        return new CucumberExpressionException(thisCucumberExpressionHasAProblemAt(index) +
                "\n" +
                expression + "\n" +
                pointAt(index) + "\n" +
                "Only the characters '{', '}', '(', ')', '\\', '/' and whitespace can be escaped. If you did mean to use an '\\' you can use '\\\\' to escape it");
    }

}
