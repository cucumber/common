package io.cucumber.tagexpressions;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

@RunWith(Parameterized.class)
public class TagExpressionParserSyntaxErrorTest {

    private final String infix;
    private final String expectedError;
    private final TagExpressionParser parser = new TagExpressionParser();

    public TagExpressionParserSyntaxErrorTest(String infix, String expectedError) {
        this.infix = infix;
        this.expectedError = expectedError;
    }

    @Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][]{
                {"@a @b or", "Syntax error. Expected operator"},
                {"@a and (@b not)", "Syntax error. Expected operator"},
                {"@a and (@b @c) or", "Syntax error. Expected operator"},
                {"@a and or", "Syntax error. Expected operand"},
        });
    }

    @Test
    public void parser_expression() {
        try {
            parser.parse(infix);
            fail();
        } catch (TagExpressionException e) {
            assertEquals(expectedError, e.getMessage());
        }
    }
}
