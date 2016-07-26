package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegularExpression implements Expression {
    private static final Pattern CAPTURE_GROUP_PATTERN = Pattern.compile("\\(([^(]+)\\)");

    private final Pattern pattern;
    private final List<Transform<?>> transforms;

    public RegularExpression(Pattern pattern, TransformLookup transformLookup) {
        this.pattern = pattern;
        this.transforms = new ArrayList<>();

        Matcher matcher = CAPTURE_GROUP_PATTERN.matcher(pattern.pattern());
        while (matcher.find()) {
            String captureGroupPattern = matcher.group(1);
            Transform transform = transformLookup.lookupByCaptureGroupRegexp(captureGroupPattern);
            if(transform == null) transform = transformLookup.lookup("string");
            transforms.add(transform);
        }
    }

    public RegularExpression(Pattern pattern, List<Transform<?>> transforms) {
        this.pattern = pattern;
        this.transforms = transforms;
    }

    @Override
    public List<Argument> match(String text) {
        return ArgumentMatcher.matchArguments(pattern, text, transforms);
    }

    @Override
    public String getExpression() {
        return pattern.pattern();
    }
}
