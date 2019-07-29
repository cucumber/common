package io.cucumber.cucumberexpressions;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.util.Locale;

import static org.junit.Assert.assertEquals;

public class ExpressionFactoryTest {

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

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
        expectedException.expectMessage("You cannot use anchors (^ or $) in Cucumber Expressions. Please remove them from ^the seller has {int} strike(s)$");
        createExpression("^the seller has {int} strike(s)$");
    }

    private void assertRegularExpression(String expressionString) {
        assertRegularExpression(expressionString, expressionString);
    }

    private void assertRegularExpression(String expectedSource, String expressionSource) {
        assertExpression(RegularExpression.class, expectedSource, expressionSource);
    }

    private void assertCucumberExpression(String expressionSource) {
        assertExpression(CucumberExpression.class, expressionSource, expressionSource);
    }

    private void assertExpression(Class<? extends Expression> expectedClass, String expectedSource, String expressionSource) {
        Expression expression = createExpression(expressionSource);
        assertEquals(expectedClass, expression.getClass());
        if (expectedSource != null) {
            assertEquals(expectedSource, expression.getSource());
        }
    }

    private Expression createExpression(String expressionSource) {
        return new ExpressionFactory(new ParameterTypeRegistry(Locale.ENGLISH)).createExpression(expressionSource);
    }
}
