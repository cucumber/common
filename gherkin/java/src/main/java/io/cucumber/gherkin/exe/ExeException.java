package io.cucumber.gherkin.exe;

public class ExeException extends RuntimeException {
    ExeException(String message) {
        super(message);
    }

    ExeException(String message, Throwable cause) {
        super(message, cause);
    }
}
