package io.cucumber.cucumberexpressions;

public class CucumberExpressionException extends RuntimeException {
    public CucumberExpressionException(String message, Object... args) {
        super(String.format(message, args));
    }
}
