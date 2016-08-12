package io.cucumber.cucumberexpressions;

import java.util.List;

public class ClassTransform<T> implements Transform<T> {
    private final Transform<T> delegate;

    public ClassTransform(Class<T> type) {
        if (type.isEnum()) {
            delegate = (Transform<T>) new EnumTransform<>((Class<? extends Enum>) type);
        } else {
            delegate = new ConstructorTransform<>(type);
        }
    }

    @Override
    public String getTypeName() {
        return delegate.getTypeName();
    }

    @Override
    public Class<T> getType() {
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
