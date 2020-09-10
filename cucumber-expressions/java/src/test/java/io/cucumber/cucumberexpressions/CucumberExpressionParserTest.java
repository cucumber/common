package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.Ast.Node;
import io.cucumber.cucumberexpressions.Ast.Token;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.converter.ConvertWith;
import org.junit.jupiter.params.provider.MethodSource;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static io.cucumber.cucumberexpressions.Ast.Node.Type.ALTERNATION_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.ALTERNATIVE_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.EXPRESSION_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.OPTIONAL_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.PARAMETER_NODE;
import static io.cucumber.cucumberexpressions.Ast.Node.Type.TEXT_NODE;
import static java.nio.file.Files.newDirectoryStream;
import static java.util.Collections.singletonList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CucumberExpressionParserTest {

    private final CucumberExpressionParser parser = new CucumberExpressionParser();

    private static DirectoryStream<Path> test() throws IOException {
        return newDirectoryStream(Paths.get("testdata", "ast")) ;
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
