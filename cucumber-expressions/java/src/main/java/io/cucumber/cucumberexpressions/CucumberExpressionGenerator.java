package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CucumberExpressionGenerator {
    private final TransformLookup transformLookup;

    public CucumberExpressionGenerator(TransformLookup transformLookup) {
        this.transformLookup = transformLookup;
    }

    public GeneratedExpression generateExpression(String text, boolean typed) {
        List<String> argumentNames = new ArrayList<>();
        List<TransformMatcher> transformMatchers = createTransformMatchers(text);
        List<Transform<?>> transforms = new ArrayList<>();

        StringBuilder expression = new StringBuilder();
        int argCounter = 0;
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
                argumentName = "arg" + (++argCounter)
                argumentNames.add(argumentName)
                Collections.sort(matchingTransformMatchers);
                TransformMatcher bestTransformMatcher = matchingTransformMatchers.get(0);
                transforms.add(bestTransformMatcher.getTransform());

                expression
                        .append(text.substring(pos, bestTransformMatcher.start()))
                        .append("{")
                        .append(argumentName);
                if (typed) {
                    expression
                            .append(":")
                            .append(bestTransformMatcher.getTransform().getTypeName());
                }
                expression.append("}");
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
