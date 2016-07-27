package io.cucumber.cucumberexpressions;

import org.junit.Before;
import org.junit.Test;

import java.util.Currency;
import java.util.Locale;
import java.util.regex.Pattern;

import static java.lang.Integer.parseInt;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class CustomTransformTest {
    public static class Speed {
        public final int value;
        public final String unit;

        public Speed(String s) {
            String[] tokens = s.split(" ");
            this.value = parseInt(tokens[0]);
            this.unit = tokens[1];
        }
    }

    private TransformLookup transformLookup = new TransformLookup(Locale.ENGLISH);

    @Before
    public void create_transform() {
        transformLookup.addTransform(new FunctionTransform<>(
                Currency.class,
                singletonList("[A-Z]{3}"),
                Currency::getInstance
        ));
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_expression_type() {
        Expression expression = new CucumberExpression("I have a {currency:Currency} account", emptyList(), transformLookup);
        Object transformedArgumentValue = expression.match("I have a EUR account").get(0).getTransformedValue();
        assertEquals(Currency.getInstance("EUR"), transformedArgumentValue);
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_explicit_type() {
        Expression expression = new CucumberExpression("I have a {currency} account", singletonList(Currency.class), transformLookup);
        Object transformedArgumentValue = expression.match("I have a EUR account").get(0).getTransformedValue();
        assertEquals(Currency.getInstance("EUR"), transformedArgumentValue);
    }

    @Test
    public void transforms_CucumberExpression_arguments_without_explicit_type() {
        Expression expression = new CucumberExpression("I have a {currency} account", emptyList(), transformLookup);
        Object transformedArgumentValue = expression.match("I have a EUR account").get(0).getTransformedValue();
        assertEquals(Currency.getInstance("EUR"), transformedArgumentValue);
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_explicit_type_using_constructor_directly() {
        Expression expression = new CucumberExpression("The train runs at {speed} now", singletonList(Speed.class), transformLookup);
        Speed speed = (Speed) expression.match("The train runs at 22 mph now").get(0).getTransformedValue();
        assertEquals(22, speed.value);
        assertEquals("mph", speed.unit);
    }

    @Test
    public void transforms_RegularExpression_arguments() {
        Expression expression = new RegularExpression(Pattern.compile("I have a ([A-Z]{3}) account"), transformLookup);
        Object transformedArgumentValue = expression.match("I have a EUR account").get(0).getTransformedValue();
        assertEquals(Currency.getInstance("EUR"), transformedArgumentValue);
    }
}
