package io.cucumber.cucumberexpressions;

import com.google.gson.Gson;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.nio.file.Files.readAllBytes;
import static java.nio.file.Paths.get;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.params.provider.Arguments.arguments;

public class ExpressionExamplesTest {

    private static final Pattern REGEX_PATTERN = Pattern.compile("/(.*)/");

    static Collection<Arguments> data() throws IOException {

        final Collection<Arguments> data = new ArrayList<>();

        String s = new String(readAllBytes(get("examples.txt")), Charset.forName("UTF-8"));
        String[] chunks = s.split("---");
        for (String chunk : chunks) {
            chunk = chunk.trim();
            final String[] split = chunk.split(System.lineSeparator());
            data.add(arguments(split[0], split[1], split[2]));
        }
        return data;
    }

    @ParameterizedTest
    @MethodSource("data")
    public void works_with_expression(final String expressionString, final String text, final String expectedArgs) {
        String args = new Gson().toJson(match(expressionString, text));
        assertEquals(expectedArgs, args, String.format("\nExpression: %s\n      Text: %s", expressionString, text));
    }

    private List<?> match(String expressionString, String text) {
        Expression expression;
        Matcher matcher = REGEX_PATTERN.matcher(expressionString);
        ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);
        if (matcher.matches()) {
            expression = new RegularExpression(Pattern.compile(matcher.group(1)), parameterTypeRegistry);
        } else {
            expression = new CucumberExpression(expressionString, parameterTypeRegistry);
        }
        List<Argument<?>> args = expression.match(text);
        if (args == null) {
            return null;
        } else {
            List<Object> list = new ArrayList<>();
            for (Argument<?> arg : args) {
                Object value = arg.getValue();
                list.add(value);
            }
            return list;
        }
    }

}
