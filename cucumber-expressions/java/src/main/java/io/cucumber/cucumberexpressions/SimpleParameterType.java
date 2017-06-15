package io.cucumber.cucumberexpressions;

import java.util.List;

import static java.util.Collections.singletonList;

public class SimpleParameterType<T> extends AbstractParameterType<T> {
    private final Function<String, T> transformer;

    public SimpleParameterType(String name, List<String> regexps, Class<T> type, Function<String, T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        super(name, regexps, type, useForSnippets, preferForRegexpMatch);
        if (transformer == null) throw new CucumberExpressionException("transformer cannot be null");
        this.transformer = transformer;
    }

    public SimpleParameterType(String name, String regexp, Class<T> type, Function<String, T> transformer, boolean useForSnippets, boolean preferForRegexpMatch) {
        this(name, singletonList(regexp), type, transformer, useForSnippets, preferForRegexpMatch);
    }

    public SimpleParameterType(String name, String regexp, Class<T> type, Function<String, T> transformer) {
        this(name, singletonList(regexp), type, transformer, true, false);
    }

    public SimpleParameterType(String name, List<String> regexps, Class<T> type, Function<String, T> transformer) {
        this(name, regexps, type, transformer, true, false);
    }

    @Override
    public T transform(String value) {
        return transformer.apply(value);
    }

}
