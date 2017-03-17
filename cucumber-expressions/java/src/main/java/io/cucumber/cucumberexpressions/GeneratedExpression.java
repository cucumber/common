package io.cucumber.cucumberexpressions;

import java.util.List;

public class GeneratedExpression {
    private final String expression;
    private final List<String> parameterNames;
    private final List<ParameterType<?>> parameterTypes;

    public GeneratedExpression(String expression, List<String> parameterNames, List<ParameterType<?>> parameterTypes) {
        this.expression = expression;
        this.parameterNames = parameterNames;
        this.parameterTypes = parameterTypes;
    }

    public String getSource() {
        return expression;
    }

    public List<String> getParameterNames() {
        return parameterNames;
    }

    public List<ParameterType<?>> getParameterTypes() {
        return parameterTypes;
    }
}
