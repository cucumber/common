package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

public class ClassParameterType<T> implements ParameterType<T> {
    private final ParameterType<T> delegate;

    public ClassParameterType(Class<T> type, List<String> regexps) {
        if (type.isEnum()) {
            delegate = (ParameterType<T>) new EnumParameterType<>((Class<? extends Enum>) type, regexps);
        } else {
            delegate = new ConstructorParameterType<>(type, regexps);
        }
    }

    @Override
    public String getName() {
        return delegate.getName();
    }

    @Override
    public Type getType() {
        return delegate.getType();
    }

    @Override
    public List<String> getRegexps() {
        return delegate.getRegexps();
    }

    @Override
    public T transform(String value) {
        return delegate.transform(value);
    }

    @Override
    public boolean preferForRegexpMatch() {
        return delegate.preferForRegexpMatch();
    }

    @Override
    public boolean useForSnippets() {
        return delegate.useForSnippets();
    }
}
