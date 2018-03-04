package io.cucumber.cucumberexpressions;

import com.google.gson.Gson;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

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
import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
public class ExpressionExamplesTest {
    private static final Pattern REGEX_PATTERN = Pattern.compile("/(.*)/");
    private final String expressionString;
    private final String text;
    private final String expectedArgs;

    public ExpressionExamplesTest(String expressionString, String text, String expectedArgs) {
        this.expressionString = expressionString;
        this.text = text;
        this.expectedArgs = expectedArgs;
    }

    @Parameters
    public static Collection<Object[]> data() throws IOException {
        Collection<Object[]> data = new ArrayList<>();

        String s = new String(readAllBytes(get("examples.txt")), Charset.forName("UTF-8"));
        String[] chunks = s.split("---");
        for (String chunk : chunks) {
            chunk = chunk.trim();
            data.add(chunk.split("\n"));
        }
        return data;
    }

    @Test
    public void works_with_expression() {
        String args = new Gson().toJson(match(expressionString, text));
        assertEquals(String.format("\nExpression: %s\n      Text: %s", expressionString, text), expectedArgs, args);
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