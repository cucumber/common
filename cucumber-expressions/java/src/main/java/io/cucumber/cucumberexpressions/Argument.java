package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

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
                    getGroupValues(argGroups),
                    parameterTypes.size(),
                    getParameterTypeNames(parameterTypes)
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

    private static List<String> getParameterTypeNames(List<ParameterType<?>> parameterTypes) {
        List<String> list = new ArrayList<>();
        for (ParameterType<?> type : parameterTypes) {
            String name = type.getName();
            list.add(name);
        }
        return list;
    }

    private static List<Object> getGroupValues(List<Group> argGroups) {
        List<Object> list = new ArrayList<>();
        for (Group argGroup : argGroups) {
            String value = argGroup.getValue();
            list.add(value);
        }
        return list;
    }

    public Argument(Group group, ParameterType<T> parameterType) {
        this.group = group;
        this.parameterType = parameterType;
    }

    public Group getGroup() {
        return group;
    }

    public T getValue() {
        return parameterType.transform(group.getValues());
    }

    public Type getType(){
        return parameterType.getType();
    }
}
