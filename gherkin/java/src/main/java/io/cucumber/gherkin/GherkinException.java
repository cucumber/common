package io.cucumber.gherkin;

public class GherkinException extends RuntimeException {
    public GherkinException(String message) {
        super(message);
    }

    public GherkinException(Exception e) {
        super(e);
    }
}
