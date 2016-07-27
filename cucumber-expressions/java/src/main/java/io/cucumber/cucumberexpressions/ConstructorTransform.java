package io.cucumber.cucumberexpressions;

import java.lang.reflect.Constructor;
import java.util.Collections;
import java.util.List;

public class ConstructorTransform<T> implements Transform<T> {
    public static final List<String> ANYTHING_GOES = Collections.singletonList(".+");
    private final Constructor<T> constructor;

    public ConstructorTransform(Class<T> clazz) {
        try {
            this.constructor = clazz.getConstructor(String.class);
        } catch (NoSuchMethodException e) {
            throw new CucumberExpressionException("Missing String constructor for " + clazz.getName());
        }
    }

    @Override
    public List<String> getTypeNames() {
        throw new UnsupportedOperationException();
    }

    @Override
    public Class<T> getType() {
        throw new UnsupportedOperationException();
    }

    @Override
    public List<String> getCaptureGroupRegexps() {
        return ANYTHING_GOES;
    }

    @Override
    public T transform(String value) {
        try {
            return constructor.newInstance(value);
        } catch (Exception e) {
            throw new CucumberExpressionException("Couldn't instantiate " + constructor + " from String \"" + value + "\"");
        }
    }
}
