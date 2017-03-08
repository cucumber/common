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
    private static final Pattern ALTERNATIVE_WORD_REGEXP = Pattern.compile("([\\p{IsAlphabetic}]+)((/[\\p{IsAlphabetic}]+)+)");

    private final Pattern pattern;
    private final List<ParameterType<?>> parameterTypes = new ArrayList<>();
    private final String expression;

    public CucumberExpression(String expression, List<? extends Type> types, ParameterTypeRegistry parameterTypeRegistry) {
        this.expression = expression;
        expression = ESCAPE_PATTERN.matcher(expression).replaceAll("\\\\$1");
        expression = OPTIONAL_PATTERN.matcher(expression).replaceAll("(?:$1)?");

        Matcher m = ALTERNATIVE_WORD_REGEXP.matcher(expression);
        StringBuffer sb = new StringBuffer();
        while (m.find()) {
            m.appendReplacement(sb, "(?:" + m.group(1) + m.group(2).replace('/', '|') + ")");
        }
        m.appendTail(sb);

        Matcher matcher = PARAMETER_PATTERN.matcher(sb.toString());

        StringBuffer regexp = new StringBuffer();
        regexp.append("^");
        int typeIndex = 0;
        while (matcher.find()) {
            String parameterName = matcher.group(1);
            String parameterTypeName = matcher.group(3);
            if (parameterTypeName != null) {
                System.err.println(String.format("Cucumber expression parameter type syntax {%s:%s} is deprecated. Please use {%s} instead.", parameterName, parameterTypeName, parameterTypeName));
            }

            Type type = types.size() <= typeIndex ? null : types.get(typeIndex++);

            ParameterType<?> parameterType = null;
            if (type != null) {
                parameterType = parameterTypeRegistry.lookupByType(type);
            }
            if (parameterType == null && parameterTypeName != null) {
                parameterType = parameterTypeRegistry.lookupByTypeName(parameterTypeName);
            }
            if (parameterType == null) {
                parameterType = parameterTypeRegistry.lookupByTypeName(parameterName);
            }
            if (parameterType == null && type != null && type instanceof Class) {
                parameterType = new ClassParameterType<>((Class) type);
            }
            if (parameterType == null) {
                parameterType = new ConstructorParameterType<>(String.class);
            }
            parameterTypes.add(parameterType);

            matcher.appendReplacement(regexp, Matcher.quoteReplacement(getCaptureGroupRegexp(parameterType.getRegexps())));
        }
        matcher.appendTail(regexp);
        regexp.append("$");

        pattern = Pattern.compile(regexp.toString());
    }

    private String getCaptureGroupRegexp(List<String> regexps) {
        StringBuilder sb = new StringBuilder("(");

        if (regexps.size() == 1) {
            sb.append(regexps.get(0));
        } else {
            boolean bar = false;
            for (String captureGroupRegexp : regexps) {
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
        return ArgumentBuilder.buildArguments(pattern, text, parameterTypes);
    }

    @Override
    public String getSource() {
        return expression;
    }

    Pattern getPattern() {
        return pattern;
    }
}
