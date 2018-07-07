package io.cucumber.gherkin;

public class GherkinException extends RuntimeException {
    GherkinException(String message, Throwable cause) {
        super(message, cause);
    }
}
