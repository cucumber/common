package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegularExpression implements Expression {
    private static final Pattern CAPTURE_GROUP_PATTERN = Pattern.compile("\\(([^(]+)\\)");

    private final Pattern pattern;
    private final List<Parameter<?>> parameters;

    /**
     * Creates a new instance. Use this when the transform types are not known in advance,
     * and should be determined by the regular expression's capture groups. Use this with
     * dynamically typed languages.
     *
     * @param pattern         the regular expression to use
     * @param types           types to convert capture groups to
     * @param parameterRegistry transform lookup
     */
    public RegularExpression(Pattern pattern, List<? extends Type> types, ParameterRegistry parameterRegistry) {
        this.pattern = pattern;
        this.parameters = new ArrayList<>();

        Matcher matcher = CAPTURE_GROUP_PATTERN.matcher(pattern.pattern());
        int typeIndex = 0;
        while (matcher.find()) {
            Type type = types.size() <= typeIndex ? null : types.get(typeIndex++);
            String captureGroupPattern = matcher.group(1);

            Parameter<?> parameter = null;
            if (type != null) {
                parameter = parameterRegistry.lookupByType(type);
            }
            if (parameter == null) {
                parameter = parameterRegistry.lookupByCaptureGroupRegexp(captureGroupPattern);
            }
            if (parameter == null && type != null && type instanceof Class) {
                parameter = new ClassParameter<>((Class) type);
            }
            if (parameter == null) {
                parameter = new ConstructorParameter<>(String.class);
            }
            parameters.add(parameter);
        }
    }

    @Override
    public List<Argument> match(String text) {
        return ArgumentBuilder.buildArguments(pattern, text, parameters);
    }

    @Override
    public String getSource() {
        return pattern.pattern();
    }
}
