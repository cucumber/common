package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import static java.util.Locale.ENGLISH;
import static org.junit.Assert.assertThrows;

public class BuiltInParameterTransformerTest {

    private BuiltInParameterTransformer objectMapper = new BuiltInParameterTransformer(ENGLISH);

    @Test
    public void simple_object_mapper_only_supports_class_types() {
        String expected = "" +
                "Can't transform 'something' to java.util.AbstractList<E>\n" +
                "BuiltInParameterTransformer only supports a limited number of class types\n" +
                "Consider using a different object mapper or register a parameter type for java.util.AbstractList<E>";
        Type abstractListOfE = ArrayList.class.getGenericSuperclass();

        assertThrows(
                expected,
                IllegalArgumentException.class,
                () -> objectMapper.transform("something", abstractListOfE)
        );
    }


    @Test
    public void simple_object_mapper_only_supports_some_class_types() {
        String expected = "" +
                "Can't transform 'something' to class java.util.Date\n" +
                "BuiltInParameterTransformer only supports a limited number of class types\n" +
                "Consider using a different object mapper or register a parameter type for class java.util.Date";

        assertThrows(
                expected,
                IllegalArgumentException.class,
                () -> objectMapper.transform("something", Date.class)
        );
    }


    @Test
    public void should_throw_exception_for_unknown_enum_values() {
        String expected = "" +
                "Can't transform 'something' to class io.cucumber.cucumberexpressions.BuiltInParameterTransformerTest$TestEnum. " +
                "Not an enum constant";

        assertThrows(
                expected,
                CucumberExpressionException.class,
                () -> objectMapper.transform("something", TestEnum.class)
        );
    }


    @Test
    public void should_transform_boolean() {
        for (String value : Arrays.asList("true", "True", "false", "False")) {
            objectMapper.transform(value, Boolean.class);
        }
    }

    private enum TestEnum {
        TEST
    }

}
