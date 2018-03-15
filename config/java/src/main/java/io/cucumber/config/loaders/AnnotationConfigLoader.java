package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import io.cucumber.config.Property;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class AnnotationConfigLoader implements ConfigLoader {
    private final String prefix;
    private final Annotation annotation;

    public AnnotationConfigLoader(String prefix, Annotation annotation) {
        this.prefix = prefix;
        this.annotation = annotation;
    }

    @Override
    public void load(Config config) {
        Method[] declaredMethods = annotation.annotationType().getDeclaredMethods();
        for (Method declaredMethod : declaredMethods) {
            try {
                String key = prefix + declaredMethod.getName();
                Object result = declaredMethod.invoke(annotation);
                if (result instanceof String) {
                    config.set(key, new Property((String) result));
                } else if (result instanceof Integer) {
                    config.set(key, Property.fromInteger((Integer) result));
                } else if (result instanceof Boolean) {
                    config.set(key, Property.fromBoolean((Boolean) result));
                } else if (result instanceof String[]) {
                    String[] values = (String[]) result;
                    for (String value : values) {
                        config.set(key, new Property(value));
                    }
                } else {
                    throw new RuntimeException("Unsupported type: " + result.getClass().getName());
                }
            } catch (IllegalAccessException | InvocationTargetException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
