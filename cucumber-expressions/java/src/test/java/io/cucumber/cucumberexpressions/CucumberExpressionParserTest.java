package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Node;
import org.junit.jupiter.api.Test;

import static io.cucumber.cucumberexpressions.Ast.Node.Type.ALTERNATION_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.ALTERNATIVE_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.EXPRESSION_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.OPTIONAL_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.PARAMETER_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.TEXT_NODE;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.fail;

class CucumberExpressionParserTest {

    private final CucumberExpressionParser parser = new CucumberExpressionParser();

    @Test
    void emptyString() {
        assertThat(astOf(""), equalTo(
                new Node(EXPRESSION_NODE, 0, 0)
        ));
    }

    @Test
    void phrase() {
        assertThat(astOf("three blind mice"), equalTo(
                new Node(EXPRESSION_NODE, 0, 16,
                        new Node(TEXT_NODE, 0, 5, "three"),
                        new Node(TEXT_NODE, 5, 6, " "),
                        new Node(TEXT_NODE, 6, 11, "blind"),
                        new Node(TEXT_NODE, 11, 12, " "),
                        new Node(TEXT_NODE, 12, 16, "mice")
                )
        ));
    }

    @Test
    void optional() {
        assertThat(astOf("(blind)"), equalTo(
                new Node(EXPRESSION_NODE, 0, 7,
                        new Node(OPTIONAL_NODE, 0, 7,
                                new Node(TEXT_NODE, 1, 6, "blind")
                        )
                )
        ));
    }

    @Test
    void parameter() {
        assertThat(astOf("{string}"), equalTo(
                new Node(EXPRESSION_NODE, 0, 8,
                        new Node(PARAMETER_NODE, 0, 8,
                                new Node(TEXT_NODE, 1, 7, "string")
                        )
                )
        ));
    }

    @Test
    void anonymousParameter() {
        assertThat(astOf("{}"), equalTo(
                new Node(EXPRESSION_NODE, 0, 2,
                        new Node(PARAMETER_NODE, 0, 2)
                )
        ));
    }


        @Test
        void optionalPhrase() {
            assertThat(astOf("three (blind) mice"), equalTo(
                    new Node(EXPRESSION_NODE,0,18,
                            new Node(TEXT_NODE, 0, 5, "three"),
                            new Node(TEXT_NODE, 5, 6, " "),
                            new Node(OPTIONAL_NODE, 6, 13,
                                    new Node(TEXT_NODE, 7, 12, "blind")
                            ),
                            new Node(TEXT_NODE, 13, 14, " "),
                            new Node(TEXT_NODE, 14, 18, "mice")
                    )
            ));
        }

        @Test
        void escapedEndOfLine() {
            CucumberExpressionException exception = assertThrows(CucumberExpressionException.class, () -> astOf("\\"));
            assertThat(exception.getMessage(), is("This Cucumber Expression has a problem at column 2:\n" +
                    "\n" +
                    "\\\n" +
                    " ^\n" +
                    "The end of line can not be escaped.\n" +
                    "You can use '\\\\' to escape the the '\\'"));
        }

        @Test
        void escapeNonReservedCharacter() {
            CucumberExpressionException exception = assertThrows(CucumberExpressionException.class, () -> astOf("\\["));
            assertThat(exception.getMessage(), is("This Cucumber Expression has a problem at column 2:\n" +
                    "\n" +
                    "\\[\n" +
                    " ^\n" +
                    "Only the characters '{', '}', '(', ')', '\\', '/' and whitespace can be escaped.\n" +
                    "If you did mean to use an '\\' you can use '\\\\' to escape it"));
        }

        @Test
        void escapedBackSlash() {
            assertThat(astOf("\\\\"), equalTo(
                    new Node(EXPRESSION_NODE,0,2,
                            new Node(TEXT_NODE, 0, 2, "\\")
                    )
            ));
        }

        @Test
        void openingBrace() {
            CucumberExpressionException exception = assertThrows(CucumberExpressionException.class, () -> astOf("{"));
            assertThat(exception.getMessage(), is("This Cucumber Expression has a problem at column 1:\n" +
                    "\n" +
                    "{\n" +
                    "^\n" +
                    "The '{' does not have a matching '}'.\n" +
                    "If you did not intend to use a parameter you can use '\\{' to escape the a parameter"
            ));
        }

        @Test
        void closingBrace() {
            assertThat(astOf("}"), equalTo(
                    new Node(EXPRESSION_NODE,0,1,
                            new Node(TEXT_NODE, 0, 1, "}")
                    )
            ));
        }

