package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Token;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.converter.ConvertWith;
import org.junit.jupiter.params.provider.MethodSource;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static java.nio.file.Files.newDirectoryStream;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CucumberExpressionTokenizerTest {

    private final CucumberExpressionTokenizer tokenizer = new CucumberExpressionTokenizer();

    private static List<Path> acceptance_tests_pass() throws IOException {
        List<Path> paths = new ArrayList<>();
        newDirectoryStream(Paths.get("testdata", "tokens")).forEach(paths::add);
        paths.sort(Comparator.naturalOrder());
        return paths;
    }

    @ParameterizedTest
    @MethodSource
    void acceptance_tests_pass(@ConvertWith(FileToExpectationConverter.class) Expectation expectation) {
        if (expectation.getException() == null) {
            String tokens = tokenizer
                    .tokenize(expectation.getExpression())
                    .stream()
                    .map(Token::toString)
                    .collect(Collectors.joining(",\n  ", "[\n  ","\n]"));
            assertThat(tokens, is(expectation.getExpected()));
        } else {
            CucumberExpressionException exception = assertThrows(
                    CucumberExpressionException.class,
                    () -> tokenizer.tokenize(expectation.getExpression()));
            assertThat(exception.getMessage(), is(expectation.getException()));
        }
    }

}
