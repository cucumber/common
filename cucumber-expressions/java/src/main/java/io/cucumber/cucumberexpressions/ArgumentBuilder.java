package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class ArgumentBuilder {
    static List<Argument> buildArguments(Pattern pattern, String text, List<ParameterType<?>> parameterTypes) {
        Matcher matcher = pattern.matcher(text);
        if (matcher.lookingAt()) {
            if (matcher.groupCount() != parameterTypes.size()) {
                throw new RuntimeException(String.format("Expression has %s arguments, but there were %s parameterTypes", matcher.groupCount(), parameterTypes.size()));
            }
            List<Argument> arguments = new ArrayList<>(matcher.groupCount());
            for (int i = 0; i < matcher.groupCount(); i++) {
                int startIndex = matcher.start(i + 1);
                String value = matcher.group(i + 1);
                ParameterType parameterType = parameterTypes.get(i);

                arguments.add(new Argument(startIndex, value, parameterType));
            }
            return arguments;
        } else {
            return null;
        }

    }
}
