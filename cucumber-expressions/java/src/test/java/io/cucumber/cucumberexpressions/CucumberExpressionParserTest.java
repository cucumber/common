package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.AstNode;
import io.cucumber.cucumberexpressions.Ast.Token;
import org.junit.jupiter.api.Test;

import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.ALTERNATION_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.ALTERNATIVE_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.EXPRESSION_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.OPTIONAL_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.PARAMETER_NODE;
import static io.cucumber.cucumberexpressions.Ast.AstNode.Type.TEXT_NODE;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.BEGIN_OPTIONAL;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_OPTIONAL;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.TEXT;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.WHITE_SPACE;
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
                        new AstNode(TEXT_NODE, new Token("three", TEXT)),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(TEXT_NODE, new Token("blind", TEXT)),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(TEXT_NODE, new Token("mice", TEXT))
                )
        ));
    }

    @Test
    void optional() {
        assertThat(astOf("(blind)"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(OPTIONAL_NODE,
                                new AstNode(TEXT_NODE, new Token("blind", TEXT))
                        )
                )
        ));
    }

    @Test
    void parameter() {
        assertThat(astOf("{string}"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(PARAMETER_NODE,
                                new AstNode(TEXT_NODE, new Token("string", TEXT))
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
                        new AstNode(TEXT_NODE, new Token("three", TEXT)),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(OPTIONAL_NODE,
                                new AstNode(TEXT_NODE, new Token("blind", TEXT))
                        ),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(TEXT_NODE, new Token("mice", TEXT))
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
                        new AstNode(TEXT_NODE, new Token("\\", TEXT))
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
    void escapedOpeningParenthesis() {
        assertThat(astOf("\\("), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, new Token("(", TEXT))
                )
        ));
    }

    @Test
    void escapedOptional() {
        assertThat(astOf("\\(blind)"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, new Token("(blind", TEXT)),
                        new AstNode(TEXT_NODE, new Token(")", END_OPTIONAL))
                )
        ));
    }

    @Test
    void escapedOptionalPhrase() {
        assertThat(astOf("three \\(blind) mice"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, new Token("three", TEXT)),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(TEXT_NODE, new Token("(blind", TEXT)),
                        new AstNode(TEXT_NODE, new Token(")", END_OPTIONAL)),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(TEXT_NODE, new Token("mice", TEXT))
                )
        ));
    }

    @Test
    void escapedOptionalFollowedByOptional() {
        assertThat(astOf("three \\((very) blind) mice"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, new Token("three", TEXT)),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(TEXT_NODE, new Token("(", TEXT)),
                        new AstNode(OPTIONAL_NODE,
                                new AstNode(TEXT_NODE, new Token("very", TEXT))
                        ),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(TEXT_NODE, new Token("blind", TEXT)),
                        new AstNode(TEXT_NODE, new Token(")", END_OPTIONAL)),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(TEXT_NODE, new Token("mice", TEXT))
                )
        ));
    }

    @Test
    void optionalContainingEscapedOptional() {
        assertThat(astOf("three ((very\\) blind) mice"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, new Token("three", TEXT)),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(OPTIONAL_NODE,
                                new AstNode(TEXT_NODE, new Token("(", BEGIN_OPTIONAL)),
                                new AstNode(TEXT_NODE, new Token("very)", TEXT)),
                                new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                                new AstNode(TEXT_NODE, new Token("blind", TEXT))
                        ),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(TEXT_NODE, new Token("mice", TEXT))
                )
        ));
    }

    @Test
    void alternation() {
        assertThat(astOf("mice/rats"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, new Token("mice", TEXT))
                                ),
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, new Token("rats", TEXT)))
                        )
                )
        ));
    }

    @Test
    void escapedAlternation() {
        assertThat(astOf("mice\\/rats"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, new Token("mice/rats", TEXT))
                )
        ));
    }

    @Test
    void alternationPhrase() {
        assertThat(astOf("three hungry/blind mice"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, new Token("three", TEXT)),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, new Token("hungry", TEXT))
                                ),
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, new Token("blind", TEXT))
                                )
                        ),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(TEXT_NODE, new Token("mice", TEXT))
                )
        ));
    }

    @Test
    void alternationWithWhiteSpace() {
        assertThat(astOf("\\ three\\ hungry/blind\\ mice\\ "), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, new Token(" three hungry", TEXT))
                                ),
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, new Token("blind mice ", TEXT))
                                )
                        )

                )
        ));
    }

    @Test
    void alternationWithUnusedEndOptional() {
        assertThat(astOf("three )blind\\ mice/rats"), equalTo(
                new AstNode(EXPRESSION_NODE,
                        new AstNode(TEXT_NODE, new Token("three", TEXT)),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, new Token(")", END_OPTIONAL)),
                                        new AstNode(TEXT_NODE, new Token("blind mice", TEXT))
                                ),
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, new Token("rats", TEXT))
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
                        new AstNode(TEXT_NODE, new Token("three", TEXT)),
                        new AstNode(TEXT_NODE, new Token(" ", WHITE_SPACE)),
                        new AstNode(ALTERNATION_NODE,
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, new Token("blind rat", TEXT))
                                ),
                                new AstNode(ALTERNATIVE_NODE,
                                        new AstNode(TEXT_NODE, new Token("cat", TEXT)),
                                        new AstNode(OPTIONAL_NODE,
                                                new AstNode(TEXT_NODE, new Token("s", TEXT))
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
