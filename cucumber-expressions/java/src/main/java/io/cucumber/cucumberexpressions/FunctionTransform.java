package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.function.Function;

public class FunctionTransform<T> extends Transform<T> {
    private final Function<String, T> transformer;

    public FunctionTransform(Class<T> type, List<String> captureGroupRegexps, Function<String, T> transformer) {
        super(type, captureGroupRegexps);
        this.transformer = transformer;
    }

    @Override
    public T transform(String value) {
        return transformer.apply(value);
    }
}
