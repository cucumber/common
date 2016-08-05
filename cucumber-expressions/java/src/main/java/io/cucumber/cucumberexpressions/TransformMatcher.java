package io.cucumber.cucumberexpressions;

import java.util.regex.Matcher;

class TransformMatcher implements Comparable<TransformMatcher> {
    private final Transform<?> transform;
    private final Matcher matcher;
    private final String captureGroupRegexp;

    public TransformMatcher(Transform<?> transform, String captureGroupRegexp, Matcher matcher) {
        this.transform = transform;
        this.captureGroupRegexp = captureGroupRegexp;
        this.matcher = matcher;
    }

    public TransformMatcher region(int start, int end) {
        return new TransformMatcher(transform, captureGroupRegexp, matcher.region(start, end));
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
