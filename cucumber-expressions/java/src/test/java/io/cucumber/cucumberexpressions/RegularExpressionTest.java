package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

import static java.util.Collections.singletonList;
import static java.util.regex.Pattern.compile;
import static org.junit.Assert.assertEquals;

public class RegularExpressionTest {
    @Test
    public void transforms_to_string_by_default() {
        assertEquals(singletonList("22"), match(compile("(.*)"), "22", Collections.<Class<?>>singletonList(String.class)));
    }

    @Test
    public void transforms_integer_to_double_using_explicit_type() {
        assertEquals(singletonList(22.0), match(compile("(.*)"), "22", Collections.<Class<?>>singletonList(Double.class)));
    }

    @Test
    public void transforms_to_double_using_capture_group_pattern() {
        assertEquals(singletonList(22L), match(compile("(\\d+)"), "22"));
    }

    @Test
    public void transforms_double_without_integer_value() {
        assertEquals(singletonList(0.22), match(compile("(.*)"), ".22", Collections.<Class<?>>singletonList(Double.class)));
    }

    @Test
    public void transforms_double_with_comma_decimal_separator() {
        assertEquals(singletonList(1.22), match(compile("(.*)"), "1,22", Collections.<Class<?>>singletonList(Double.class), Locale.FRANCE));
    }

    @Test
    public void transforms_double_with_sign() {
        assertEquals(singletonList(-1.22), match(compile("(.*)"), "-1.22", Collections.<Class<?>>singletonList(Double.class)));
    }

    @Test
    public void rounds_double_to_integer() {
        assertEquals(singletonList(1), match(compile("(.*)"), "1.22", Collections.<Class<?>>singletonList(Integer.class)));
    }

    @Test
    public void exposes_source() {
        String expr = "I have (\\d+) cukes? in my (.+) now";
        assertEquals(expr, new RegularExpression(Pattern.compile(expr), Collections.<Class<?>>emptyList(), new TransformLookup(Locale.ENGLISH)).getSource());
    }

    private List<?> match(Pattern pattern, String text) {
        return match(pattern, text, Collections.<Class<?>>emptyList(), Locale.ENGLISH);
    }

    private List<?> match(Pattern pattern, String text, List<Class<?>> types) {
        return match(pattern, text, types, Locale.ENGLISH);
    }

    private List<?> match(Pattern pattern, String text, List<Class<?>> types, Locale locale) {
        TransformLookup transformLookup = new TransformLookup(locale);
        RegularExpression regularExpression;
        regularExpression = new RegularExpression(pattern, types, transformLookup);
        List<Argument> arguments = regularExpression.match(text);
        List<Object> transformedValues = new ArrayList<>();
        for (Argument argument : arguments) {
            transformedValues.add(argument.getTransformedValue());
        }
        return transformedValues;
    }
}
