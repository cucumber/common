package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Token;
import org.junit.jupiter.api.Test;

import static io.cucumber.cucumberexpressions.Ast.Token.Type.ALTERNATION;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.BEGIN_OPTIONAL;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_OF_LINE;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_OPTIONAL;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_PARAMETER;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.START_OF_LINE;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.TEXT;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.WHITE_SPACE;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.contains;

class CucumberExpressionTokenizerTest {

    private final CucumberExpressionTokenizer tokenizer = new CucumberExpressionTokenizer();

    @Test
    void emptyString() {
        assertThat(tokenizer.tokenize(""), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("", END_OF_LINE, 0, 0)
        ));
    }

    @Test
    void phrase() {
        assertThat(tokenizer.tokenize("three blind mice"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("three", TEXT, 0, 5),
                new Token(" ", WHITE_SPACE, 5, 6),
                new Token("blind", TEXT, 6, 11),
                new Token(" ", WHITE_SPACE, 11, 12),
                new Token("mice", TEXT, 12, 16),
                new Token("", END_OF_LINE, 16, 16)
        ));
    }

    @Test
    void optional() {
        assertThat(tokenizer.tokenize("(blind)"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("(", BEGIN_OPTIONAL, 0, 1),
                new Token("blind", TEXT, 1, 6),
                new Token(")", END_OPTIONAL, 6, 7),
                new Token("", END_OF_LINE, 7, 7)
        ));
    }

    @Test
    void escapedOptional() {
        assertThat(tokenizer.tokenize("\\(blind\\)"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("(blind)", TEXT, 0, 9),
                new Token("", END_OF_LINE, 9, 9)
        ));
    }

    @Test
    void optionalPhrase() {
        assertThat(tokenizer.tokenize("three (blind) mice"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("three", TEXT, 0, 5),
                new Token(" ", WHITE_SPACE, 5, 6),
                new Token("(", BEGIN_OPTIONAL, 6, 7),
                new Token("blind", TEXT, 7, 12),
                new Token(")", END_OPTIONAL, 12, 13),
                new Token(" ", WHITE_SPACE, 13, 14),
                new Token("mice", TEXT, 14, 18),
                new Token("", END_OF_LINE, 18, 18)
        ));
    }

    @Test
    void parameter() {
        assertThat(tokenizer.tokenize("{string}"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("{", BEGIN_PARAMETER, 0, 1),
                new Token("string", TEXT, 1, 7),
                new Token("}", END_PARAMETER, 7, 8),
                new Token("", END_OF_LINE, 8, 8)
        ));
    }

    @Test
    void escapedParameter() {
        assertThat(tokenizer.tokenize("\\{string\\}"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("{string}", TEXT, 0, 10),
                new Token("", END_OF_LINE, 10, 10)
        ));
    }

    @Test
    void parameterPhrase() {
        assertThat(tokenizer.tokenize("three {string} mice"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("three", TEXT, 0, 5),
                new Token(" ", WHITE_SPACE, 5, 6),
                new Token("{", BEGIN_PARAMETER, 6, 7),
                new Token("string", TEXT, 7, 13),
                new Token("}", END_PARAMETER, 13, 14),
                new Token(" ", WHITE_SPACE, 14, 15),
                new Token("mice", TEXT, 15, 19),
                new Token("", END_OF_LINE, 19, 19)
        ));
    }

    @Test
    void alternation() {
        assertThat(tokenizer.tokenize("blind/cripple"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("blind", TEXT, 0, 5),
                new Token("/", ALTERNATION, 5, 6),
                new Token("cripple", TEXT, 6, 13),
                new Token("", END_OF_LINE, 13, 13)
        ));
    }

    @Test
    void escapedAlternation() {
        assertThat(tokenizer.tokenize("blind\\ and\\ famished\\/cripple mice"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("blind and famished/cripple", TEXT, 0, 29),
                new Token(" ", WHITE_SPACE, 29, 30),
                new Token("mice", TEXT, 30, 34),
                new Token("", END_OF_LINE, 34, 34)
        ));
    }

    @Test
    void escapeCharIsStartIndexOfTextToken() {
        assertThat(tokenizer.tokenize(" \\/ "), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token(" ", WHITE_SPACE, 0, 1),
                new Token("/", TEXT, 1, 3),
                new Token(" ", WHITE_SPACE, 3, 4),
                new Token("", END_OF_LINE, 4, 4)
        ));
    }

    @Test
    void alternationPhrase() {
        assertThat(tokenizer.tokenize("three blind/cripple mice"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("three", TEXT, 0, 5),
                new Token(" ", WHITE_SPACE, 5, 6),
                new Token("blind", TEXT, 6, 11),
                new Token("/", ALTERNATION, 11, 12),
                new Token("cripple", TEXT, 12, 19),
                new Token(" ", WHITE_SPACE, 19, 20),
                new Token("mice", TEXT, 20, 24),
                new Token("", END_OF_LINE, 24, 24)
        ));
    }

    @Test
    void escapedSpace() {
        assertThat(tokenizer.tokenize("\\ "), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token(" ", TEXT, 0, 2),
                new Token("", END_OF_LINE, 2, 2)
        ));
    }

}
