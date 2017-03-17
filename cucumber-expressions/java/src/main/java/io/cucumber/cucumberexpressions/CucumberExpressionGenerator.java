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

    private final ParameterTypeRegistry parameterTypeRegistry;

    public CucumberExpressionGenerator(ParameterTypeRegistry parameterTypeRegistry) {
        this.parameterTypeRegistry = parameterTypeRegistry;
    }

    public GeneratedExpression generateExpression(String text) {
        List<String> parameterNames = new ArrayList<>();
        List<ParameterTypeMatcher> parameterTypeMatchers = createParameterTypeMatchers(text);
        List<ParameterType<?>> parameterTypes = new ArrayList<>();
        Map<String, Integer> usageByTypeName = new HashMap<>();

        StringBuilder expression = new StringBuilder();
        int pos = 0;
        while (true) {
            List<ParameterTypeMatcher> matchingParameterTypeMatchers = new ArrayList<>();

            for (ParameterTypeMatcher parameterTypeMatcher : parameterTypeMatchers) {
                ParameterTypeMatcher advancedParameterTypeMatcher = parameterTypeMatcher.advanceTo(pos);
                if (advancedParameterTypeMatcher.find()) {
                    matchingParameterTypeMatchers.add(advancedParameterTypeMatcher);
                }
            }

            if (!matchingParameterTypeMatchers.isEmpty()) {
                Collections.sort(matchingParameterTypeMatchers);
                ParameterTypeMatcher bestParameterTypeMatcher = matchingParameterTypeMatchers.get(0);
                ParameterType<?> parameterType = bestParameterTypeMatcher.getParameterType();
                parameterTypes.add(parameterType);

                String parameterName = getParameterName(parameterType.getName(), usageByTypeName);
                parameterNames.add(parameterName);

                expression
                        .append(text.substring(pos, bestParameterTypeMatcher.start()))
                        .append("{")
                        .append(parameterType.getName())
                        .append("}");
                pos = bestParameterTypeMatcher.start() + bestParameterTypeMatcher.group().length();
            } else {
                break;
            }

            if (pos >= text.length()) {
                break;
            }
        }
        expression.append(text.substring(pos));
        return new GeneratedExpression(expression.toString(), parameterNames, parameterTypes);
    }

    private String getParameterName(String typeName, Map<String, Integer> usageByTypeName) {
        Integer count = usageByTypeName.get(typeName);
        count = count != null ? count + 1 : 1;
        usageByTypeName.put(typeName, count);

        return count == 1 && !isJavaKeyword(typeName) ? typeName : typeName + count;
    }

    private List<ParameterTypeMatcher> createParameterTypeMatchers(String text) {
        Collection<ParameterType<?>> parameterTypes = parameterTypeRegistry.getParameters();
        List<ParameterTypeMatcher> parameterTypeMatchers = new ArrayList<>();
        for (ParameterType<?> parameterType : parameterTypes) {
            parameterTypeMatchers.addAll(createParameterTypeMatchers(parameterType, text));
        }
        return parameterTypeMatchers;
    }

    private List<ParameterTypeMatcher> createParameterTypeMatchers(ParameterType<?> parameterType, String text) {
        List<ParameterTypeMatcher> result = new ArrayList<>();
        List<String> captureGroupRegexps = parameterType.getRegexps();
        for (String captureGroupRegexp : captureGroupRegexps) {
            Pattern regexp = Pattern.compile("(" + captureGroupRegexp + ")");
            Matcher matcher = regexp.matcher(text);
            result.add(new ParameterTypeMatcher(parameterType, matcher, text.length()));
        }
        return result;
    }
}
