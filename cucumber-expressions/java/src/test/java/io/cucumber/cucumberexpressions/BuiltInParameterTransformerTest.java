package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import static java.util.Locale.ENGLISH;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class BuiltInParameterTransformerTest {

    private BuiltInParameterTransformer objectMapper = new BuiltInParameterTransformer(ENGLISH);

    @Test
    public void simple_object_mapper_only_supports_class_types() {

        Type abstractListOfE = ArrayList.class.getGenericSuperclass();
        final Executable testMethod = () -> objectMapper.transform("something", abstractListOfE);

        final IllegalArgumentException thrownException = assertThrows(IllegalArgumentException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo(
                "Can't transform 'something' to java.util.AbstractList<E>\n" +
                        "BuiltInParameterTransformer only supports a limited number of class types\n" +
                        "Consider using a different object mapper or register a parameter type for java.util.AbstractList<E>"
        )));
    }

    @Test
    public void simple_object_mapper_only_supports_some_class_types() {

        final Executable testMethod = () -> objectMapper.transform("something", Date.class);

        final IllegalArgumentException thrownException = assertThrows(IllegalArgumentException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo(
                "Can't transform 'something' to class java.util.Date\n" +
                        "BuiltInParameterTransformer only supports a limited number of class types\n" +
                        "Consider using a different object mapper or register a parameter type for class java.util.Date"
        )));
    }

    @Test
    public void should_throw_exception_for_unknown_enum_values() {

        final Executable testMethod = () -> objectMapper.transform("something", TestEnum.class);

        final CucumberExpressionException thrownException = assertThrows(CucumberExpressionException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo(
                "Can't transform 'something' to class io.cucumber.cucumberexpressions.BuiltInParameterTransformerTest$TestEnum. " +
                        "Not an enum constant"
        )));
    }

    @Test
    public void should_transform_boolean() {
      for (String value : Arrays.asList("true", "True", "false", "False")){
        objectMapper.transform(value, Boolean.class);
      }
    }

    private enum TestEnum {
        TEST
    }

}
