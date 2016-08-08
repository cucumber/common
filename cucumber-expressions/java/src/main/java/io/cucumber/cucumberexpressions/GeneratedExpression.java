package io.cucumber.cucumberexpressions;

import java.util.List;

public class GeneratedExpression {
    private final String expression;
    private final List<Transform<?>> transforms;

    public GeneratedExpression(String expression, List<Transform<?>> transforms) {
        this.expression = expression;
        this.transforms = transforms;
    }

    public String getSource() {
        return expression;
    }

    public List<Transform<?>> getTransforms() {
        return transforms;
    }
}
