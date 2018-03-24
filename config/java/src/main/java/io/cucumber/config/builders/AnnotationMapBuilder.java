package io.cucumber.config.builders;

import io.cucumber.config.MapBuilder;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class AnnotationMapBuilder implements MapBuilder {
    private final Annotation annotation;
    private final String comment;

    public AnnotationMapBuilder(Annotation annotation) {
        this.annotation = annotation;
        this.comment = annotation.toString();
    }

    @Override
    public Map<String, ?> buildMap() {
        Map<String, Object> result = new HashMap<>();
        Method[] declaredMethods = annotation.annotationType().getDeclaredMethods();
        for (Method declaredMethod : declaredMethods) {
            try {
                String key = declaredMethod.getName();
                Object value = declaredMethod.invoke(annotation);
                result.put(key, value);
            } catch (IllegalAccessException | InvocationTargetException e) {
                throw new RuntimeException(e);
            }
        }
        return result;
    }
}
