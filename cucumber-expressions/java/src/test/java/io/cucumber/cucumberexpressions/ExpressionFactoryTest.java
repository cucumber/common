package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import java.util.Locale;

import static java.util.Collections.singleton;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class ExpressionFactoryTest {

    @Test
    public void creates_cucumber_expression_by_default() {
        assertCucumberExpression("strings are cukexp by default");
    }

    @Test
    public void creates_regular_expression_for_anchors() {
        assertRegularExpression("^definitely a regexp$");
    }

    @Test
    public void creates_regular_expression_for_slashes() {
        assertRegularExpression("surely a regexp", "/surely a regexp/");
    }

    @Test
    public void creates_cucumber_expression_for_parenthesis_with_alpha() {
        assertCucumberExpression("this look(s) like a cukexp");
    }

    @Test
    public void creates_cucumber_expression_for_escaped_parenthesis_with_regex_symbols() {
        assertCucumberExpression("this looks\\( i.e: no regex symbols) like a cukexp");
    }

    @Test
    public void creates_cucumber_expression_for_escaped_parenthesis_with_alpha() {
        assertCucumberExpression("a heavy storm forecast \\(BF {int}+)");
    }

    @Test
    public void creates_cucumber_expression_for_parenthesis_with_regex_symbols() {
        assertCucumberExpression("the temperature is (\\+){int} degrees celsius");
    }

    @Test
    public void creates_cucumber_expression_for_only_begin_anchor() {
        assertRegularExpression("^this looks like a regexp");
    }

    @Test
    public void creates_cucumber_expression_for_only_end_anchor() {
        assertRegularExpression("this looks like a regexp$");
    }

    @Test
    public void creates_regular_expression_for_slashed_anchors() {
        assertRegularExpression("^please remove slashes$", "/^please remove slashes$/");
    }

    @Test
    public void explains_cukexp_regexp_mix() {
        final Executable testMethod = () -> createExpression("^the seller has {int} strike(s)$");

        final CucumberExpressionException thrownException = assertThrows(CucumberExpressionException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo("You cannot use anchors (^ or $) in Cucumber Expressions. Please remove them from ^the seller has {int} strike(s)$")));
    }

    @Test
    public void explains_undefined_parameter_types() {
        final Executable testMethod = () -> createExpression("{x}");
        final CucumberExpressionException thrownException = assertThrows(CucumberExpressionException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo("Undefined parameter type {x}. Please register a ParameterType for {x}.")));
    }

    private void assertRegularExpression(String expressionString) {
        assertRegularExpression(expressionString, expressionString);
    }

    private void assertRegularExpression(String expectedSource, String expressionString) {
        assertExpression(RegularExpression.class, expectedSource, expressionString);
    }

    private void assertCucumberExpression(String expressionString) {
        assertExpression(CucumberExpression.class, expressionString, expressionString);
    }

    private void assertExpression(Class<? extends Expression> expectedClass, String expectedSource, String expressionString) {
        Expression expression = createExpression(expressionString);
        assertEquals(expectedClass, expression.getClass());
        if (expectedSource != null) {
            assertEquals(expectedSource, expression.getSource());
        }
    }

    private Expression createExpression(String expressionString) {
        return new ExpressionFactory(new ParameterTypeRegistry(Locale.ENGLISH)).createExpression(expressionString);
    }

}
