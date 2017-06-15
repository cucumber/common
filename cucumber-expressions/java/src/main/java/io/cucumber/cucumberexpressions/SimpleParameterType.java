package io.cucumber.cucumberexpressions;

import java.util.List;

import static java.util.Collections.singletonList;

public class SimpleParameterType<T> extends AbstractParameterType<T> {
    private final Function<String, T> transformer;

    public SimpleParameterType(String name, Class<T> type, boolean isPreferential, List<String> regexps, Function<String, T> transformer) {
        super(name, type, isPreferential, regexps);
        if (transformer == null) throw new CucumberExpressionException("transformer cannot be null");
        this.transformer = transformer;
    }

    public SimpleParameterType(String name, Class<T> type, boolean isPreferential, String regexp, Function<String, T> transformer) {
        this(name, type, isPreferential, singletonList(regexp), transformer);
    }

    public SimpleParameterType(String name, Class<T> type, String regexp, Function<String, T> transformer) {
        this(name, type, false, singletonList(regexp), transformer);
    }

    public SimpleParameterType(String name, Class<T> type, List<String> regexps, Function<String, T> transformer) {
        this(name, type, false, regexps, transformer);
    }

    @Override
    public T transform(String value) {
        return transformer.apply(value);
    }

}
