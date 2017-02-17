package io.cucumber.cucumberexpressions;

import org.junit.Before;
import org.junit.Test;

import java.lang.reflect.Type;
import java.util.Collections;
import java.util.Locale;

import static java.util.Arrays.asList;
import static java.util.regex.Pattern.compile;
import static org.junit.Assert.assertEquals;

public class CustomParameterTest {
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
            return ((Color) obj).name.equals(name);
        }
    }

    private ParameterRegistry parameterRegistry = new ParameterRegistry(Locale.ENGLISH);

    @Before
    public void create_parameter() {
        /// [add-color-parameter]
        parameterRegistry.addParameter(new SimpleParameter<>(
                "color",
                Color.class,
                asList("red|blue|yellow", "(?:dark|light) (?:red|blue|yellow)"),
                new Function<String, Color>() {
                    @Override
                    public Color apply(String name) {
                        return new Color(name);
                    }
                }
        ));
        /// [add-color-parameter]
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_expression_type_I() {
        Expression expression = new CucumberExpression("I have a {color} ball", Collections.<Type>emptyList(), parameterRegistry);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_expression_type_II() {
        Expression expression = new CucumberExpression("I have a {color} ball", Collections.<Type>emptyList(), parameterRegistry);
        Object transformedArgumentValue = expression.match("I have a dark red ball").get(0).getTransformedValue();
        assertEquals(new Color("dark red"), transformedArgumentValue);
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_explicit_type() {
        Expression expression = new CucumberExpression("I have a {color} ball", Collections.<Type>singletonList(Color.class), parameterRegistry);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    @Test
    public void transforms_CucumberExpression_arguments_using_argument_name_as_type() {
        Expression expression = new CucumberExpression("I have a {color} ball", Collections.<Type>emptyList(), parameterRegistry);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_explicit_type_using_constructor_directly() {
        Expression expression = new CucumberExpression("I have a {color} ball", Collections.<Type>singletonList(Color.class), new ParameterRegistry(Locale.ENGLISH));
        Color transformedArgumentValue = (Color) expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals("red", transformedArgumentValue.name);
    }

    ///// RegularExpression

    @Test
    public void transforms_RegularExpression_arguments_with_explicit_type() {
        Expression expression = new RegularExpression(compile("I have a (red|blue|yellow) ball"), Collections.<Type>singletonList(Color.class), parameterRegistry);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    @Test
    public void transforms_RegularExpression_arguments_without_explicit_type() {
        Expression expression = new RegularExpression(compile("I have a (red|blue|yellow) ball"), Collections.<Type>emptyList(), parameterRegistry);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    @Test
    public void transforms_RegularExpression_arguments_with_explicit_type_using_constructor_directly() {
        Expression expression = new RegularExpression(compile("I have a (red|blue|yellow) ball"), Collections.<Type>singletonList(Color.class), new ParameterRegistry(Locale.ENGLISH));
        Color transformedArgumentValue = (Color) expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals("red", transformedArgumentValue.name);
    }


}