        @Test
        void unfinishedParameter() {
            CucumberExpressionException exception = assertThrows(CucumberExpressionException.class, () -> astOf("{string"));
            assertThat(exception.getMessage(), is("This Cucumber Expression has a problem at column 1:\n" +
                    "\n" +
                    "{string\n" +
                    "^\n" +
                    "The '{' does not have a matching '}'.\n" +
                    "If you did not intend to use a parameter you can use '\\{' to escape the a parameter"));
        }

        @Test
        void openingParenthesis() {
            CucumberExpressionException exception = assertThrows(CucumberExpressionException.class, () -> astOf("("));
            assertThat(exception.getMessage(), is("This Cucumber Expression has a problem at column 1:\n" +
                    "\n" +
                    "(\n" +
                    "^\n" +
                    "The '(' does not have a matching ')'.\n" +
                    "If you did not intend to use optional text you can use '\\(' to escape the optional text"
            ));
        }

        @Test
        void closingParenthesis() {
            assertThat(astOf(")"), equalTo(
                    new Node(EXPRESSION_NODE,0,1,
                            new Node(TEXT_NODE, 0, 1, ")")
                    )
            ));
        }

        @Test
        void escapedOpeningParenthesis() {
            assertThat(astOf("\\("), equalTo(
                    new Node(EXPRESSION_NODE,0,2,
                            new Node(TEXT_NODE, 0, 2, "(")
                    )
            ));
        }

        @Test
        void escapedOptional() {
            assertThat(astOf("\\(blind)"), equalTo(
                    new Node(EXPRESSION_NODE,0,8,
                            new Node(TEXT_NODE, 0, 7, "(blind"),
                            new Node(TEXT_NODE, 7, 8, ")")
                    )
            ));
        }

        @Test
        void escapedOptionalPhrase() {
            assertThat(astOf("three \\(blind) mice"), equalTo(
                    new Node(EXPRESSION_NODE,0,19,
                            new Node(TEXT_NODE, 0, 5, "three"),
                            new Node(TEXT_NODE, 5, 6, " "),
                            new Node(TEXT_NODE, 6, 13, "(blind"),
                            new Node(TEXT_NODE, 13, 14, ")"),
                            new Node(TEXT_NODE, 14, 15, " "),
                            new Node(TEXT_NODE, 15, 19, "mice")
                    )
            ));
        }

        @Test
        void escapedOptionalFollowedByOptional() {
            assertThat(astOf("three \\((very) blind) mice"), equalTo(
                    new Node(EXPRESSION_NODE, 0, 26,
                            new Node(TEXT_NODE, 0, 5, "three"),
                            new Node(TEXT_NODE, 5, 6, " "),
                            new Node(TEXT_NODE, 6, 8, "("),
                            new Node(OPTIONAL_NODE, 8, 14,
                                    new Node(TEXT_NODE, 9, 13, "very")
                            ),
                            new Node(TEXT_NODE, 14, 15, " "),
                            new Node(TEXT_NODE, 15, 20, "blind"),
                            new Node(TEXT_NODE, 20, 21, ")"),
                            new Node(TEXT_NODE, 21, 22, " "),
                            new Node(TEXT_NODE, 22, 26, "mice")
                    )
            ));
        }

        @Test
        void optionalContainingEscapedOptional() {
            assertThat(astOf("three ((very\\) blind) mice"), equalTo(
                    new Node(EXPRESSION_NODE, 0, 26,
                            new Node(TEXT_NODE, 0, 5, "three"),
                            new Node(TEXT_NODE, 5, 6, " "),
                            new Node(OPTIONAL_NODE, 6,21,
                                    new Node(TEXT_NODE, 7, 8, "("),
                                    new Node(TEXT_NODE, 8, 14, "very)"),
                                    new Node(TEXT_NODE, 14, 15, " "),
                                    new Node(TEXT_NODE, 15, 20, "blind")
                            ),
                            new Node(TEXT_NODE, 21, 22, " "),
                            new Node(TEXT_NODE, 22, 26, "mice")
                    )
            ));
        }

        @Test
        void alternation() {
            assertThat(astOf("mice/rats"), equalTo(
                    new Node(EXPRESSION_NODE, 0,9,
                            new Node(ALTERNATION_NODE, 0,9,
                                    new Node(ALTERNATIVE_NODE,0,4,
                                            new Node(TEXT_NODE, 0, 4, "mice")
                                    ),
                                    new Node(ALTERNATIVE_NODE, 5,9,
                                            new Node(TEXT_NODE, 5, 9, "rats")
                                    )
                            )
                    )
            ));
        }

