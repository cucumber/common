package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.function.Function;

import static java.util.Arrays.asList;

public class FunctionTransform<T> implements Transform<T> {
    private final Function<String, T> transformer;
    private final List<String> typeNames;
    private final Class<T> type;
    private final List<String> captureGroupRegexps;

    private static List<String> getTypeNames(Class type) {
        return asList(
                type.getSimpleName(),
                type.getSimpleName().toLowerCase(),
                type.getName()
        );
    }

    public FunctionTransform(List<String> typeNames, Class<T> type, List<String> captureGroupRegexps, Function<String, T> transformer) {
        this.typeNames = typeNames;
        this.type = type;
        this.captureGroupRegexps = captureGroupRegexps;

        this.transformer = transformer;
    }

    public FunctionTransform(Class<T> type, List<String> captureGroupRegexps, Function<String, T> transformer) {
        this(getTypeNames(type), type, captureGroupRegexps, transformer);
    }

    @Override
    public T transform(String value) {
        return transformer.apply(value);
    }

    @Override
    public List<String> getTypeNames() {
        return typeNames;
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
