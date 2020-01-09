package io.cucumber.tagexpressions;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.junit.jupiter.params.provider.Arguments.arguments;

public class TagExpressionParserSyntaxErrorTest {

    private final TagExpressionParser parser = new TagExpressionParser();

    static Stream<Arguments> data() {
        return Stream.of(
                arguments("@a @b or", "Syntax error. Expected operator"),
                arguments("@a and (@b not)", "Syntax error. Expected operator"),
                arguments("@a and (@b @c) or", "Syntax error. Expected operator"),
                arguments("@a and or", "Syntax error. Expected operand"),
                arguments("or or", "Syntax error. Expected operand"),
                arguments("a b", "Syntax error. Expected operator"),
                arguments("( a and b ) )", "Syntax error. Unmatched )"),
                arguments("( ( a and b )", "Syntax error. Unmatched (")
        );
    }

    @ParameterizedTest
    @MethodSource("data")
    public void parser_expression(final String infix, final String expectedError) {
        try {
            parser.parse(infix);
            fail();
        } catch (TagExpressionException e) {
            assertEquals(expectedError, e.getMessage());
        }
    }

}
