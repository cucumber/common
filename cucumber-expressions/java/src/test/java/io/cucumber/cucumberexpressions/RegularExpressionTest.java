package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class RegularExpressionTest {
    @Test
    public void converts_to_string_by_default() {
        assertEquals(singletonList("22"), match("(.*)", "22", singletonList(String.class)));
    }

    @Test
    public void converts_integer_to_double() {
        assertEquals(singletonList(22.0), match("(.*)", "22", singletonList(Double.class)));
    }

    @Test
    public void converts_double_without_integer_value() {
        assertEquals(singletonList(0.22), match("(.*)", ".22", singletonList(Double.class)));
    }

    @Test
    public void converts_double_with_comma_decimal_separator() {
        assertEquals(singletonList(1.22), match("(.*)", "1,22", singletonList(Double.class), Locale.FRANCE));
    }

    @Test
    public void converts_double_with_sign() {
        assertEquals(singletonList(-1.22), match("(.*)", "-1.22", singletonList(Double.class)));
    }

    @Test
    public void rounds_double_to_integer() {
        assertEquals(singletonList(1), match("(.*)", "1.22", singletonList(Integer.class)));
    }

    private List<?> match(String expr, String text, List<Class<?>> types) {
        return match(expr, text, types, Locale.ENGLISH);
    }

    private List<?> match(String expr, String text, List<Class<?>> types, Locale locale) {
        TransformLookup transformLookup = new TransformLookup(locale);
        List<Transform<?>> transforms = types.stream().map(transformLookup::lookup).collect(Collectors.toList());
        Expression expression = new RegularExpression(Pattern.compile(expr), transforms);
        List<Argument> arguments = expression.match(text);
        return arguments.stream().map(Argument::getTransformedValue).collect(Collectors.toList());
    }
}
