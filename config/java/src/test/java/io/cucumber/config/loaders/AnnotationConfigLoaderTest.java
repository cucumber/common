package io.cucumber.config.loaders;


import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public class AnnotationConfigLoaderTest extends ConfigLoaderContract {
    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.TYPE})
    public @interface MyAnnotation {
        boolean somebool();

        int meaning();

        String[] list();
    }

    @MyAnnotation(somebool = true, meaning = 42, list = {"one", "two"})
    private class MyClass {

    }

    @Override
    protected ConfigLoader makeConfigLoader() {
        return new AnnotationConfigLoader("testing.", MyClass.class.getAnnotation(MyAnnotation.class));
    }
}
