package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegularExpression implements Expression {
    private static final Pattern CAPTURE_GROUP_PATTERN = Pattern.compile("\\(([^(]+)\\)");

    private final Pattern pattern;
    private final List<Transform<?>> transforms;

    /**
     * Creates a new instance. Use this when the transform types are not known in advance,
     * and should be determined by the regular expression's capture groups. Use this with
     * dynamically typed languages.
     *
     * @param pattern         the regular expression to use
     * @param transformLookup transform lookup
     */
    public RegularExpression(Pattern pattern, List<? extends Type> types, TransformLookup transformLookup) {
        this.pattern = pattern;
        this.transforms = new ArrayList<>();

        Matcher matcher = CAPTURE_GROUP_PATTERN.matcher(pattern.pattern());
        int typeIndex = 0;
        while (matcher.find()) {
            Type type = types.size() <= typeIndex ? null : types.get(typeIndex++);
            String captureGroupPattern = matcher.group(1);

            Transform<?> transform = null;
            if (type != null) {
                transform = transformLookup.lookupByType(type);
            }
            if (transform == null) {
                transform = transformLookup.lookupByCaptureGroupRegexp(captureGroupPattern);
            }
            if (transform == null && type != null && type instanceof Class) {
                transform = new ClassTransform<>((Class) type);
            }
            if (transform == null) {
                transform = new ConstructorTransform<>(String.class);
            }
            transforms.add(transform);
        }
    }

    @Override
    public List<Argument> match(String text) {
        return ArgumentMatcher.matchArguments(pattern, text, transforms);
    }

    @Override
    public String getSource() {
        return pattern.pattern();
    }
}
