package io.cucumber.cucumberexpressions;

import java.util.List;

public class GeneratedExpression {
    private final String expression;
    private final List<String> argumentNames;
    private final List<Parameter<?>> parameters;

    public GeneratedExpression(String expression, List<String> argumentNames, List<Parameter<?>> parameters) {
        this.expression = expression;
        this.argumentNames = argumentNames;
        this.parameters = parameters;
    }

    public String getSource() {
        return expression;
    }

    public List<String> getArgumentNames() {
        return argumentNames;
    }

    public List<Parameter<?>> getParameters() {
        return parameters;
    }
}
