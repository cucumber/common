package io.cucumber.cucumberexpressions;

import java.util.regex.Matcher;

final class ParameterTypeMatcher implements Comparable<ParameterTypeMatcher> {
    private final ParameterType<?> parameterType;
    private final Matcher matcher;
    private final int textLength;

    ParameterTypeMatcher(ParameterType<?> parameterType, Matcher matcher, int textLength) {
        this.parameterType = parameterType;
        this.matcher = matcher;
        this.textLength = textLength;
    }

    boolean advanceToAndFind(int newMatchPos) {
        // Unlike js, ruby and go, the matcher is stateful
        // so we can't use the immutable semantics.
        matcher.region(newMatchPos, textLength);
        while (matcher.find()) {
            if (!group().isEmpty()) {
                return true;
            }
        }
        return false;
    }

    int start() {
        return matcher.start();
    }

    String group() {
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

    ParameterType<?> getParameterType() {
        return parameterType;
    }

    public String toString() {
        return parameterType.getType().toString();
    }
}
