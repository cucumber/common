package io.cucumber.cucumberexpressions;

import java.util.List;

import static java.util.Collections.singletonList;


public abstract class AbstractTransform<T> implements Transform<T> {
    private final String typeName;
    private final Class<T> type;
    private final List<String> captureGroupRegexps;

    public AbstractTransform(String typeName, Class<T> type, List<String> captureGroupRegexps) {
        this.captureGroupRegexps = captureGroupRegexps;
        this.typeName = typeName;
        this.type = type;
    }

    public AbstractTransform(String typeName, Class<T> type, String captureGroupRegexp) {
        this(typeName, type, singletonList(captureGroupRegexp));

    }

    @Override
    public String getTypeName() {
        return typeName;
    }

    @Override
    public Class<T> getType() {
        return type;
    }

    @Override
    public List<String> getCaptureGroupRegexps() {
        return captureGroupRegexps;
    }
}
