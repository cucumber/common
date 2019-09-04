package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@API(status = API.Status.STABLE)
public final class CucumberExpression implements Expression {
    // Does not include (){} characters because they have special meaning
    private static final Pattern ESCAPE_PATTERN = Pattern.compile("([\\\\^\\[$.|?*+\\]])");
    @SuppressWarnings("RegExpRedundantEscape") // Android can't parse unescaped braces
    static final Pattern PARAMETER_PATTERN = Pattern.compile("(\\\\\\\\)?\\{([^}]*)\\}");
    private static final Pattern OPTIONAL_PATTERN = Pattern.compile("(\\\\\\\\)?\\(([^)]+)\\)");
    private static final Pattern ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = Pattern.compile("([^\\s^/]+)((/[^\\s^/]+)+)");
    private static final String DOUBLE_ESCAPE = "\\\\";
    private static final String PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE = "Parameter types cannot be alternative: ";
    private static final String PARAMETER_TYPES_CANNOT_BE_OPTIONAL = "Parameter types cannot be optional: ";

    private final List<ParameterType<?>> parameterTypes = new ArrayList<>();
    private final String source;
    private final TreeRegexp treeRegexp;
    private final ParameterTypeRegistry parameterTypeRegistry;

    CucumberExpression(String expression, ParameterTypeRegistry parameterTypeRegistry) {
        this.source = expression;
        this.parameterTypeRegistry = parameterTypeRegistry;

        expression = processEscapes(expression);
        expression = processOptional(expression);
        expression = processAlternation(expression);
        expression = processParameters(expression, parameterTypeRegistry);
        expression = "^" + expression + "$";
        treeRegexp = new TreeRegexp(expression);

    }

    private String processEscapes(String expression) {
        // This will cause explicitly-escaped parentheses to be double-escaped
        return ESCAPE_PATTERN.matcher(expression).replaceAll("\\\\$1");
    }

    private String processAlternation(String expression) {
        Matcher matcher = ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP.matcher(expression);
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            // replace \/ with /
            // replace / with |
            String replacement = matcher.group(0).replace('/', '|').replaceAll("\\\\\\|", "/");

            if (replacement.contains("|")) {
                // Make sure the alternative parts don't contain parameter types
                for (String part : replacement.split("\\|")) {
                    checkNotParameterType(part, PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE);
                }
                matcher.appendReplacement(sb, "(?:" + replacement + ")");
            } else {
                // All / were escaped
                matcher.appendReplacement(sb, replacement);
            }
        }
        matcher.appendTail(sb);
        return sb.toString();
    }

    private void checkNotParameterType(String s, String message) {
        Matcher matcher = PARAMETER_PATTERN.matcher(s);
        if (matcher.find()) {
            throw new CucumberExpressionException(message + source);
        }
    }

    private String processOptional(String expression) {
        Matcher matcher = OPTIONAL_PATTERN.matcher(expression);
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            // look for double-escaped parentheses
            String parameterPart = matcher.group(2);
            if (DOUBLE_ESCAPE.equals(matcher.group(1))) {
                matcher.appendReplacement(sb, "\\\\(" + parameterPart + "\\\\)");
            } else {
                checkNotParameterType(parameterPart, PARAMETER_TYPES_CANNOT_BE_OPTIONAL);
                matcher.appendReplacement(sb, "(?:" + parameterPart + ")?");
            }
        }
        matcher.appendTail(sb);
        return sb.toString();
    }

    private String processParameters(String expression, ParameterTypeRegistry parameterTypeRegistry) {
        StringBuffer sb = new StringBuffer();
        Matcher matcher = PARAMETER_PATTERN.matcher(expression);
        while (matcher.find()) {
            if (DOUBLE_ESCAPE.equals(matcher.group(1))) {
                matcher.appendReplacement(sb, "\\\\{" + matcher.group(2) + "\\\\}");
            } else {
                String typeName = matcher.group(2);
                ParameterType.checkParameterTypeName(typeName);
                ParameterType<?> parameterType = parameterTypeRegistry.lookupByTypeName(typeName);
                if (parameterType == null) {
                    throw new UndefinedParameterTypeException(typeName);
                }
                parameterTypes.add(parameterType);
                matcher.appendReplacement(sb, Matcher.quoteReplacement(buildCaptureRegexp(parameterType.getRegexps())));
            }
        }
        matcher.appendTail(sb);
        return sb.toString();
    }

    private String buildCaptureRegexp(List<String> regexps) {
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
    public List<Argument<?>> match(String text, Type... typeHints) {
        List<ParameterType<?>> parameterTypes = new ArrayList<>(this.parameterTypes);
        for (int i = 0; i < parameterTypes.size(); i++) {
            ParameterType<?> parameterType = parameterTypes.get(i);
            Type type = i < typeHints.length ? typeHints[i] : String.class;
            if (parameterType.isAnonymous()) {
                ParameterByTypeTransformer defaultTransformer = parameterTypeRegistry.getDefaultParameterTransformer();
                parameterTypes.set(i, parameterType.deAnonymize(type, arg -> defaultTransformer.transform(arg, type)));
            }
        }

        return Argument.build(treeRegexp, parameterTypes, text);
    }

    @Override
    public String getSource() {
        return source;
    }

    @Override
    public Pattern getRegexp() {
        return treeRegexp.pattern();
    }
}
