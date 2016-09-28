package io.cucumber.cucumberexpressions;

import org.junit.Before;
import org.junit.Test;

import java.lang.reflect.Type;
import java.util.Collections;
import java.util.Locale;

import static java.util.regex.Pattern.compile;
import static org.junit.Assert.assertEquals;

public class CustomTransformTest {
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

    private TransformLookup transformLookup = new TransformLookup(Locale.ENGLISH);

    @Before
    public void create_transform() {
        /// [add-color-transform]
        transformLookup.addTransform(new SimpleTransform<>(
                "color",
                Color.class,
                "red|blue|yellow",
                new Function<String, Color>() {
                    @Override
                    public Color apply(String name) {
                        return new Color(name);
                    }
                }
        ));
        /// [add-color-transform]
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_expression_type() {
        Expression expression = new CucumberExpression("I have a {color:color} ball", Collections.<Type>emptyList(), transformLookup);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_explicit_type() {
        Expression expression = new CucumberExpression("I have a {color} ball", Collections.<Type>singletonList(Color.class), transformLookup);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    @Test
    public void transforms_CucumberExpression_arguments_using_argument_name_as_type() {
        Expression expression = new CucumberExpression("I have a {color} ball", Collections.<Type>emptyList(), transformLookup);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_explicit_type_using_constructor_directly() {
        Expression expression = new CucumberExpression("I have a {color} ball", Collections.<Type>singletonList(Color.class), new TransformLookup(Locale.ENGLISH));
        Color transformedArgumentValue = (Color) expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals("red", transformedArgumentValue.name);
    }

    ///// RegularExpression

    @Test
    public void transforms_RegularExpression_arguments_with_explicit_type() {
        Expression expression = new RegularExpression(compile("I have a (red|blue|yellow) ball"), Collections.<Type>singletonList(Color.class), transformLookup);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    @Test
    public void transforms_RegularExpression_arguments_without_explicit_type() {
        Expression expression = new RegularExpression(compile("I have a (red|blue|yellow) ball"), Collections.<Type>emptyList(), transformLookup);
        Object transformedArgumentValue = expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals(new Color("red"), transformedArgumentValue);
    }

    @Test
    public void transforms_RegularExpression_arguments_with_explicit_type_using_constructor_directly() {
        Expression expression = new RegularExpression(compile("I have a (red|blue|yellow) ball"), Collections.<Type>singletonList(Color.class), new TransformLookup(Locale.ENGLISH));
        Color transformedArgumentValue = (Color) expression.match("I have a red ball").get(0).getTransformedValue();
        assertEquals("red", transformedArgumentValue.name);
    }


}
