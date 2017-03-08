package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

import static org.junit.Assert.assertEquals;

/**
 * This test verifies that the regular expression generated
 * from the cucumber expression is as expected.
 */
public class CucumberExpressionPatternTest {
    @Test
    public void translates_no_args() {
        assertPattern(
                "hello",
                "^hello$",
                Collections.<Type>emptyList()
        );
    }

    @Test
    public void translates_alternation() {
        assertPattern(
                "I had/have a great/nice/charming friend",
                "^I (?:had|have) a (?:great|nice|charming) friend$",
                Collections.<Type>emptyList()
        );
    }

    @Test
    public void translates_an_int_arg() {
        assertPattern(
                "I have {n} cukes",
                "^I have ((?:-?\\d+)|(?:\\d+)) cukes$",
                Collections.<Type>singletonList(int.class)
        );
    }

    @Test
    public void translates_an_integer_arg() {
        assertPattern(
                "I have {n} cukes",
                "^I have ((?:-?\\d+)|(?:\\d+)) cukes$",
                Collections.<Type>singletonList(Integer.class)
        );
    }

    @Test
    public void translates_expression_types() {
        assertPattern(
                "I have {int} cukes in my {bodyPart}",
                "^I have ((?:-?\\d+)|(?:\\d+)) cukes in my (.+)$",
                Collections.<Type>emptyList()
        );
    }

    @Test
    public void translates_expression_types_with_explicit_types() {
        List<Type> types = new ArrayList<>();
        types.add(Integer.class);
        types.add(String.class);
        assertPattern(
                "I have {int} cukes in my {bodyPart}",
                "^I have ((?:-?\\d+)|(?:\\d+)) cukes in my (.+)$",
                types
        );
    }

    @Test
    public void translates_parenthesis_to_non_capturing_optional_capture_group() {
        assertPattern(
                "I have many big(ish) cukes",
                "^I have many big(?:ish)? cukes$",
                Collections.<Type>emptyList()
        );

    }

    private void assertPattern(String expr, String expectedRegexp, List<Type> types) {
        CucumberExpression cucumberExpression = new CucumberExpression(expr, types, new ParameterTypeRegistry(Locale.ENGLISH));
        assertEquals(expectedRegexp, cucumberExpression.getPattern().pattern());
    }
}
