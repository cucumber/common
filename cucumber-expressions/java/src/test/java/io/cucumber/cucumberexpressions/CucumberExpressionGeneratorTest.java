package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.Collections;
import java.util.Currency;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class CucumberExpressionGeneratorTest {

    private final TransformLookup transformLookup = new TransformLookup(Locale.ENGLISH);
    private final CucumberExpressionGenerator generator = new CucumberExpressionGenerator(transformLookup);

    @Test
    public void documents_expression_generation() {
        /// [generate-expression]
        CucumberExpressionGenerator generator = new CucumberExpressionGenerator(transformLookup);
        String undefinedStepText = "I have 2 cucumbers and 1.5 tomato";
        GeneratedExpression generatedExpression = generator.generateExpression(undefinedStepText);
        assertEquals("I have {int} cucumbers and {double} tomato", generatedExpression.getSource());
        assertEquals(Double.TYPE, generatedExpression.getTransforms().get(1).getType());
        /// [generate-expression]
    }

    @Test
    public void generates_expression_for_no_args() {
        assertExpression("hello", Collections.<String>emptyList(), "hello");
    }

    @Test
    public void generates_expression_for_int_double_arg() {
        assertExpression(
                "I have {int} cukes and {double} euro", asList("int1", "double1"),
                "I have 2 cukes and 1.5 euro");
    }

    @Test
    public void generates_expression_for_just_int() {
        assertExpression(
                "{int}", singletonList("int1"),
                "99999");
    }

    @Test
    public void numbers_all_arguments_when_type_is_reserved_keyword() {
        assertExpression(
                "I have {int} cukes and {int} euro", asList("int1", "int2"),
                "I have 2 cukes and 5 euro");
    }

    @Test
    public void numbers_only_second_argument_when_type_is_not_reserved_keyword() {
        transformLookup.addTransform(new SimpleTransform<>(
                "currency",
                Currency.class,
                "[A-Z]{3}",
                null
        ));
        assertExpression(
                "I have a {currency} account and a {currency} account", asList("currency", "currency2"),
                "I have a EUR account and a GBP account");
    }

    @Test
    public void prefers_leftmost_match_when_there_is_overlap() {
        transformLookup.addTransform(new SimpleTransform<>(
                "currency",
                Currency.class,
                "cd",
                null
        ));
        transformLookup.addTransform(new SimpleTransform<>(
                "date",
                Date.class,
                "bc",
                null
        ));
        assertExpression(
                "a{date}defg", singletonList("date"),
                "abcdefg");
    }

    @Test
    public void prefers_widest_match_when_pos_is_same() {
        transformLookup.addTransform(new SimpleTransform<>(
                "currency",
                Currency.class,
                "cd",
                null
        ));
        transformLookup.addTransform(new SimpleTransform<>(
                "date",
                Date.class,
                "cde",
                null
        ));
        assertExpression(
                "ab{date}fg", singletonList("date"),
                "abcdefg");
    }

    @Test
    public void exposes_transforms_in_generated_expression() {
        GeneratedExpression generatedExpression = generator.generateExpression("I have 2 cukes and 1.5 euro");
        assertEquals(int.class, generatedExpression.getTransforms().get(0).getType());
        assertEquals(double.class, generatedExpression.getTransforms().get(1).getType());
    }

    private void assertExpression(String expectedExpression, List<String> expectedArgumentNames, String text) {
        GeneratedExpression generatedExpression = generator.generateExpression(text);
        assertEquals(expectedArgumentNames, generatedExpression.getArgumentNames());
        assertEquals(expectedExpression, generatedExpression.getSource());
    }
}