        @Test
        void emptyAlternation() {
            assertThat(astOf("/"), equalTo(
                    new Node(EXPRESSION_NODE,0,1,
                            new Node(ALTERNATION_NODE,0,1,
                                    new Node(ALTERNATIVE_NODE, 0,0),
                                    new Node(ALTERNATIVE_NODE, 1,1)
                            )
                    )
            ));
        }

        @Test
        void emptyAlternations() {
            assertThat(astOf("//"), equalTo(
                    new Node(EXPRESSION_NODE,0,2,
                            new Node(ALTERNATION_NODE, 0,2,
                                    new Node(ALTERNATIVE_NODE, 0,0),
                                    new Node(ALTERNATIVE_NODE, 1,1),
                                    new Node(ALTERNATIVE_NODE, 2,2)
                            )
                    )
            ));
        }

        @Test
        void escapedAlternation() {
            assertThat(astOf("mice\\/rats"), equalTo(
                    new Node(EXPRESSION_NODE, 0, 10,
                            new Node(TEXT_NODE, 0, 10, "mice/rats")
                    )
            ));
        }

        @Test
        void alternationPhrase() {
            assertThat(astOf("three hungry/blind mice"), equalTo(
                    new Node(EXPRESSION_NODE, 0, 23,
                            new Node(TEXT_NODE, 0, 5, "three"),
                            new Node(TEXT_NODE, 5, 6, " "),
                            new Node(ALTERNATION_NODE, 6,18,
                                    new Node(ALTERNATIVE_NODE, 6, 12,
                                            new Node(TEXT_NODE, 6, 12, "hungry")
                                    ),
                                    new Node(ALTERNATIVE_NODE, 13, 18,
                                            new Node(TEXT_NODE, 13, 18, "blind")
                                    )
                            ),
                            new Node(TEXT_NODE, 18, 19, " "),
                            new Node(TEXT_NODE, 19, 23, "mice")
                    )
            ));
        }

        @Test
        void alternationWithWhiteSpace() {
            assertThat(astOf("\\ three\\ hungry/blind\\ mice\\ "), equalTo(
                    new Node(EXPRESSION_NODE, 0, 29,
                            new Node(ALTERNATION_NODE, 0,29,
                                    new Node(ALTERNATIVE_NODE,0,15,
                                            new Node(TEXT_NODE, 0, 15, " three hungry")
                                    ),
                                    new Node(ALTERNATIVE_NODE,16,29,
                                            new Node(TEXT_NODE, 16, 29, "blind mice ")
                                    )
                            )

                    )
            ));
        }

        @Test
        void alternationWithUnusedEndOptional() {
            assertThat(astOf("three )blind\\ mice/rats"), equalTo(
                    new Node(EXPRESSION_NODE,0,23,
                            new Node(TEXT_NODE, 0, 5, "three"),
                            new Node(TEXT_NODE, 5, 6, " "),
                            new Node(ALTERNATION_NODE,6,23,
                                    new Node(ALTERNATIVE_NODE,6,18,
                                            new Node(TEXT_NODE, 6, 7, ")"),
                                            new Node(TEXT_NODE, 7, 18, "blind mice")
                                    ),
                                    new Node(ALTERNATIVE_NODE,19,23,
                                            new Node(TEXT_NODE, 19, 23, "rats")
                                    )
                            )
                    )
            ));
        }

        @Test
        void alternationWithUnusedStartOptional() {
            CucumberExpressionException exception = assertThrows(
                    CucumberExpressionException.class,
                    () -> astOf("three blind\\ mice/rats("));
            assertThat(exception.getMessage(), is("" +
                    "This Cucumber Expression has a problem at column 23:\n" +
                    "\n" +
                    "three blind\\ mice/rats(\n" +
                    "                      ^\n" +
                    "The '(' does not have a matching ')'.\n" +
                    "If you did not intend to use optional text you can use '\\(' to escape the optional text"));
        }

        @Test
        void alternationFollowedByOptional() {
            assertThat(astOf("three blind\\ rat/cat(s)"), equalTo(
                    new Node(EXPRESSION_NODE,0,23,
                            new Node(TEXT_NODE, 0, 5, "three"),
                            new Node(TEXT_NODE, 5, 6, " "),
                            new Node(ALTERNATION_NODE,6,23,
                                    new Node(ALTERNATIVE_NODE,6,16,
                                            new Node(TEXT_NODE, 6, 16, "blind rat")
                                    ),
                                    new Node(ALTERNATIVE_NODE,17,23,
                                            new Node(TEXT_NODE, 17, 20, "cat"),
                                            new Node(OPTIONAL_NODE,20,23,
                                                    new Node(TEXT_NODE, 21, 22, "s")
                                            )
                                    )
                            )
                    )
            ));
        }

    private Node astOf(String expression) {
        return parser.parse(expression);
    }

}
