package io.cucumber.cucumberexpressions;

import java.util.List;

public class Argument<T> {
    private final List<Group> groups;
    private final ParameterType<T> parameterType;

    public Argument(List<Group> groups, ParameterType<T> parameterType) {
        this.groups = groups;
        this.parameterType = parameterType;
    }

    public T getTransformedValue() {
        return parameterType.transform(groups);
    }

    public List<Group> getGroups() {
        return groups;
    }
}
