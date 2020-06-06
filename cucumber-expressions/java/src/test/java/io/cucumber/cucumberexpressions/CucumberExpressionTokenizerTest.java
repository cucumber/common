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
                new Token("", START_OF_LINE),
                new Token("", END_OF_LINE)
        ));
    }

    @Test
    void phrase() {
        assertThat(tokenizer.tokenize("three blind mice"), contains(
                new Token("", START_OF_LINE),
                new Token("three", TEXT),
                new Token(" ", WHITE_SPACE),
                new Token("blind", TEXT),
                new Token(" ", WHITE_SPACE),
                new Token("mice", TEXT),
                new Token("", END_OF_LINE)
        ));
    }

    @Test
    void optional() {
        assertThat(tokenizer.tokenize("(blind)"), contains(
                new Token("", START_OF_LINE),
                new Token("(", BEGIN_OPTIONAL),
                new Token("blind", TEXT),
                new Token(")", END_OPTIONAL),
                new Token("", END_OF_LINE)
        ));
    }

    @Test
    void escapedOptional() {
        assertThat(tokenizer.tokenize("\\(blind\\)"), contains(
                new Token("", START_OF_LINE),
                new Token("(blind)", TEXT),
                new Token("", END_OF_LINE)
        ));
    }

    @Test
    void optionalPhrase() {
        assertThat(tokenizer.tokenize("three (blind) mice"), contains(
                new Token("", START_OF_LINE),
                new Token("three", TEXT),
                new Token(" ", WHITE_SPACE),
                new Token("(", BEGIN_OPTIONAL),
                new Token("blind", TEXT),
                new Token(")", END_OPTIONAL),
                new Token(" ", WHITE_SPACE),
                new Token("mice", TEXT),
                new Token("", END_OF_LINE)
        ));
    }

    @Test
    void parameter() {
        assertThat(tokenizer.tokenize("{string}"), contains(
                new Token("", START_OF_LINE),
                new Token("{", BEGIN_PARAMETER),
                new Token("string", TEXT),
                new Token("}", END_PARAMETER),
                new Token("", END_OF_LINE)
        ));
    }

    @Test
    void escapedParameter() {
        assertThat(tokenizer.tokenize("\\{string\\}"), contains(
                new Token("", START_OF_LINE),
                new Token("{string}", TEXT),
                new Token("", END_OF_LINE)
        ));
    }

    @Test
    void parameterPhrase() {
        assertThat(tokenizer.tokenize("three {string} mice"), contains(
                new Token("", START_OF_LINE),
                new Token("three", TEXT),
                new Token(" ", WHITE_SPACE),
                new Token("{", BEGIN_PARAMETER),
                new Token("string", TEXT),
                new Token("}", END_PARAMETER),
                new Token(" ", WHITE_SPACE),
                new Token("mice", TEXT),
                new Token("", END_OF_LINE)
        ));
    }


    @Test
    void alternation() {
        assertThat(tokenizer.tokenize("blind/cripple"), contains(
                new Token("", START_OF_LINE),
                new Token("blind", TEXT),
                new Token("/", ALTERNATION),
                new Token("cripple", TEXT),
                new Token("", END_OF_LINE)
        ));
    }

    @Test
    void escapedAlternation() {
        assertThat(tokenizer.tokenize("blind\\ and\\ famished\\/cripple mice"), contains(
                new Token("", START_OF_LINE),
                new Token("blind and famished/cripple", TEXT),
                new Token(" ", WHITE_SPACE),
                new Token("mice", TEXT),
                new Token("", END_OF_LINE)
        ));
    }

    @Test
    void alternationPhrase() {
        assertThat(tokenizer.tokenize("three blind/cripple mice"), contains(
                new Token("", START_OF_LINE),
                new Token("three", TEXT),
                new Token(" ", WHITE_SPACE),
                new Token("blind", TEXT),
                new Token("/", ALTERNATION),
                new Token("cripple", TEXT),
                new Token(" ", WHITE_SPACE),
                new Token("mice", TEXT),
                new Token("", END_OF_LINE)
        ));
    }
}
