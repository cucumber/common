package io.cucumber.cucumberexpressions;

public class CucumberExpressionException extends RuntimeException {
    CucumberExpressionException(String message) {
        super(message);
    }

    CucumberExpressionException(String message, Throwable cause) {
        super(message, cause);
    }
}
