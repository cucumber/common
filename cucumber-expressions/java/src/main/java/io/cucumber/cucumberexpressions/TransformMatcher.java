package io.cucumber.cucumberexpressions;

import java.util.regex.Matcher;

class TransformMatcher implements Comparable<TransformMatcher> {
    private final Transform<?> transform;
    private final Matcher matcher;
    private final int textLength;

    public TransformMatcher(Transform<?> transform, Matcher matcher, int textLength) {
        this.transform = transform;
        this.matcher = matcher;
        this.textLength = textLength;
    }

    public TransformMatcher advanceTo(int newMatchPos) {
        return new TransformMatcher(transform, matcher.region(newMatchPos, textLength), textLength);
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
    public int compareTo(TransformMatcher o) {
        int posComparison = Integer.compare(start(), o.start());
        if (posComparison != 0) return posComparison;
        int lengthComparison = Integer.compare(o.group().length(), group().length());
        if (lengthComparison != 0) return lengthComparison;
        // int and double are more commonly used than other number types.
        // We give special priority to those types so that the generated expression
        // will use those types.
        if (transform.getType().equals(int.class)) {
            return -1;
        }
        if (transform.getType().equals(double.class)) {
            return -1;
        }
        return 0;
    }

    public Transform<?> getTransform() {
        return transform;
    }
}
