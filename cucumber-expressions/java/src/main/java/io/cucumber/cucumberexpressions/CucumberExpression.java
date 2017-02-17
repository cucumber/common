package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CucumberExpression implements Expression {
    private static final Pattern ESCAPE_PATTERN = Pattern.compile("([\\\\\\^\\[$.|?*+\\]])");
    private static final Pattern PARAMETER_PATTERN = Pattern.compile("\\{([^}:]+)(:([^}]+))?}");
    private static final Pattern OPTIONAL_PATTERN = Pattern.compile("\\(([^)]+)\\)");

    private final Pattern pattern;
    private final List<Parameter<?>> parameters = new ArrayList<>();
    private final String expression;

    public CucumberExpression(final String expression, List<? extends Type> types, ParameterRegistry parameterRegistry) {
        this.expression = expression;
        String escapedExpression = ESCAPE_PATTERN.matcher(expression).replaceAll("\\\\$1");
        String expressionWithOptionalGroups = OPTIONAL_PATTERN.matcher(escapedExpression).replaceAll("(?:$1)?");
        Matcher matcher = PARAMETER_PATTERN.matcher(expressionWithOptionalGroups);

        StringBuffer regexp = new StringBuffer();
        regexp.append("^");
        int typeIndex = 0;
        while (matcher.find()) {
            String parameterName = matcher.group(1);
            String typeName = matcher.group(3);
            if (typeName != null) {
                System.err.println(String.format("Cucumber expression parameter syntax {%s:%s} is deprecated. Please use {%s} instead.", parameterName, typeName, typeName));
            }

            Type type = types.size() <= typeIndex ? null : types.get(typeIndex++);

            Parameter<?> parameter = null;
            if (type != null) {
                parameter = parameterRegistry.lookupByType(type);
            }
            if (parameter == null && typeName != null) {
                parameter = parameterRegistry.lookupByTypeName(typeName);
            }
            if (parameter == null) {
                parameter = parameterRegistry.lookupByTypeName(parameterName);
            }
            if (parameter == null && type != null && type instanceof Class) {
                parameter = new ClassParameter<>((Class) type);
            }
            if (parameter == null) {
                parameter = new ConstructorParameter<>(String.class);
            }
            parameters.add(parameter);

            matcher.appendReplacement(regexp, Matcher.quoteReplacement(getCaptureGroupRegexp(parameter.getCaptureGroupRegexps())));
        }
        matcher.appendTail(regexp);
        regexp.append("$");

        pattern = Pattern.compile(regexp.toString());
    }

    private String getCaptureGroupRegexp(List<String> captureGroupRegexps) {
        StringBuilder sb = new StringBuilder("(");

        if (captureGroupRegexps.size() == 1) {
            sb.append(captureGroupRegexps.get(0));
        } else {
            boolean bar = false;
            for (String captureGroupRegexp : captureGroupRegexps) {
                if (bar) sb.append("|");
                sb.append("(?:").append(captureGroupRegexp).append(")");
                bar = true;
            }
        }

        sb.append(")");
        return sb.toString();
    }

    @Override
    public List<Argument> match(String text) {
        return ArgumentBuilder.buildArguments(pattern, text, parameters);
    }

    @Override
    public String getSource() {
        return expression;
    }

    Pattern getPattern() {
        return pattern;
    }
}
