package io.cucumber.cucumberexpressions;

import java.util.function.Function;

public class FunctionTransform<T> extends Transform<T> {
    private final Function<String, T> transformer;

    public FunctionTransform(Class<T> type, String captureGroupRegexp, Function<String, T> transformer) {
        super(type, captureGroupRegexp);
        this.transformer = transformer;
    }

    @Override
    public T transform(String value) {
        return transformer.apply(value);
    }
}
