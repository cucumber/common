package io.cucumber.cucumberexpressions;

public class Argument<T> {
    private final String[] groups;
    private final ParameterType<T> parameterType;

    public Argument(String[] groups, ParameterType<T> parameterType) {
        this.groups = groups;
        this.parameterType = parameterType;
    }

    public T getTransformedValue() {
        return parameterType.transform(groups);
    }
}
