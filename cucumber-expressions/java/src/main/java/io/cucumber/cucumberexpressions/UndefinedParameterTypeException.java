package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Node;
import org.apiguardian.api.API;

@API(status = API.Status.STABLE)
public final class UndefinedParameterTypeException extends CucumberExpressionException {
    private final String undefinedParameterTypeName;

    UndefinedParameterTypeException(String message, String undefinedParameterTypeName) {
        super(message);
        this.undefinedParameterTypeName = undefinedParameterTypeName;
    }

    public String getUndefinedParameterTypeName() {
        return undefinedParameterTypeName;
    }

    static CucumberExpressionException createUndefinedParameterType(Node node, String expression, String undefinedParameterTypeName) {
        return new UndefinedParameterTypeException(message(
                node.start(),
                expression,
                pointAt(node),
                "Undefined parameter type '" +undefinedParameterTypeName+ "'",
                "Please register a ParameterType for '"+undefinedParameterTypeName+"'"), undefinedParameterTypeName);
    }
}
