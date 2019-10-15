package io.cucumber.tagexpressions;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.params.provider.Arguments.arguments;

public class TagExpressionParserParameterizedTest {
    private final TagExpressionParser parser = new TagExpressionParser();

    static Stream<Arguments> data() {
        return Stream.of(
                arguments("a and b", "( a and b )"),
                arguments("a or b", "( a or b )"),
                arguments("not a", "not ( a )"),
                arguments("( a and b ) or ( c and d )", "( ( a and b ) or ( c and d ) )"),
                arguments("not a or b and not c or not d or e and f", "( ( ( not ( a ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )"),
                arguments("not a\\(1\\) or b and not c or not d or e and f", "( ( ( not ( a\\(1\\) ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )")
        );
    }

    @ParameterizedTest
    @MethodSource("data")
    public void parser_expression(final String infix, final String expected) {
        Expression expr = parser.parse(infix);
        assertEquals(expected, expr.toString());
    }

}
