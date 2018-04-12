package io.cucumber.config;

import io.cucumber.config.AnnotationBuilder;
import io.cucumber.config.FieldSetterContract;
import io.cucumber.config.MapBuilder;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public class AnnotationTest extends FieldSetterContract {
    @Override
    protected MapBuilder makeMapBuilder() {
        return new AnnotationBuilder(MyClass.class.getAnnotation(MyAnnotation.class));
    }

    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.TYPE})
    public @interface MyAnnotation {
        boolean somebool();

        int meaning();

        String message();

        String[] stringlist();
    }

    @MyAnnotation(somebool = true, meaning = 42, message = "hello", stringlist = {"one", "two"})
    private class MyClass {

    }
}
