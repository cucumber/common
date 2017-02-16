package io.cucumber.cucumberexpressions;

import java.util.List;

public class GeneratedExpression {
    private final String expression;
    private final List<String> parameterNames;
    private final List<Parameter<?>> parameters;

    public GeneratedExpression(String expression, List<String> parameterNames, List<Parameter<?>> parameters) {
        this.expression = expression;
        this.parameterNames = parameterNames;
        this.parameters = parameters;
    }

    public String getSource() {
        return expression;
    }

    public List<String> getParameterNames() {
        return parameterNames;
    }

    public List<Parameter<?>> getParameters() {
        return parameters;
    }
}
