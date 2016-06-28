package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.regex.Pattern;

public class RegularExpression implements Expression {
    private final Pattern pattern;
    private final List<Transform<?>> transforms;

    public RegularExpression(Pattern pattern, List<Transform<?>> transforms) {
        this.pattern = pattern;
        this.transforms = transforms;
    }

    @Override
    public List<Argument> match(String text) {
        return ArgumentMatcher.matchArguments(pattern, text, transforms);
    }
}
