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

    private final TransformLookup transformLookup;

    public CucumberExpressionGenerator(TransformLookup transformLookup) {
        this.transformLookup = transformLookup;
    }

    public GeneratedExpression generateExpression(String text) {
        List<String> argumentNames = new ArrayList<>();
        List<TransformMatcher> transformMatchers = createTransformMatchers(text);
        List<Transform<?>> transforms = new ArrayList<>();
        Map<String, Integer> usageByTypeName = new HashMap<>();

        StringBuilder expression = new StringBuilder();
        int pos = 0;
        while (true) {
            List<TransformMatcher> matchingTransformMatchers = new ArrayList<>();

            for (TransformMatcher transformMatcher : transformMatchers) {
                TransformMatcher advancedTransformMatcher = transformMatcher.advanceTo(pos);
                if (advancedTransformMatcher.find()) {
                    matchingTransformMatchers.add(advancedTransformMatcher);
                }
            }

            if (!matchingTransformMatchers.isEmpty()) {
                Collections.sort(matchingTransformMatchers);
                TransformMatcher bestTransformMatcher = matchingTransformMatchers.get(0);
                Transform<?> transform = bestTransformMatcher.getTransform();
                transforms.add(transform);

                String argumentName = getArgumentName(transform.getTypeName(), usageByTypeName);
                argumentNames.add(argumentName);

                expression
                        .append(text.substring(pos, bestTransformMatcher.start()))
                        .append("{")
                        .append(transform.getTypeName())
                        .append("}");
                pos = bestTransformMatcher.start() + bestTransformMatcher.group().length();
            } else {
                break;
            }

            if (pos >= text.length()) {
                break;
            }
        }
        expression.append(text.substring(pos));
        return new GeneratedExpression(expression.toString(), argumentNames, transforms);
    }

    private String getArgumentName(String typeName, Map<String, Integer> usageByTypeName) {
        Integer count = usageByTypeName.get(typeName);
        count = count != null ? count + 1 : 1;
        usageByTypeName.put(typeName, count);

        return count == 1 && !isJavaKeyword(typeName) ? typeName : typeName + count;
    }

    private List<TransformMatcher> createTransformMatchers(String text) {
        Collection<Transform<?>> transforms = transformLookup.getTransforms();
        List<TransformMatcher> transformMatchers = new ArrayList<>();
        for (Transform<?> transform : transforms) {
            transformMatchers.addAll(createTransformMatchers(transform, text));
        }
        return transformMatchers;
    }

    private List<TransformMatcher> createTransformMatchers(Transform<?> transform, String text) {
        List<TransformMatcher> result = new ArrayList<>();
        List<String> captureGroupRegexps = transform.getCaptureGroupRegexps();
        for (String captureGroupRegexp : captureGroupRegexps) {
            Pattern regexp = Pattern.compile("(" + captureGroupRegexp + ")");
            Matcher matcher = regexp.matcher(text);
            result.add(new TransformMatcher(transform, matcher, text.length()));
        }
        return result;
    }
}
