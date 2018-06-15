package io.cucumber.config;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

class AnnotationBuilder implements MapBuilder {
    private final Annotation annotation;

    AnnotationBuilder(Annotation annotation) {
        this.annotation = annotation;
    }

    @Override
    public Map<String, ?> buildMap() {
        Map<String, Object> result = new HashMap<>();
        if (annotation == null) return result;
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
