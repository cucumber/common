package io.cucumber.cucumberexpressions;

import java.util.List;

public class SimpleParameterType<T> extends AbstractParameterType<T> {
    private final Function<String, T> transformer;

    public SimpleParameterType(String name, Class<T> type, String regexp, Function<String, T> transformer) {
        super(name, type, regexp);
        this.transformer = transformer;
    }

    public SimpleParameterType(String name, Class<T> type, List<String> regexps, Function<String, T> transformer) {
        super(name, type, regexps);
        this.transformer = transformer;
    }

    @Override
    public T transform(String value) {
        return transformer.apply(value);
    }

}
