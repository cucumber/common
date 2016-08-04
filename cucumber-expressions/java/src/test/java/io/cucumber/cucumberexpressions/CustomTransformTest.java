package io.cucumber.cucumberexpressions;

import org.junit.Before;
import org.junit.Test;

import java.util.Currency;
import java.util.Locale;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static java.util.regex.Pattern.compile;
import static org.junit.Assert.assertEquals;

public class CustomTransformTest {
    public static class CurrencyWithStringCtor {
        public final String symbol;

        public CurrencyWithStringCtor(String symbol) {
            this.symbol = symbol;
        }
    }

    private TransformLookup transformLookup = new TransformLookup(Locale.ENGLISH);

    @Before
    public void create_transform() {
        transformLookup.addTransform(new FunctionTransform<>(
                "currency",
                Currency.class,
                "[A-Z]{3}",
                Currency::getInstance
        ));
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_expression_type() {
        Expression expression = new CucumberExpression("I have a {currency:currency} account", emptyList(), transformLookup);
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
    public void transforms_CucumberExpression_arguments_using_argument_name_as_type() {
        Expression expression = new CucumberExpression("I have a {currency} account", emptyList(), transformLookup);
        Object transformedArgumentValue = expression.match("I have a EUR account").get(0).getTransformedValue();
        assertEquals(Currency.getInstance("EUR"), transformedArgumentValue);
    }

    @Test
    public void transforms_CucumberExpression_arguments_with_explicit_type_using_constructor_directly() {
        Expression expression = new CucumberExpression("I have a {currency} account", singletonList(CurrencyWithStringCtor.class), new TransformLookup(Locale.ENGLISH));
        CurrencyWithStringCtor transformedArgumentValue = (CurrencyWithStringCtor) expression.match("I have a EUR account").get(0).getTransformedValue();
        assertEquals("EUR", transformedArgumentValue.symbol);
    }

    ///// RegularExpression

    @Test
    public void transforms_RegularExpression_arguments_with_explicit_type() {
        Expression expression = new RegularExpression(compile("I have a ([A-Z]{3}) account"), singletonList(Currency.class), transformLookup);
        Object transformedArgumentValue = expression.match("I have a EUR account").get(0).getTransformedValue();
        assertEquals(Currency.getInstance("EUR"), transformedArgumentValue);
    }

    @Test
    public void transforms_RegularExpression_arguments_without_explicit_type() {
        Expression expression = new RegularExpression(compile("I have a ([A-Z]{3}) account"), emptyList(), transformLookup);
        Object transformedArgumentValue = expression.match("I have a EUR account").get(0).getTransformedValue();
        assertEquals(Currency.getInstance("EUR"), transformedArgumentValue);
    }

    @Test
    public void transforms_RegularExpression_arguments_with_explicit_type_using_constructor_directly() {
        Expression expression = new RegularExpression(compile("I have a ([A-Z]{3}) account"), singletonList(CurrencyWithStringCtor.class), new TransformLookup(Locale.ENGLISH));
        CurrencyWithStringCtor transformedArgumentValue = (CurrencyWithStringCtor) expression.match("I have a EUR account").get(0).getTransformedValue();
        assertEquals("EUR", transformedArgumentValue.symbol);
    }


}
