package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@API(status = API.Status.STABLE)
public final class Argument<T> {
    private final ParameterType<T> parameterType;
    private final Group group;

    static List<Argument<?>> build(Group group, List<ParameterType<?>> parameterTypes) {
        List<Group> argGroups = group.getChildren();

        if (argGroups.size() != parameterTypes.size()) {
            // This requires regex injection through a Cucumber expression.
            // Regex injection should be be possible any more.
            throw new IllegalArgumentException(String.format("Group has %s capture groups, but there were %s parameter types", argGroups.size(), parameterTypes.size()));
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
