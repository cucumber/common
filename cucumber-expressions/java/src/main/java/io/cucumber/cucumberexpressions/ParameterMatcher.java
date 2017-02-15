package io.cucumber.cucumberexpressions;

import java.util.regex.Matcher;

class ParameterMatcher implements Comparable<ParameterMatcher> {
    private final Parameter<?> parameter;
    private final Matcher matcher;
    private final int textLength;

    public ParameterMatcher(Parameter<?> parameter, Matcher matcher, int textLength) {
        this.parameter = parameter;
        this.matcher = matcher;
        this.textLength = textLength;
    }

    public ParameterMatcher advanceTo(int newMatchPos) {
        return new ParameterMatcher(parameter, matcher.region(newMatchPos, textLength), textLength);
    }

    public boolean find() {
        return matcher.find();
    }

    public int start() {
        return matcher.start();
    }

    public String group() {
        return matcher.group();
    }

    @Override
    public int compareTo(ParameterMatcher o) {
        int posComparison = Integer.compare(start(), o.start());
        if (posComparison != 0) return posComparison;
        int lengthComparison = Integer.compare(o.group().length(), group().length());
        if (lengthComparison != 0) return lengthComparison;
        // int and double are more commonly used than other number types.
        // We give special priority to those types so that the generated expression
        // will use those types.
        if (parameter.getType().equals(int.class)) {
            return -1;
        }
        if (parameter.getType().equals(double.class)) {
            return -1;
        }
        return 0;
    }

    public Parameter<?> getParameter() {
        return parameter;
    }
}
