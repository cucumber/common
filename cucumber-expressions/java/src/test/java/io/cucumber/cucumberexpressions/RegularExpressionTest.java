package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static java.util.regex.Pattern.compile;
import static org.junit.Assert.assertEquals;

public class RegularExpressionTest {
    @Test
    public void documentation_match_arguments() {
        ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);

        /// [capture-match-arguments]
        Pattern expr = Pattern.compile("I have (\\d+) cukes? in my (\\w+) now");
        Expression expression = new RegularExpression(expr, parameterTypeRegistry);
        List<Argument> match = expression.match("I have 7 cukes in my belly now");
        assertEquals(7, match.get(0).getTransformedValue());
        assertEquals("belly", match.get(1).getTransformedValue());
        /// [capture-match-arguments]
    }

    @Test
    public void matches_positive_int() {
        List<?> match = match(compile("(\\d+)"), "22");
        assertEquals(singletonList(22), match);
    }

    @Test
    public void ignores_non_capturing_groups() {
        String expr = "(\\S+) ?(can|cannot)? (?:delete|cancel) the (\\d+)(?:st|nd|rd|th) (attachment|slide) ?(?:upload)?";
        String step = "I can cancel the 1st slide upload";
        List<?> match = match(compile(expr), step);
        assertEquals(asList("I", "can", 1, "slide"), match);
    }

    @Test
    public void exposes_source() {
        String expr = "I have (\\d+) cukes? in my (.+) now";
        assertEquals(expr, new RegularExpression(Pattern.compile(expr), new ParameterTypeRegistry(Locale.ENGLISH)).getSource());
    }

    private List<?> match(Pattern pattern, String text) {
        return match(pattern, text, Locale.ENGLISH);
    }

    private List<?> match(Pattern pattern, String text, Locale locale) {
        ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(locale);
        RegularExpression regularExpression;
        regularExpression = new RegularExpression(pattern, parameterTypeRegistry);
        List<Argument> arguments = regularExpression.match(text);
        List<Object> transformedValues = new ArrayList<>();
        for (Argument argument : arguments) {
            transformedValues.add(argument.getTransformedValue());
        }
        return transformedValues;
    }
}
