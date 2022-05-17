package io.cucumber.gherkin;

class GherkinException extends RuntimeException {
    public GherkinException(String message, Throwable cause) {
        super(message, cause);
    }
}
