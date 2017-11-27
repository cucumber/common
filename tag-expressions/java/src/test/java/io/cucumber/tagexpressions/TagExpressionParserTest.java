package io.cucumber.tagexpressions;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class TagExpressionParserTest {
    @Rule
    public ExpectedException exception = ExpectedException.none();

    private TagExpressionParser parser = new TagExpressionParser();

    @Test
    public void evaluates_empty_expression_to_true() {
        Expression expr = parser.parse("");
        assertTrue(expr.evaluate(asList("@a @c @d".split(" "))));
    }

    @Test
    public void evaluates_not() {
        Expression expr = parser.parse("not   x");
        assertEquals(false, expr.evaluate(singletonList("x")));
        assertEquals(true, expr.evaluate(singletonList("y")));
    }

    @Test
    public void evaluates_example() {
        Expression expr = parser.parse("not @a or @b and not @c or not @d or @e and @f");
        assertFalse(expr.evaluate(asList("@a @c @d".split(" "))));
    }

    @Test
    public void evaluates_expr_with_escaped_chars() {
        Expression expr = parser.parse("((not @a\\(1\\) or @b\\(2\\)) and not @c\\(3\\) or not @d\\(4\\) or @e\\(5\\) and @f\\(6\\))");
        assertFalse(expr.evaluate(asList("@a(1) @c(3) @d(4)".split(" "))));
        assertTrue(expr.evaluate(asList("@b(2) @e(5) @f(6)".split(" "))));
    }

    @Test
    public void errors_when_there_are_only_operators() {
        exception.expect(TagExpressionException.class);
        parser.parse("or or");
    }
}
