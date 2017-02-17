package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class ArgumentBuilder {
    static List<Argument> buildArguments(Pattern pattern, String text, List<Parameter<?>> parameters) {
        Matcher matcher = pattern.matcher(text);
        if (matcher.lookingAt()) {
            if (matcher.groupCount() != parameters.size()) {
                throw new RuntimeException(String.format("Expression has %s arguments, but there were %s parameters", matcher.groupCount(), parameters.size()));
            }
            List<Argument> arguments = new ArrayList<>(matcher.groupCount());
            for (int i = 0; i < matcher.groupCount(); i++) {
                int startIndex = matcher.start(i + 1);
                String value = matcher.group(i + 1);
                Parameter parameter = parameters.get(i);

                arguments.add(new Argument(startIndex, value, parameter));
            }
            return arguments;
        } else {
            return null;
        }

    }
}
