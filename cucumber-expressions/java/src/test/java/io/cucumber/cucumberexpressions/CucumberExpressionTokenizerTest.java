package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Token;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static io.cucumber.cucumberexpressions.Ast.Token.Type.ALTERNATION;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.BEGIN_OPTIONAL;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.BEGIN_PARAMETER;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_OF_LINE;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_OPTIONAL;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.END_PARAMETER;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.START_OF_LINE;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.TEXT;
import static io.cucumber.cucumberexpressions.Ast.Token.Type.WHITE_SPACE;
import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Collections.singletonList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CucumberExpressionTokenizerTest {

    private final CucumberExpressionTokenizer tokenizer = new CucumberExpressionTokenizer();
    private String displayName;

    private static Stream<Expectation> test() throws IOException {
        List<Expectation> expectations = new ArrayList<>();
        Path testdata = Paths.get("testdata/tokens");
        Yaml yaml = new Yaml();
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(testdata)) {
            for (Path path : stream) {
                InputStream inputStream = Files.newInputStream(path);
                Map<?, ?> map = yaml.loadAs(inputStream, Map.class);
                Expectation expectation = new Expectation(
                        (String) map.get("expression"),
                        (List<String>) map.get("tokens"),
                        (String) map.get("exception"));
                expectations.add(expectation);
            }
        }
        return expectations.stream();
    }

    @ParameterizedTest
    @MethodSource
    void test(Expectation expectation) {
        if (expectation.getException() == null) {
            List<String> tokens = tokenizer
                    .tokenize(expectation.getExpression())
                    .stream()
                    .map(Token::toString)
                    .collect(Collectors.toList());
            assertThat(tokens, is(expectation.getTokens()));
        } else {
            CucumberExpressionException exception = assertThrows(
                    CucumberExpressionException.class,
                    () -> tokenizer.tokenize(expectation.getExpression()));
            assertThat(exception.getMessage(), is(exception.getMessage()));
        }
    }

    @BeforeEach
    void setup(TestInfo testInfo) {
        String displayName = testInfo.getDisplayName();
        this.displayName = displayName.substring(0, displayName.length() - 2);

    }

    public static class Expectation {
        String expression;
        List<String> tokens;
        String exception;

        Expectation(String expression, List<String> tokens, String exception) {
            this.expression = expression;
            this.tokens = tokens;
            this.exception = exception;
        }

        public String getExpression() {
            return expression;
        }

        public List<String> getTokens() {
            return tokens;
        }

        public String getException() {
            return exception;
        }

        public void setExpression(String expression) {
            this.expression = expression;
        }

        public void setTokens(List<String> tokens) {
            this.tokens = tokens;
        }

        public void setException(String exception) {
            this.exception = exception;
        }

    }

    private List<Token> tokenize(String s) {
        List<String> tokensString = null;
        List<Token> tokens = null;
        String t = null;
        RuntimeException orig = null;
        try {
            tokens = tokenizer.tokenize(s);
            tokensString = tokens.stream().map(Token::toString).collect(Collectors.toList());
        } catch (RuntimeException e) {
            orig = e;
            t = e.getMessage();
        }

        DumperOptions dumperOptions = new DumperOptions();
        String yaml = new Yaml(dumperOptions).dumpAsMap(new Expectation(s, tokensString, t));
        try {
            Files.write(Paths.get("testdata", "tokens", displayName + ".yaml"), singletonList(yaml), UTF_8);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        if (orig != null) {
            throw orig;
        }

        return tokens;
    }

    @Test
    void emptyString() {
        assertThat(tokenize(""), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("", END_OF_LINE, 0, 0)
        ));
    }

    @Test
    void phrase() {
        assertThat(tokenize("three blind mice"), contains(
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
        assertThat(tokenize("(blind)"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("(", BEGIN_OPTIONAL, 0, 1),
                new Token("blind", TEXT, 1, 6),
                new Token(")", END_OPTIONAL, 6, 7),
                new Token("", END_OF_LINE, 7, 7)
        ));
    }

    @Test
    void escapedOptional() {
        assertThat(tokenize("\\(blind\\)"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("(blind)", TEXT, 0, 9),
                new Token("", END_OF_LINE, 9, 9)
        ));
    }

    @Test
    void optionalPhrase() {
        assertThat(tokenize("three (blind) mice"), contains(
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
        assertThat(tokenize("{string}"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("{", BEGIN_PARAMETER, 0, 1),
                new Token("string", TEXT, 1, 7),
                new Token("}", END_PARAMETER, 7, 8),
                new Token("", END_OF_LINE, 8, 8)
        ));
    }

    @Test
    void escapedParameter() {
        assertThat(tokenize("\\{string\\}"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("{string}", TEXT, 0, 10),
                new Token("", END_OF_LINE, 10, 10)
        ));
    }

    @Test
    void parameterPhrase() {
        assertThat(tokenize("three {string} mice"), contains(
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
        assertThat(tokenize("blind/cripple"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("blind", TEXT, 0, 5),
                new Token("/", ALTERNATION, 5, 6),
                new Token("cripple", TEXT, 6, 13),
                new Token("", END_OF_LINE, 13, 13)
        ));
    }

    @Test
    void escapedAlternation() {
        assertThat(tokenize("blind\\ and\\ famished\\/cripple mice"), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token("blind and famished/cripple", TEXT, 0, 29),
                new Token(" ", WHITE_SPACE, 29, 30),
                new Token("mice", TEXT, 30, 34),
                new Token("", END_OF_LINE, 34, 34)
        ));
    }

    @Test
    void escapeCharIsStartIndexOfTextToken() {
        assertThat(tokenize(" \\/ "), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token(" ", WHITE_SPACE, 0, 1),
                new Token("/", TEXT, 1, 3),
                new Token(" ", WHITE_SPACE, 3, 4),
                new Token("", END_OF_LINE, 4, 4)
        ));
    }

    @Test
    void alternationPhrase() {
        assertThat(tokenize("three blind/cripple mice"), contains(
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
        assertThat(tokenize("\\ "), contains(
                new Token("", START_OF_LINE, 0, 0),
                new Token(" ", TEXT, 0, 2),
                new Token("", END_OF_LINE, 2, 2)
        ));
    }

    @Test
    void escapedEndOfLine() {
        CucumberExpressionException exception = assertThrows(CucumberExpressionException.class, () -> tokenize("\\"));
        assertThat(exception.getMessage(), is("This Cucumber Expression has a problem at column 2:\n" +
                "\n" +
                "\\\n" +
                " ^\n" +
                "The end of line can not be escaped.\n" +
                "You can use '\\\\' to escape the the '\\'"));
    }

    @Test
    void escapeNonReservedCharacter() {
        CucumberExpressionException exception = assertThrows(CucumberExpressionException.class, () -> tokenize("\\["));
        assertThat(exception.getMessage(), is("This Cucumber Expression has a problem at column 2:\n" +
                "\n" +
                "\\[\n" +
                " ^\n" +
                "Only the characters '{', '}', '(', ')', '\\', '/' and whitespace can be escaped.\n" +
                "If you did mean to use an '\\' you can use '\\\\' to escape it"));
    }

}
