package io.cucumber.tagexpressions;

import io.cucumber.tagexpressions.TagExpressionParser;
import io.cucumber.tagexpressions.TagExpressionParser.Expression;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
public class TagExpressionParserParameterizedTest {

    private final String infix;
    private final String expected;
    private TagExpressionParser parser = new TagExpressionParser();

    @Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][]{
                {"a and b", "( a and b )"},
                {"a or b", "( a or b )"},
                {"not a", "not ( a )"},
                {"( a and b ) or ( c and d )", "( ( a and b ) or ( c and d ) )"},
                {"not a or b and not c or not d or e and f", "( ( ( not ( a ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )"}
        });
    }

    public TagExpressionParserParameterizedTest(String infix, String expected) {
        this.infix = infix;
        this.expected = expected;
    }

    @Test
    public void parser_expression() {
        Expression expr = parser.parse(infix);
        assertEquals(expected, expr.toString());
    }
}
