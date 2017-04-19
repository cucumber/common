package io.cucumber.cucumberexpressions;

import java.text.Collator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class CucumberExpressionGenerator {
    private final ParameterTypeRegistry parameterTypeRegistry;

    public CucumberExpressionGenerator(ParameterTypeRegistry parameterTypeRegistry) {
        this.parameterTypeRegistry = parameterTypeRegistry;
    }

    public List<GeneratedExpression> generateExpressions(String text) {
        List<List<ParameterType<?>>> parameterTypeCombinations = new ArrayList<>();
        List<ParameterTypeMatcher> parameterTypeMatchers = createParameterTypeMatchers(text);
        StringBuilder expressionTemplate = new StringBuilder();
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

                // Find all the best parameter type matchers, they are all candidates.
                ParameterTypeMatcher matchingParameterTypeMatcher = matchingParameterTypeMatchers.get(0);
                List<ParameterTypeMatcher> bestParameterTypeMatchers = matchingParameterTypeMatchers.stream()
                        .filter(m -> m.compareTo(matchingParameterTypeMatcher) == 0)
                        .collect(Collectors.toList());

                // Extract just the parameter types, and remove duplications. The reason there
                // might be duplications is that some parameter types have more than one regexp.
                List<ParameterType<?>> parameterTypes = bestParameterTypeMatchers.stream()
                        .map(ParameterTypeMatcher::getParameterType)
                        .distinct()
                        .collect(Collectors.toList());

                // Sort the parameter types so the int and double ones come before any others.
                // This is just a developer experience thing - the first expression should be
                // the one they are most likely to pick.
                Collections.sort(parameterTypes, new ParameterTypeComparator());

                parameterTypeCombinations.add(parameterTypes);

                expressionTemplate
                        .append(text.substring(pos, matchingParameterTypeMatcher.start()))
                        .append("{%s}");
                pos = matchingParameterTypeMatcher.start() + matchingParameterTypeMatcher.group().length();
            } else {
                break;
            }

            if (pos >= text.length()) {
                break;
            }
        }
        expressionTemplate.append(text.substring(pos));
        return new CombinatorialGeneratedExpressionFactory(expressionTemplate.toString(), parameterTypeCombinations).generateExpressions();
    }

    /**
     * @deprecated
     */
    public GeneratedExpression generateExpression(String text) {
        List<GeneratedExpression> generatedExpressions = generateExpressions(text);
        return generatedExpressions.get(0);
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

    /**
     * Compares parameter types according to preferred use
     */
    private class ParameterTypeComparator implements Comparator<ParameterType> {
        @Override
        public int compare(ParameterType pt1, ParameterType pt2) {
            // int and double are more commonly used than other number types.
            // We give special priority to those types so that the generated expression
            // will use those types.
            if (pt1.getType().equals(int.class)) {
                return -1;
            }
            if (pt2.getType().equals(int.class)) {
                return 1;
            }
            if (pt1.getType().equals(double.class)) {
                return -1;
            }
            if (pt2.getType().equals(double.class)) {
                return 1;
            }
            return pt1.getName().compareTo(pt2.getName());
        }
    }
}
