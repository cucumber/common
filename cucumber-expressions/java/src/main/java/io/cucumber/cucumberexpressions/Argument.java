package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Argument<T> {
    private final ParameterType<T> parameterType;
    private final Group group;

    static List<Argument<?>> build(Pattern pattern, String text, List<ParameterType<?>> parameterTypes) {
        Matcher matcher = pattern.matcher(text);
        if (!matcher.lookingAt()) return null;

        Group matchGroup = new Group(matcher);
        List<Group> argGroups = matchGroup.getChildren();
        if (argGroups.size() != parameterTypes.size()) {
            throw new CucumberExpressionException(String.format("Expression has %s arguments, but there were %s parameter types", argGroups.size(), parameterTypes.size()));
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

    public T getValue() {
        return parameterType.transform(group == null ? null : group.getValues());
    }
}
