package io.cucumber.cucumberexpressions;

import java.text.Collator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CucumberExpressionGenerator {
    private static final Collator ENGLISH_COLLATOR = Collator.getInstance(Locale.ENGLISH);
    private static final String JAVA_KEYWORDS[] = {
            "abstract", "assert", "boolean", "break", "byte", "case",
            "catch", "char", "class", "const", "continue",
            "default", "do", "double", "else", "extends",
            "false", "final", "finally", "float", "for",
            "goto", "if", "implements", "import", "instanceof",
            "int", "interface", "long", "native", "new",
            "null", "package", "private", "protected", "public",
            "return", "short", "static", "strictfp", "super",
            "switch", "synchronized", "this", "throw", "throws",
            "transient", "true", "try", "void", "volatile",
            "while"
    };

    private static boolean isJavaKeyword(String keyword) {
        return (Arrays.binarySearch(JAVA_KEYWORDS, keyword, ENGLISH_COLLATOR) >= 0);
    }

    private final ParameterRegistry parameterRegistry;

    public CucumberExpressionGenerator(ParameterRegistry parameterRegistry) {
        this.parameterRegistry = parameterRegistry;
    }

    public GeneratedExpression generateExpression(String text) {
        List<String> argumentNames = new ArrayList<>();
        List<ParameterMatcher> parameterMatchers = createTransformMatchers(text);
        List<Parameter<?>> parameters = new ArrayList<>();
        Map<String, Integer> usageByTypeName = new HashMap<>();

        StringBuilder expression = new StringBuilder();
        int pos = 0;
        while (true) {
            List<ParameterMatcher> matchingParameterMatchers = new ArrayList<>();

            for (ParameterMatcher parameterMatcher : parameterMatchers) {
                ParameterMatcher advancedParameterMatcher = parameterMatcher.advanceTo(pos);
                if (advancedParameterMatcher.find()) {
                    matchingParameterMatchers.add(advancedParameterMatcher);
                }
            }

            if (!matchingParameterMatchers.isEmpty()) {
                Collections.sort(matchingParameterMatchers);
                ParameterMatcher bestParameterMatcher = matchingParameterMatchers.get(0);
                Parameter<?> parameter = bestParameterMatcher.getParameter();
                parameters.add(parameter);

                String argumentName = getArgumentName(parameter.getTypeName(), usageByTypeName);
                argumentNames.add(argumentName);

                expression
                        .append(text.substring(pos, bestParameterMatcher.start()))
                        .append("{")
                        .append(parameter.getTypeName())
                        .append("}");
                pos = bestParameterMatcher.start() + bestParameterMatcher.group().length();
            } else {
                break;
            }

            if (pos >= text.length()) {
                break;
            }
        }
        expression.append(text.substring(pos));
        return new GeneratedExpression(expression.toString(), argumentNames, parameters);
    }

    private String getArgumentName(String typeName, Map<String, Integer> usageByTypeName) {
        Integer count = usageByTypeName.get(typeName);
        count = count != null ? count + 1 : 1;
        usageByTypeName.put(typeName, count);

        return count == 1 && !isJavaKeyword(typeName) ? typeName : typeName + count;
    }

    private List<ParameterMatcher> createTransformMatchers(String text) {
        Collection<Parameter<?>> parameters = parameterRegistry.getParameters();
        List<ParameterMatcher> parameterMatchers = new ArrayList<>();
        for (Parameter<?> parameter : parameters) {
            parameterMatchers.addAll(createTransformMatchers(parameter, text));
        }
        return parameterMatchers;
    }

    private List<ParameterMatcher> createTransformMatchers(Parameter<?> parameter, String text) {
        List<ParameterMatcher> result = new ArrayList<>();
        List<String> captureGroupRegexps = parameter.getCaptureGroupRegexps();
        for (String captureGroupRegexp : captureGroupRegexps) {
            Pattern regexp = Pattern.compile("(" + captureGroupRegexp + ")");
            Matcher matcher = regexp.matcher(text);
            result.add(new ParameterMatcher(parameter, matcher, text.length()));
        }
        return result;
    }
}
