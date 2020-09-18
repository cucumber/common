package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Node;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.converter.ConvertWith;
import org.junit.jupiter.params.provider.MethodSource;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static java.nio.file.Files.newDirectoryStream;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CucumberExpressionParserTest {

    private final CucumberExpressionParser parser = new CucumberExpressionParser();

    private static List<Path> acceptance_tests_pass() throws IOException {
        List<Path> paths = new ArrayList<>();
        newDirectoryStream(Paths.get("testdata", "ast")).forEach(paths::add);
        paths.sort(Comparator.naturalOrder());
        return paths;
    }

    @ParameterizedTest
    @MethodSource
    void acceptance_tests_pass(@ConvertWith(FileToExpectationConverter.class) Expectation expectation) {
        if (expectation.getException() == null) {
            Node node = parser.parse(expectation.getExpression());
            assertThat(node.toString(), is(expectation.getExpected()));
        } else {
            CucumberExpressionException exception = assertThrows(
                    CucumberExpressionException.class,
                    () -> parser.parse(expectation.getExpression()));
            assertThat(exception.getMessage(), is(expectation.getException()));
        }
    }

}
