package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegularExpression implements Expression {
    private static final Pattern CAPTURE_GROUP_PATTERN = Pattern.compile("\\(([^(]+)\\)");

    private final Pattern pattern;
    private final List<? extends Type> types;
    private final ParameterTypeRegistry parameterTypeRegistry;

    /**
     * Creates a new instance. Use this when the transform types are not known in advance,
     * and should be determined by the regular expression's capture groups. Use this with
     * dynamically typed languages.
     *
     * @param pattern               the regular expression to use
     * @param types                 types to convert capture groups to
     * @param parameterTypeRegistry used to look up parameter types
     */
    public RegularExpression(Pattern pattern, List<? extends Type> types, ParameterTypeRegistry parameterTypeRegistry) {
        this.pattern = pattern;
        this.types = types;
        this.parameterTypeRegistry = parameterTypeRegistry;
    }

    @Override
    public List<Argument> match(String text) {
        List<ParameterType<?>> parameterTypes = new ArrayList<>();

        Matcher matcher = CAPTURE_GROUP_PATTERN.matcher(pattern.pattern());
        int typeIndex = 0;
        while (matcher.find()) {
            Type type = types.size() <= typeIndex ? null : types.get(typeIndex++);
            String captureGroupPattern = matcher.group(1);

            ParameterType<?> parameterType = null;
            if (type != null) {
                parameterType = parameterTypeRegistry.lookupByType(type);
            }
            if (parameterType == null) {
                parameterType = parameterTypeRegistry.lookupByRegexp(captureGroupPattern, pattern, text);
            }
            if (parameterType == null && type != null && type instanceof Class) {
                parameterType = new ClassParameterType<>((Class) type);
            }
            if (parameterType == null) {
                parameterType = new ConstructorParameterType<>(String.class);
            }
            parameterTypes.add(parameterType);
        }

        return ArgumentBuilder.buildArguments(pattern, text, parameterTypes);
    }

    @Override
    public String getSource() {
        return pattern.pattern();
    }
}
