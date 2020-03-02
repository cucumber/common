package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

@API(status = API.Status.STABLE)
public final class UndefinedParameterTypeException extends CucumberExpressionException {
    private final String undefinedParameterTypeName;

    UndefinedParameterTypeException(String undefinedParameterTypeName) {
        super(String.format("Undefined parameter type {%s}. Please register a ParameterType for {%s}.", undefinedParameterTypeName, undefinedParameterTypeName));
        this.undefinedParameterTypeName = undefinedParameterTypeName;
    }

    public String getUndefinedParameterTypeName() {
        return undefinedParameterTypeName;
    }
}
