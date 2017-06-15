package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.Collections.singletonList;

public class RegularExpression implements Expression {
    private static final Pattern CAPTURE_GROUP_PATTERN = Pattern.compile("\\((?!\\?:)([^(]+)\\)");

    private final Pattern expressionRegexp;
    private final ParameterTypeRegistry parameterTypeRegistry;

    /**
     * Creates a new instance. Use this when the transform types are not known in advance,
     * and should be determined by the regular expression's capture groups. Use this with
     * dynamically typed languages.
     *
     * @param expressionRegexp               the regular expression to use
     * @param parameterTypeRegistry used to look up parameter types
     */
    public RegularExpression(Pattern expressionRegexp, ParameterTypeRegistry parameterTypeRegistry) {
        this.expressionRegexp = expressionRegexp;
        this.parameterTypeRegistry = parameterTypeRegistry;
    }

    @Override
    public List<Argument> match(String text) {
        List<ParameterType<?>> parameterTypes = new ArrayList<>();

        Matcher matcher = CAPTURE_GROUP_PATTERN.matcher(expressionRegexp.pattern());
        while (matcher.find()) {
            String parameterTypeRegexp = matcher.group(1);

            ParameterType<?> parameterType = parameterTypeRegistry.lookupByRegexp(parameterTypeRegexp, expressionRegexp, text);
            if (parameterType == null) {
                parameterType = new ConstructorParameterType<>(String.class, singletonList(parameterTypeRegexp));
            }
            parameterTypes.add(parameterType);
        }

        return ArgumentBuilder.buildArguments(expressionRegexp, text, parameterTypes);
    }

    @Override
    public String getSource() {
        return expressionRegexp.pattern();
    }
}
