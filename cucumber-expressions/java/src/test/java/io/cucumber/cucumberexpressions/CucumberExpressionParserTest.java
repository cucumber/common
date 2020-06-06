package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.AstNode;
import org.junit.jupiter.api.Test;

import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.ALTERNATION_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.ALTERNATIVE_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.EXPRESSION_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.OPTIONAL_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.PARAMETER_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.TEXT_NODE;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CucumberExpressionParserTest {

    private final CucumberExpressionParser parser = new CucumberExpressionParser();

    @Test
    void emptyString() {
        assertThat(astOf(""), equalTo(
                new AstNode(EXPRESSION_NODE)
        ));
    }

    @Test
    void phrase() {
        assertThat(astOf("three blind mice"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "three"),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(TEXT_NODE, "blind"),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(TEXT_NODE, "mice")
                )
        ));
    }

    @Test
    void optional() {
        assertThat(astOf("(blind)"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(OPTIONAL_NODE,
                                new AstNode(TEXT_NODE, "blind")
                        )
                )
        ));
    }

    @Test
    void parameter() {
        assertThat(astOf("{string}"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(PARAMETER_NODE,
                                new AstNode(TEXT_NODE, "string")
                        )
                )
        ));
    }

    @Test
    void anonymousParameter() {
        assertThat(astOf("{}"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(PARAMETER_NODE)
                )
        ));
    }

    @Test
    void optionalPhrase() {
        assertThat(astOf("three (blind) mice"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "three"),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(OPTIONAL_NODE,
                                new AstNode(TEXT_NODE, "blind")
                        ),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(TEXT_NODE, "mice")
                )
        ));
    }

    @Test
    void escapedEndOfLine() {
        // TODO: Better error message
        CucumberExpressionException exception = assertThrows(CucumberExpressionException.class, () -> astOf("\\"));
        assertThat(exception.getMessage(), is("End of line can not be escaped"));
    }

    @Test
    void escapedBackSlash() {
        assertThat(astOf("\\\\"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "\\")
                )
        ));
    }

    @Test
    void openingBrace() {
        //TODO: Improve message
        CucumberExpressionException exception = assertThrows(CucumberExpressionException.class, () -> astOf("{"));
        assertThat(exception.getMessage(), is("missing END_PARAMETER at 3"));
    }

    @Test
    void closingBrace() {
        assertThat(astOf("}"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "}")
                )
        ));
    }

    @Test
    void unfinishedParameter() {
        //TODO: Improve message
        CucumberExpressionException exception = assertThrows(CucumberExpressionException.class, () -> astOf("{string"));
        assertThat(exception.getMessage(), is("missing END_PARAMETER at 4"));
    }

    @Test
    void openingParenthesis() {
        //TODO: Improve message
        CucumberExpressionException exception = assertThrows(CucumberExpressionException.class, () -> astOf("("));
        assertThat(exception.getMessage(), is("missing END_OPTIONAL at 3"));
    }

    @Test
    void closingParenthesis() {
        assertThat(astOf(")"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, ")")
                )
        ));
    }

    @Test
    void escapedOpeningParenthesis() {
        assertThat(astOf("\\("), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "(")
                )
        ));
    }

    @Test
    void escapedOptional() {
        assertThat(astOf("\\(blind)"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "(blind"),
                        new AstNode(TEXT_NODE, ")")
                )
        ));
    }

    @Test
    void escapedOptionalPhrase() {
        assertThat(astOf("three \\(blind) mice"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "three"),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(TEXT_NODE, "(blind"),
                        new AstNode(TEXT_NODE, ")"),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(TEXT_NODE, "mice")
                )
        ));
    }

    @Test
    void escapedOptionalFollowedByOptional() {
        assertThat(astOf("three \\((very) blind) mice"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "three"),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(TEXT_NODE, "("),
                        new AstNode(OPTIONAL_NODE,
                                new AstNode(TEXT_NODE, "very")
                        ),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(TEXT_NODE, "blind"),
                        new AstNode(TEXT_NODE, ")"),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(TEXT_NODE, "mice")
                )
        ));
    }

    @Test
    void optionalContainingEscapedOptional() {
        assertThat(astOf("three ((very\\) blind) mice"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "three"),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(OPTIONAL_NODE,
                                new AstNode(TEXT_NODE, "("),
                                new AstNode(TEXT_NODE, "very)"),
                                new AstNode(TEXT_NODE, " "),
                                new AstNode(TEXT_NODE, "blind")
                        ),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(TEXT_NODE, "mice")
                )
        ));
    }

    @Test
    void alternation() {
        assertThat(astOf("mice/rats"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, "mice")
                                ),
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, "rats")
                                )
                        )
                )
        ));
    }

    @Test
    void emptyAlternation() {
        assertThat(astOf("/"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE),
                                new AstNode(ALTERNATIVE_NODE)
                        )
                )
        ));
    }

    @Test
    void emptyAlternations() {
        assertThat(astOf("//"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE),
                                new AstNode(ALTERNATIVE_NODE),
                                new AstNode(ALTERNATIVE_NODE)
                        )
                )
        ));
    }

    @Test
    void escapedAlternation() {
        assertThat(astOf("mice\\/rats"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "mice/rats")
                )
        ));
    }

    @Test
    void alternationPhrase() {
        assertThat(astOf("three hungry/blind mice"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "three"),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, "hungry")
                                ),
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, "blind")
                                )
                        ),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(TEXT_NODE, "mice")
                )
        ));
    }

    @Test
    void alternationWithWhiteSpace() {
        assertThat(astOf("\\ three\\ hungry/blind\\ mice\\ "), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, " three hungry")
                                ),
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, "blind mice ")
                                )
                        )

                )
        ));
    }

    @Test
    void alternationWithUnusedEndOptional() {
        assertThat(astOf("three )blind\\ mice/rats"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "three"),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, ")"),
                                        new AstNode(TEXT_NODE, "blind mice")
                                ),
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, "rats")
                                )
                        )
                )
        ));
    }

    @Test
    void alternationWithUnusedStartOptional() {
        //TODO: Improve message
        CucumberExpressionException exception = assertThrows(
                CucumberExpressionException.class,
                () -> astOf("three blind\\ mice/rats("));
        assertThat(exception.getMessage(), is("missing END_OPTIONAL at 8"));
    }

    @Test
    void alternationFollowedByOptional() {
        assertThat(astOf("three blind\\ rat/cat(s)"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, "three"),
                        new AstNode(TEXT_NODE, " "),
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, "blind rat")
                                ),
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, "cat"),
                                        new AstNode(OPTIONAL_NODE,
                                                new AstNode(TEXT_NODE, "s")
                                        )
                                )
                        )
                )
        ));
    }

    private AstNode astOf(String expression) {
        return parser.parse(expression);
    }

}
