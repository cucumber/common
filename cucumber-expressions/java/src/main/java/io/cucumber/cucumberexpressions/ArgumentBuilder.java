package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class ArgumentBuilder {

    static List<Argument> buildArguments(Pattern pattern, String text, List<ParameterType<?>> parameterTypes) {
        Matcher matcher = pattern.matcher(text);
        if (!matcher.lookingAt()) return null;

        Group matchGroup = new Group(matcher);

        List<Group> argGroups = matchGroup.getChildren();
        if (argGroups.size() != parameterTypes.size()) {
            throw new CucumberExpressionException(String.format("Expression has %s arguments, but there were %s parameterTypes", argGroups.size(), parameterTypes.size()));
        }

        List<Argument> args = new ArrayList<>(argGroups.size());
        for (int i = 0; i < parameterTypes.size(); i++) {
            Group argGroup = i < argGroups.size() ? argGroups.get(i) : null;
            String[] groups;
            if (argGroup != null) {
                if (argGroup.getChildren().isEmpty()) {
                    groups = new String[]{argGroup.getValue()};
                } else {
                    groups = new String[argGroup.getChildren().size()];
                    int g = 0;
                    for (Group group : argGroup.getChildren()) {
                        groups[g++] = group.getValue();
                    }
                }
            } else {
                groups = null;
            }
            ParameterType<?> parameterType = parameterTypes.get(i);
            Argument<?> argument = new Argument<>(groups, parameterType);
            args.add(argument);
        }
        return args;
    }
}
