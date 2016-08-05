package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
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
                Collections.<Class<?>>emptyList()
        );
    }

    @Test
    public void translates_an_int_arg() {
        assertPattern(
                "I have {n} cukes",
                "^I have (-?\\d+) cukes$",
                Collections.<Class<?>>singletonList(int.class)
        );
    }

    @Test
    public void translates_an_integer_arg() {
        assertPattern(
                "I have {n} cukes",
                "^I have (-?\\d+) cukes$",
                Collections.<Class<?>>singletonList(Integer.class)
        );
    }

    @Test
    public void translates_expression_types() {
        assertPattern(
                "I have {n:int} cukes in my {bodyPart}",
                "^I have (-?\\d+) cukes in my (.+)$",
                Collections.<Class<?>>emptyList()
        );
    }

    @Test
    public void translates_expression_types_with_explicit_types() {
        List<Class<?>> types = new ArrayList<>();
        types.add(Integer.class);
        types.add(String.class);
        assertPattern(
                "I have {n:int} cukes in my {bodyPart}",
                "^I have (-?\\d+) cukes in my (.+)$",
                types
        );
    }

    @Test
    public void translates_parenthesis_to_non_capturing_optional_capture_group() {
        assertPattern(
                "I have many big(ish) cukes",
                "^I have many big(?:ish)? cukes$",
                Collections.<Class<?>>emptyList()
        );

    }
    private void assertPattern(String expr, String expectedRegexp, List<Class<?>> types) {
        CucumberExpression cucumberExpression = new CucumberExpression(expr, types, new TransformLookup(Locale.ENGLISH));
        assertEquals(expectedRegexp, cucumberExpression.getPattern().pattern());
    }
}
