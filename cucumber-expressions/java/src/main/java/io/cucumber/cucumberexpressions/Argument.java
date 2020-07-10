package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import static io.cucumber.cucumberexpressions.CucumberExpressionException.createCaptureGroupParameterTypeMisMatch;

@API(status = API.Status.STABLE)
public final class Argument<T> {
    private final ParameterType<T> parameterType;
    private final Group group;

    static List<Argument<?>> build(Group group, TreeRegexp treeRegexp, List<ParameterType<?>> parameterTypes) {
        List<Group> argGroups = group.getChildren();

        if (argGroups.size() != parameterTypes.size()) {
            throw createCaptureGroupParameterTypeMisMatch(treeRegexp, parameterTypes, argGroups);
        }
        List<Argument<?>> args = new ArrayList<>(argGroups.size());
        for (int i = 0; i < parameterTypes.size(); i++) {
            Group argGroup = argGroups.get(i);
            ParameterType<?> parameterType = parameterTypes.get(i);
            args.add(new Argument<>(argGroup, parameterType));
        }

        return args;
    }

    private Argument(Group group, ParameterType<T> parameterType) {
        this.group = group;
        this.parameterType = parameterType;
    }

    public Group getGroup() {
        return group;
    }

    public T getValue() {
        return parameterType.transform(group.getValues());
    }

    public Type getType() {
        return parameterType.getType();
    }

    public ParameterType<T> getParameterType() {
        return parameterType;
    }
}
