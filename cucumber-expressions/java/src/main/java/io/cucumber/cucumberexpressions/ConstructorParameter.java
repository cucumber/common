package io.cucumber.cucumberexpressions;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Collections;
import java.util.List;

public class ConstructorParameter<T> extends AbstractParameter<T> {
    private static final List<String> ANYTHING_GOES = Collections.singletonList(".+");
    private final Constructor<T> constructor;

    public ConstructorParameter(Class<T> clazz) {
        super(null, clazz, ANYTHING_GOES);
        try {
            this.constructor = clazz.getConstructor(String.class);
        } catch (NoSuchMethodException e) {
            throw new CucumberExpressionException(String.format("Missing constructor: `public %s(String)`", clazz.getSimpleName()));
        }
    }

    @Override
    public T transform(String value) {
        if (value == null) {
            return (T)null;
        }
        try {
            return constructor.newInstance(value);
        } catch (Exception e) {
            Throwable cause = e instanceof InvocationTargetException ? ((InvocationTargetException) e).getTargetException() : e;
            throw new CucumberExpressionException(String.format("Failed to invoke `new %s(\"%s\")`", constructor.getDeclaringClass().getSimpleName(), value), cause);
        }
    }
}
