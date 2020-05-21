package io.cucumber.tagexpressions;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TagExpressionParserTest {

    @Test
    void evaluates_empty_expression_to_true() {
        Expression expr = TagExpressionParser.parse("");
        assertTrue(expr.evaluate(asList("@a @c @d".split(" "))));
    }

    @Test
    void evaluates_not() {
        Expression expr = TagExpressionParser.parse("not   x");
        assertEquals(false, expr.evaluate(singletonList("x")));
        assertEquals(true, expr.evaluate(singletonList("y")));
    }

    @Test
    void evaluates_example() {
        Expression expr = TagExpressionParser.parse("not @a or @b and not @c or not @d or @e and @f");
        assertFalse(expr.evaluate(asList("@a @c @d".split(" "))));
    }

    @Test
    void evaluates_expr_with_escaped_chars() {
        Expression expr = TagExpressionParser.parse("((not @a\\(1\\) or @b\\(2\\)) and not @c\\(3\\) or not @d\\(4\\) or @e\\(5\\) and @f\\(6\\))");
        assertFalse(expr.evaluate(asList("@a(1) @c(3) @d(4)".split(" "))));
        assertTrue(expr.evaluate(asList("@b(2) @e(5) @f(6)".split(" "))));
    }

    @Test
    void errors_when_there_are_only_operators() {
        Executable testMethod = () -> TagExpressionParser.parse("or or");
        TagExpressionException thrownException = assertThrows(TagExpressionException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo("Tag expression 'or or' could not be parsed because of syntax error: expected operand")));
    }

}
