package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

@API(status = API.Status.STABLE)
public final class UndefinedParameterTypeException extends CucumberExpressionException {
    UndefinedParameterTypeException(String typeName) {
        super(String.format("Undefined parameter type {%s}. Please register a ParameterType for {%s}.", typeName, typeName));
    }
}
