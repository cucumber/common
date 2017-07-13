package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Argument<T> {
    private final ParameterType<T> parameterType;
    private final Group group;

    static List<Argument<?>> build(TreeRegexp treeRegexp, List<ParameterType<?>> parameterTypes, String text) {
        Group group = treeRegexp.match(text);
        if (group == null) return null;

        List<Group> argGroups = group.getChildren();

        if (argGroups.size() != parameterTypes.size()) {
            throw new CucumberExpressionException(String.format("Expression /%s/ has %s capture groups (%s), but there were %s parameter types (%s)",
                    treeRegexp.pattern().pattern(),
                    argGroups.size(),
                    argGroups.stream().map(Group::getValue).collect(Collectors.toList()),
                    parameterTypes.size(),
                    parameterTypes.stream().map(ParameterType::getName).collect(Collectors.toList())
            ));
        }
        List<Argument<?>> args = new ArrayList<>(argGroups.size());
        for (int i = 0; i < parameterTypes.size(); i++) {
            Group argGroup = argGroups.get(i);
            ParameterType<?> parameterType = parameterTypes.get(i);
            args.add(new Argument<>(argGroup, parameterType));
        }

        return args;
    }

    public Argument(Group group, ParameterType<T> parameterType) {
        this.group = group;
        this.parameterType = parameterType;
    }

    public Group getGroup() {
        return group;
    }

    public T getValue() {
        return parameterType.transform(group == null ? null : group.getValues());
    }
}
