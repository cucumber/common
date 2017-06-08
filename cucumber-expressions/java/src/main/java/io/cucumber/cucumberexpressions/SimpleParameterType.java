package io.cucumber.cucumberexpressions;

import java.util.List;

import static java.util.Collections.singletonList;

public class SimpleParameterType<T> extends AbstractParameterType<T> {
    private final Function<String, T> transformer;

    public SimpleParameterType(String name, String regexp) {
        this(name, regexp, false);
    }

    public SimpleParameterType(String name, String regexp, boolean isPreferential) {
        this(name, null, isPreferential, regexp, null);
    }

    public SimpleParameterType(String name, List<String> regexps) {
        this(name, regexps, false);
    }

    public SimpleParameterType(String name, List<String> regexps, boolean isPreferential) {
        this(name, null, isPreferential, regexps, null);
    }

    public SimpleParameterType(String name, Class<T> type, String regexp, Function<String, T> transformer) {
        this(name, type, false, regexp, transformer);
    }

    public SimpleParameterType(String name, Class<T> type, boolean isPreferential, String regexp, Function<String, T> transformer) {
        this(name, type, isPreferential, singletonList(regexp), transformer);
    }

    public SimpleParameterType(String name, Class<T> type, List<String> regexps, Function<String, T> transformer) {
        this(name, type, false, regexps, transformer);
    }

    public SimpleParameterType(String name, Class<T> type, boolean isPreferential, List<String> regexps, Function<String, T> transformer) {
        super(name, type, isPreferential, regexps);
        this.transformer = transformer;
    }

    @Override
    public T transform(String value) {
        return transformer != null ? transformer.apply(value) : (T) value;
    }

}
