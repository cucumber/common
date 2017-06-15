package io.cucumber.cucumberexpressions;

import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.List;
import java.util.Locale;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static java.util.regex.Pattern.compile;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class CustomParameterTypeTest {
    private ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);

    @Before
    public void create_parameter() {
        /// [add-color-parameter-type]
        parameterTypeRegistry.defineParameterType(new SimpleParameterType<>(
                "color",
                "red|blue|yellow", Color.class,
                Color::new
        ));
        /// [add-color-parameter-type]
    }

    @Test
    public void matches_CucumberExpression_parameters_with_custom_parameter_type() {
        Expression expression = new CucumberExpression("I have a {color} ball", parameterTypeRegistry);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    @Test
    public void matches_CucumberExpression_parameters_with_custom_parameter_type_using_optional_group() {
        parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);
        parameterTypeRegistry.defineParameterType(new SimpleParameterType<>(
                "color",
                asList("red|blue|yellow", "(?:dark|light) (?:red|blue|yellow)"), Color.class,
                Color::new
        ));
        Expression expression = new CucumberExpression("I have a {color} ball", parameterTypeRegistry);
        Object transformedArgumentValue = expression.match("I have a dark red ball").get(0).getTransformedValue();
        assertEquals(new Color("dark red"), transformedArgumentValue);
    }

    @Test
    public void defers_transformation_until_queried_from_argument() {
        parameterTypeRegistry.defineParameterType(new SimpleParameterType<>(
                "throwing",
                "bad", CssColor.class,
                name -> {
                    throw new RuntimeException(String.format("Can't transform [%s]", name));
                }));
        Expression expression = new CucumberExpression("I have a {throwing} parameter", parameterTypeRegistry);
        List<Argument> arguments = expression.match("I have a bad parameter");
        try {
            arguments.get(0).getTransformedValue();
            fail("should have failed");
        } catch (RuntimeException expected) {
            assertEquals("Can't transform [bad]", expected.getMessage());
        }
    }

    @Test
    public void conflicting_parameter_type_is_detected_for_type_name() {
        try {
            parameterTypeRegistry.defineParameterType(new SimpleParameterType<>(
                    "color",
                    ".*", CssColor.class,
                    CssColor::new));
            fail("should have failed");
        } catch (DuplicateTypeNameException expected) {
            assertEquals("There is already a parameter type with name color", expected.getMessage());
        }
    }

    @Test
    public void conflicting_parameter_type_is_detected_for_type() {
        try {
            parameterTypeRegistry.defineParameterType(new SimpleParameterType<>(
                    "whatever",
                    ".*", Color.class,
                    Color::new));
            fail("should have failed");
        } catch (CucumberExpressionException expected) {
            assertEquals("There is already a parameter type with type io.cucumber.cucumberexpressions.CustomParameterTypeTest$Color", expected.getMessage());
        }
    }

    ///// Conflicting parameter types

    @Test
    public void conflicting_parameter_type_is_not_detected_for_regexp() {
        parameterTypeRegistry.defineParameterType(new SimpleParameterType<>(
                "css-color",
                singletonList("red|blue|yellow"),
                CssColor.class,
                CssColor::new,
                false,
                false
        ));

        assertEquals(new CssColor("blue"), new CucumberExpression("I have a {css-color} ball", parameterTypeRegistry).match("I have a blue ball").get(0).getTransformedValue());
        assertEquals(new Color("blue"), new CucumberExpression("I have a {color} ball", parameterTypeRegistry).match("I have a blue ball").get(0).getTransformedValue());
    }

    @Test
    public void matches_RegularExpression_arguments_with_custom_parameter_type() {
        Expression expression = new RegularExpression(compile("I have a (red|blue|yellow) ball"), parameterTypeRegistry);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    ///// RegularExpression

    public static class Color {
        public final String name;

        /// [color-constructor]
        public Color(String name) {
            this.name = name;
        }
        /// [color-constructor]

        @Override
        public int hashCode() {
            return name.hashCode();
        }

        @Override
        public boolean equals(Object obj) {
            return obj instanceof Color && ((Color) obj).name.equals(name);
        }
    }

    public static class CssColor {
        public final String name;

        /// [color-constructor]
        public CssColor(String name) {
            this.name = name;
        }
        /// [color-constructor]

        @Override
        public int hashCode() {
            return name.hashCode();
        }

        @Override
        public boolean equals(Object obj) {
            return obj instanceof CssColor && ((CssColor) obj).name.equals(name);
        }
    }
}
