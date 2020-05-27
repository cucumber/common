package io.cucumber.tagexpressions;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.params.provider.Arguments.arguments;

class TagExpressionParserSyntaxErrorTest {

    static Stream<Arguments> data() {
        return Stream.of(
                arguments("@a @b or", "Tag expression '@a @b or' could not be parsed because of syntax error: expected operator"),
                arguments("@a and (@b not)", "Tag expression '@a and (@b not)' could not be parsed because of syntax error: expected operator"),
                arguments("@a and (@b @c) or", "Tag expression '@a and (@b @c) or' could not be parsed because of syntax error: expected operator"),
                arguments("@a and or", "Tag expression '@a and or' could not be parsed because of syntax error: expected operand"),
                arguments("or or", "Tag expression 'or or' could not be parsed because of syntax error: expected operand"),
                arguments("a b", "Tag expression 'a b' could not be parsed because of syntax error: expected operator"),
                arguments("( a and b ) )", "Tag expression '( a and b ) )' could not be parsed because of syntax error: unmatched )"),
                arguments("( ( a and b )", "Tag expression '( ( a and b )' could not be parsed because of syntax error: unmatched (")
        );
    }

    @ParameterizedTest
    @MethodSource("data")
    public void parser_expression(String infix, String expectedError) {
	TagExpressionException e = assertThrows(TagExpressionException.class,
			() -> TagExpressionParser.parse(infix));

            assertEquals(expectedError, e.getMessage());
    }

}
