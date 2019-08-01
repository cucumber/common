package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

@API(status = API.Status.STABLE)
public class CucumberExpressionException extends RuntimeException {
    CucumberExpressionException(String message) {
        super(message);
    }

    CucumberExpressionException(String message, Throwable cause) {
        super(message, cause);
    }
}
