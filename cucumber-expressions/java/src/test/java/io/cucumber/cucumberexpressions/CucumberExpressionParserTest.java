package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Node;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.converter.ConvertWith;
import org.junit.jupiter.params.provider.MethodSource;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.nio.file.Files.newDirectoryStream;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CucumberExpressionParserTest {

    private final CucumberExpressionParser parser = new CucumberExpressionParser();

    private static DirectoryStream<Path> test() throws IOException {
        return newDirectoryStream(Paths.get("testdata", "ast"));
    }

    @ParameterizedTest
    @MethodSource
    void test(@ConvertWith(FileToExpectationConverter.class) Expectation expectation) {
        if (expectation.getException() == null) {
            Node node = parser.parse(expectation.getExpression());
            assertThat(node.toString(), is(expectation.getElement()));
        } else {
            CucumberExpressionException exception = assertThrows(
                    CucumberExpressionException.class,
                    () -> parser.parse(expectation.getExpression()));
            assertThat(exception.getMessage(), is(exception.getMessage()));
        }
    }

}
