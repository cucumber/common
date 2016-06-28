package io.cucumber.cucumberexpressions;

public abstract class Transform<T> {
    private final Class<T> type;
    private final String captureGroupRegexp;

    public Transform(Class<T> type, String captureGroupRegexp) {
        this.type = type;
        this.captureGroupRegexp = captureGroupRegexp;
    }

    public Class<T> getType() {
        return type;
    }

    public String getCaptureGroupRegexp() {
        return captureGroupRegexp;
    }

    public abstract T transform(String value);
}
