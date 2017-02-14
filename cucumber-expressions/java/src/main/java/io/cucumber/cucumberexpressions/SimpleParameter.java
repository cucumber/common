package io.cucumber.cucumberexpressions;

import java.util.List;

public class SimpleParameter<T> extends AbstractParameter<T> {
    private final Function<String, T> transformer;

    public SimpleParameter(String typeName, Class<T> type, String captureGroupRegexp, Function<String, T> transformer) {
        super(typeName, type, captureGroupRegexp);
        this.transformer = transformer;
    }

    public SimpleParameter(String typeName, Class<T> type, List<String> captureGroupRegexps, Function<String, T> transformer) {
        super(typeName, type, captureGroupRegexps);
        this.transformer = transformer;
    }

    @Override
    public T transform(String value) {
        return transformer.apply(value);
    }

}
