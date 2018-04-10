package io.cucumber.cucumberexpressions;

import java.util.regex.Matcher;

class ParameterTypeMatcher implements Comparable<ParameterTypeMatcher> {
    private final ParameterType<?> parameterType;
    private final Matcher matcher;
    private final int textLength;

    public ParameterTypeMatcher(ParameterType<?> parameterType, Matcher matcher, int textLength) {
        this.parameterType = parameterType;
        this.matcher = matcher;
        this.textLength = textLength;
    }

    public ParameterTypeMatcher advanceTo(int newMatchPos) {
        return new ParameterTypeMatcher(parameterType, matcher.region(newMatchPos, textLength), textLength);
    }

    public boolean find() {
        return matcher.find() && !group().isEmpty();
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
        return 0;
    }

    public ParameterType<?> getParameterType() {
        return parameterType;
    }
}
