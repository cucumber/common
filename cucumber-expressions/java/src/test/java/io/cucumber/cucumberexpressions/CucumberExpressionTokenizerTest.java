package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Token;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.converter.ConvertWith;
import org.junit.jupiter.params.provider.MethodSource;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import static java.nio.file.Files.newDirectoryStream;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CucumberExpressionTokenizerTest {

    private final CucumberExpressionTokenizer tokenizer = new CucumberExpressionTokenizer();

    private static DirectoryStream<Path> test() throws IOException {
        return newDirectoryStream(Paths.get("testdata", "tokens")) ;
    }

    @ParameterizedTest
    @MethodSource
    void test(@ConvertWith(FileToExpectationConverter.class) Expectation expectation) {
        if (expectation.getException() == null) {
            String tokens = tokenizer
                    .tokenize(expectation.getExpression())
                    .stream()
                    .map(Token::toString)
                    .collect(Collectors.joining(",\n  ", "[\n  ","\n]"));
            assertThat(tokens, is(expectation.getElement()));
        } else {
            CucumberExpressionException exception = assertThrows(
                    CucumberExpressionException.class,
                    () -> tokenizer.tokenize(expectation.getExpression()));
            assertThat(exception.getMessage(), is(exception.getMessage()));
        }
    }

}
