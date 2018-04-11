package io.cucumber.cucumberexpressions;

public class UndefinedParameterTypeException extends CucumberExpressionException {
    UndefinedParameterTypeException(String typeName) {
        super(String.format("Undefined parameter type {%s}. Please register a ParameterType for {%s}", typeName, typeName));
    }
}
