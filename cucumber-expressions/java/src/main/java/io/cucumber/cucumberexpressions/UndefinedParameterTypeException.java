package io.cucumber.cucumberexpressions;

public class UndefinedParameterTypeException extends CucumberExpressionException {
    public UndefinedParameterTypeException(String typeName) {
        super(String.format("Undefined parameter type {%s}", typeName));
    }
}
