package io.cucumber.cucumberexpressions;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class ConstructorParameterType<T> extends AbstractParameterType<T> {
    private final Constructor<T> constructor;

    public ConstructorParameterType(Class<T> clazz, List<String> regexps) {
        super(clazz.getSimpleName().toLowerCase(), regexps, clazz, true, false);
        try {
            this.constructor = clazz.getConstructor(String.class);
        } catch (NoSuchMethodException e) {
            throw new CucumberExpressionException(String.format("Missing constructor: `public %s(String)`", clazz.getSimpleName()));
        }
    }

    @Override
    public T transform(String value) {
        if (value == null) {
            return null;
        }
        try {
            return constructor.newInstance(value);
        } catch (Exception e) {
            Throwable cause = e instanceof InvocationTargetException ? ((InvocationTargetException) e).getTargetException() : e;
            throw new CucumberExpressionException(String.format("Failed to invoke `new %s(\"%s\")`", constructor.getDeclaringClass().getSimpleName(), value), cause);
        }
    }
}
