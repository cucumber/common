package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class CucumberExpressionTest {
    @Test
    public void transforms_nothing_by_default() {
        List<Object> values = match("{what}", "22", Double.class);
        assertEquals(singletonList(22.0), values);
    }

    @Test
    public void transforms_to_int_by_expression_type() {
        List<Object> values = match("{what:int}", "22");
        assertEquals(singletonList(22), values);
    }

    @Test
    public void transforms_to_int_by_explicit_type() {
        List<Object> values = match("{what}", "22", Integer.class);
        assertEquals(singletonList(22), values);
    }

    @Test
    public void transforms_to_float_by_expression_type() {
        List<Object> values = match("{what:float}", ".22");
        assertEquals(singletonList(new Float(0.22)), values);
    }

    @Test
    public void transforms_to_float_by_explicit_type() {
        List<Object> values = match("{what}", ".22", Float.class);
        assertEquals(singletonList(new Float(0.22)), values);
    }

    // Java-specific

    @Test
    public void transforms_to_double_with_comma() {
        List<Object> values = match("{what}", "1,22", singletonList(Double.class), Locale.FRANCE);
        assertEquals(singletonList(1.22), values);
    }

    private List<Object> match(String expr, String text) {
        return match(expr, text, emptyList(), Locale.ENGLISH);
    }

    private List<Object> match(String expr, String text, Class<?> type) {
        return match(expr, text, singletonList(type), Locale.ENGLISH);
    }

    private List<Object> match(String expr, String text, List<Class> explicitTypes, Locale locale) {
        CucumberExpression expression = new CucumberExpression(expr, explicitTypes, new TransformLookup(locale));
        List<Argument> arguments = expression.match(text);
        if (arguments == null) return null;
        return arguments.stream().map(Argument::getTransformedValue).collect(Collectors.toList());
    }
}
