package io.cucumber.cucumberexpressions;

import java.util.List;

public class GeneratedExpression {
    private final String expression;
    private final List<String> argumentNames;
    private final List<Transform<?>> transforms;

    public GeneratedExpression(String expression, List<String> argumentNames, List<Transform<?>> transforms) {
        this.expression = expression;
        this.argumentNames = argumentNames;
        this.transforms = transforms;
    }

    public String getSource() {
        return expression;
    }

    public String getArgumentNames() {
        return argumentNames;
    }

    public List<Transform<?>> getTransforms() {
        return transforms;
    }
}
