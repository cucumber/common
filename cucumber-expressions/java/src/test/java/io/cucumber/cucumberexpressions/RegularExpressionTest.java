package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static java.util.regex.Pattern.compile;
import static org.junit.Assert.assertEquals;

public class RegularExpressionTest {
    @Test
    public void document_match_arguments() {
        ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);

        /// [capture-match-arguments]
        Pattern expr = Pattern.compile("I have (\\d+) cukes? in my (\\w+) now");
        List<? extends Class<?>> types = asList(Integer.class, String.class);
        Expression expression = new RegularExpression(expr, types, parameterTypeRegistry);
        List<Argument> match = expression.match("I have 7 cukes in my belly now");
        assertEquals(7, match.get(0).getTransformedValue());
        assertEquals("belly", match.get(1).getTransformedValue());
        /// [capture-match-arguments]
    }

    @Test
    public void transforms_to_string_by_default() {
        assertEquals(singletonList("22"), match(compile("(.*)"), "22", Collections.<Type>singletonList(String.class)));
    }

    @Test
    public void transforms_integer_to_double_using_explicit_type() {
        assertEquals(singletonList(22.0), match(compile("(.*)"), "22", Collections.<Type>singletonList(Double.class)));
    }

    @Test
    public void transforms_to_long_using_capture_group_pattern() {
        List<?> match = match(compile("(\\d+)"), "22");
        assertEquals(singletonList(22L), match);
    }

    @Test
    public void transforms_double_without_integer_value() {
        assertEquals(singletonList(0.22), match(compile("(.*)"), ".22", Collections.<Type>singletonList(Double.class)));
    }

    @Test
    public void transforms_double_with_comma_decimal_separator() {
        assertEquals(singletonList(1.22), match(compile("(.*)"), "1,22", Collections.<Type>singletonList(Double.class), Locale.FRANCE));
    }

    @Test
    public void transforms_double_with_sign() {
        assertEquals(singletonList(-1.22), match(compile("(.*)"), "-1.22", Collections.<Type>singletonList(Double.class)));
    }

    @Test
    public void ignores_non_capturing_groups() {
        String expr = "(\\S+) ?(can|cannot)? (?:delete|cancel) the (\\d+)(?:st|nd|rd|th) (attachment|slide) ?(?:upload)?";
        String step = "I can cancel the 1st slide upload";
        List<?> match = match(compile(expr), step, emptyList());
        assertEquals(asList("I", "can", 1L, "slide"), match);
    }

    @Test
    public void exposes_source() {
        String expr = "I have (\\d+) cukes? in my (.+) now";
        assertEquals(expr, new RegularExpression(Pattern.compile(expr), Collections.<Type>emptyList(), new ParameterTypeRegistry(Locale.ENGLISH)).getSource());
    }

    private List<?> match(Pattern pattern, String text) {
        return match(pattern, text, Collections.<Type>emptyList(), Locale.ENGLISH);
    }

    private List<?> match(Pattern pattern, String text, List<Type> types) {
        return match(pattern, text, types, Locale.ENGLISH);
    }

    private List<?> match(Pattern pattern, String text, List<Type> types, Locale locale) {
        ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(locale);
        RegularExpression regularExpression;
        regularExpression = new RegularExpression(pattern, types, parameterTypeRegistry);
        List<Argument> arguments = regularExpression.match(text);
        List<Object> transformedValues = new ArrayList<>();
        for (Argument argument : arguments) {
            transformedValues.add(argument.getTransformedValue());
        }
        return transformedValues;
    }
}
