package io.cucumber.tagexpressions;

import org.junit.Test;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

public class TagExpressionParserTest {

    private TagExpressionParser parser = new TagExpressionParser();

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
}
