package io.cucumber.cucumberexpressions;

import java.util.List;

public abstract class Transform<T> {
    private final Class<T> type;
    private final List<String> captureGroupRegexps;

    public Transform(Class<T> type, List<String> captureGroupRegexps) {
        this.type = type;
        this.captureGroupRegexps = captureGroupRegexps;
    }

    public Class<T> getType() {
        return type;
    }

    public List<String> getCaptureGroupRegexps() {
        return captureGroupRegexps;
    }

    public abstract T transform(String value);
}
