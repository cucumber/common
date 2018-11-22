package io.cucumber.config;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.regex.Pattern;

public class AnnotationTest extends FieldSetterContract {
    @Override
    protected MapBuilder makeMapBuilder(Object config) {
        return new AnnotationBuilder(MyClass.class.getAnnotation(MyAnnotation.class));
    }

    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.TYPE})
    public @interface MyAnnotation {
        boolean somebool();

        int meaning();

        String message();

        String[] stringlist();

        MyConfig.Myenum myenum();

        String regexp();
    }

    @MyAnnotation(
            somebool = true,
            meaning = 42,
            message = "hello",
            stringlist = {"one", "two"},
            myenum = MyConfig.Myenum.BAR,
            regexp = "^hello$"
    )
    private class MyClass {

    }
}
