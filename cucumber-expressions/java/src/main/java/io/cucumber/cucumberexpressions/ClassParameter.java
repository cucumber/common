package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

public class ClassParameter<T> implements Parameter<T> {
    private final Parameter<T> delegate;

    public ClassParameter(Class<T> type) {
        if (type.isEnum()) {
            delegate = (Parameter<T>) new EnumParameter<>((Class<? extends Enum>) type);
        } else {
            delegate = new ConstructorParameter<>(type);
        }
    }

    @Override
    public String getTypeName() {
        return delegate.getTypeName();
    }

    @Override
    public Type getType() {
        return delegate.getType();
    }

    @Override
    public List<String> getCaptureGroupRegexps() {
        return delegate.getCaptureGroupRegexps();
    }

    @Override
    public T transform(String value) {
        return delegate.transform(value);
    }
}
