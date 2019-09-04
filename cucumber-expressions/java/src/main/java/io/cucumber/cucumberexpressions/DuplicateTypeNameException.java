package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

@API(status = API.Status.STABLE)
public class DuplicateTypeNameException extends CucumberExpressionException {
    DuplicateTypeNameException(String message) {
        super(message);
    }
}
