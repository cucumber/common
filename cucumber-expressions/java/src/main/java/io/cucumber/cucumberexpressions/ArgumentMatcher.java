package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class ArgumentMatcher {
    static List<Argument> matchArguments(Pattern pattern, String text, List<Transform<?>> transforms) {
        Matcher matcher = pattern.matcher(text);
        if (matcher.lookingAt()) {
            if (matcher.groupCount() != transforms.size()) {
                throw new RuntimeException(String.format("Expression has %s arguments, but there were %s transforms", matcher.groupCount(), transforms.size()));
            }
            List<Argument> arguments = new ArrayList<>(matcher.groupCount());
            for (int i = 0; i < matcher.groupCount(); i++) {
                int startIndex = matcher.start(i + 1);
                String value = matcher.group(i + 1);

                Transform transform = transforms.get(i);
                Object transformedValue = transform.transform(value);

                arguments.add(new Argument(startIndex, transformedValue));
            }
            return arguments;
        } else {
            return null;
        }

    }
}
