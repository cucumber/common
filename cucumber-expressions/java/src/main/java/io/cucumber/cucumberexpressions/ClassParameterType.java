package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

public class ClassParameterType<T> implements ParameterType<T> {
    private final ParameterType<T> delegate;

    public ClassParameterType(Class<T> type) {
        if (type.isEnum()) {
            delegate = (ParameterType<T>) new EnumParameterType<>((Class<? extends Enum>) type);
        } else {
            delegate = new ConstructorParameterType<>(type);
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
}
