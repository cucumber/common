package io.cucumber.cucumberexpressions;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

class ParameterTypeMatcher implements Comparable<ParameterTypeMatcher> {
    private final ParameterType<?> parameterType;
    private final Matcher matcher;
    private final String text;

    public ParameterTypeMatcher(ParameterType<?> parameterType, Matcher matcher, String text) {
        this.parameterType = parameterType;
        this.matcher = matcher;
        this.text = text;
    }

    public boolean advanceToAndFind(int newMatchPos) {
        // Unlike js, ruby and go, the matcher is stateful
        // so we can't use the immutable semantics.
        matcher.region(newMatchPos, text.length());
        while (matcher.find()) {
            if (!group().isEmpty()) {
                if (matcher.start() > 0) {
                    char before = text.charAt(matcher.start() - 1);
                    if (!isWhitespaceOrPunctuation(before)) {
                        return false;
                    }
                }

                if (matcher.end() < text.length()) {
                    char after = text.charAt(matcher.end());
                    return isWhitespaceOrPunctuation(after);
                }
                return true;
            }
        }
        return false;
    }

    private static boolean isWhitespaceOrPunctuation(char c) {
        return Pattern.matches("[\\s\\p{P}]", new String(new char[]{c}));
    }

    public int start() {
        return matcher.start();
    }

    public String group() {
        return matcher.group();
    }

    @Override
    public int compareTo(ParameterTypeMatcher o) {
        int posComparison = Integer.compare(start(), o.start());
        if (posComparison != 0) return posComparison;
        int lengthComparison = Integer.compare(o.group().length(), group().length());
        if (lengthComparison != 0) return lengthComparison;
        int weightComparison = Integer.compare(o.parameterType.weight(), parameterType.weight());
        if (weightComparison != 0) return weightComparison;
        return 0;
    }

    public ParameterType<?> getParameterType() {
        return parameterType;
    }

    public String toString() {
        return parameterType.getType().toString();
    }
}
