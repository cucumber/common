package io.cucumber.cucumberexpressions;

public class CucumberExpressionException extends RuntimeException {
    public CucumberExpressionException(String message) {
        super(message);
    }

    public CucumberExpressionException(String message, Throwable cause) {
        super(message, cause);
    }
}
