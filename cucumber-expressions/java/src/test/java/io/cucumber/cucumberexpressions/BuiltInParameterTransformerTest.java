package io.cucumber.cucumberexpressions;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;

import static java.util.Locale.ENGLISH;

public class BuiltInParameterTransformerTest {

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private BuiltInParameterTransformer objectMapper = new BuiltInParameterTransformer(ENGLISH);

    @Test
    public void simple_object_mapper_only_supports_class_types() {
        expectedException.expectMessage("" +
                "Can't transform 'something' to java.util.AbstractList<E>\n" +
                "BuiltInParameterTransformer only supports a limited number of class types\n" +
                "Consider using a different object mapper or register a parameter type for java.util.AbstractList<E>");
        Type abstractListOfE = ArrayList.class.getGenericSuperclass();
        objectMapper.transform("something", abstractListOfE);
    }


    @Test
    public void simple_object_mapper_only_supports_some_class_types() {
        expectedException.expectMessage("" +
                "Can't transform 'something' to class java.util.Date\n" +
                "BuiltInParameterTransformer only supports a limited number of class types\n" +
                "Consider using a different object mapper or register a parameter type for class java.util.Date");
        objectMapper.transform("something", Date.class);
    }


    @Test
    public void should_throw_exception_for_unknown_enum_values() {
        expectedException.expectMessage("" +
                "Can't transform 'something' to class io.cucumber.cucumberexpressions.BuiltInParameterTransformerTest$TestEnum. " +
                "Not an enum constant");
        objectMapper.transform("something", TestEnum.class);
    }

    private enum TestEnum {
        TEST
    }

}