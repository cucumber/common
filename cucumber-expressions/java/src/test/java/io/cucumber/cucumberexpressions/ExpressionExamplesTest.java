package io.cucumber.cucumberexpressions;

import com.google.common.io.Files;
import com.google.gson.Gson;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
public class ExpressionExamplesTest {
    private static final Pattern REGEX_PATTERN = Pattern.compile("/(.*)/");
    private final String expressionString;
    private final String text;
    private final String expectedArgs;

    @Parameters
    public static Collection<Object[]> data() throws IOException {
        Collection<Object[]> data = new ArrayList<>();

        String s = Files.toString(new File("examples.txt"), Charset.forName("UTF-8"));
        String[] chunks = s.split("---");
        for (String chunk : chunks) {
            chunk = chunk.trim();
            data.add(chunk.split("\n"));
        }
        return data;
    }

    public ExpressionExamplesTest(String expressionString, String text, String expectedArgs) {
        this.expressionString = expressionString;
        this.text = text;
        this.expectedArgs = expectedArgs;
    }

    @Test
    public void works_with_expression() {
        String args = new Gson().toJson(match(expressionString, text));
        assertEquals(expectedArgs, args);
    }

    private List<Object> match(String expressionString, String text) {
        Expression expression;
        Matcher matcher = REGEX_PATTERN.matcher(expressionString);
        TransformLookup transformLookup = new TransformLookup(Locale.ENGLISH);
        if (matcher.matches()) {
            expression = new RegularExpression(Pattern.compile(matcher.group(1)), Collections.<Class<?>>emptyList(), transformLookup);
        } else {
            expression = new CucumberExpression(expressionString, Collections.<Class<?>>emptyList(), transformLookup);
        }
        List<Argument> arguments = expression.match(text);
        if (arguments == null) return null;
        List<Object> transformedValues = new ArrayList<>();
        for (Argument argument : arguments) {
            transformedValues.add(argument.getTransformedValue());
        }
        return transformedValues;
    }
}