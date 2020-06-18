package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import java.util.function.Supplier;

import static java.util.Locale.ENGLISH;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class BuiltInParameterTransformerTest {

    private final BuiltInParameterTransformer objectMapper = new BuiltInParameterTransformer(ENGLISH);

    @Test
    public void simple_object_mapper_only_supports_class_types() {

        Type abstractListOfE = ArrayList.class.getGenericSuperclass();
        final Executable testMethod = () -> objectMapper.transform("something", abstractListOfE);

        String expected = "" +
                "Can't transform 'something' to java.util.AbstractList<E>\n" +
                "BuiltInParameterTransformer only supports a limited number of class types\n" +
                "Consider using a different object mapper or register a parameter type for java.util.AbstractList<E>";

        final IllegalArgumentException thrownException = assertThrows(IllegalArgumentException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo(expected)));
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
    public void simple_object_mapper_only_supports_some_optional_types() {
        Type optionalDate = new TypeReference<Optional<Date>>() {}.getType();

        final Executable testMethod = () -> objectMapper.transform("something", optionalDate);

        final IllegalArgumentException thrownException = assertThrows(IllegalArgumentException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo(
                "Can't transform 'something' to java.util.Optional<java.util.Date>\n" +
                        "BuiltInParameterTransformer only supports a limited number of class types\n" +
                        "Consider using a different object mapper or register a parameter type for java.util.Optional<java.util.Date>"
        )));
    }

    @Test
    public void simple_object_mapper_only_supports_some_generic_types() {
        Type optionalDate = new TypeReference<Supplier<String>>() {}.getType();

        final Executable testMethod = () -> objectMapper.transform("something", optionalDate);

        final IllegalArgumentException thrownException = assertThrows(IllegalArgumentException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo(
                "Can't transform 'something' to java.util.function.Supplier<java.lang.String>\n" +
                        "BuiltInParameterTransformer only supports a limited number of class types\n" +
                        "Consider using a different object mapper or register a parameter type for java.util.function.Supplier<java.lang.String>"
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
        for (String value : Arrays.asList("true", "True", "false", "False")) {
            objectMapper.transform(value, Boolean.class);
        }
    }

    @Test
    public void should_transform_optional() {
        assertThat(objectMapper.transform("abc", Optional.class), is(equalTo(Optional.of("abc"))));
        assertThat(objectMapper.transform("", Optional.class), is(equalTo(Optional.of(""))));
        assertThat(objectMapper.transform(null, Optional.class), is(equalTo(Optional.empty())));
    }

    @Test
    public void should_transform_optional_generic_string() {
        Type optionalStringType = new TypeReference<Optional<String>>() {}.getType();

        assertThat(objectMapper.transform("abc", optionalStringType), is(equalTo(Optional.<String>of("abc"))));
        assertThat(objectMapper.transform("", optionalStringType), is(equalTo(Optional.<String>of(""))));
        assertThat(objectMapper.transform(null, optionalStringType), is(equalTo(Optional.<String>empty())));
    }

    @Test
    public void should_transform_optional_generic_integer() {
        Type optionalIntType = new TypeReference<Optional<Integer>>() {}.getType();

        assertThat(objectMapper.transform("42", optionalIntType), is(equalTo(Optional.<Integer>of(42))));
        assertThat(objectMapper.transform(null, optionalIntType), is(equalTo(Optional.<Integer>empty())));
    }

    private enum TestEnum {
        TEST
    }

}
