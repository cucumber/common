package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.Collections.singletonList;

class ArgumentBuilder {

    static List<Argument> buildArguments(Pattern pattern, String text, List<ParameterType<?>> parameterTypes) {
        Matcher matcher = pattern.matcher(text);
        if (matcher.lookingAt()) {
            Group matchGroup = new Group(matcher);

            List<Group> argGroups = matchGroup.getChildren();
//            if (argGroups.size() != parameterTypes.size()) {
//                throw new CucumberExpressionException(String.format("Expression has %s arguments, but there were %s parameterTypes", argGroups.size(), parameterTypes.size()));
//            }

            List<Argument> arguments = new ArrayList<>(argGroups.size());
            for (int i = 0; i < parameterTypes.size(); i++) {
                Group argGroup = i < argGroups.size() ? argGroups.get(i) : null;
                List<Group> args;
                if (argGroup != null) {
                    args = argGroup.getChildren().isEmpty() ? singletonList(argGroup) : argGroup.getChildren();
                } else {
                    args = null;
                }
                ParameterType<?> parameterType = parameterTypes.get(i);
                Argument<?> argument = new Argument<>(args, parameterType);
                arguments.add(argument);
            }
            return arguments;
        } else {
            return null;
        }

    }
}
