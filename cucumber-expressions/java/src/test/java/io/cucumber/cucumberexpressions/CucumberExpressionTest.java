package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class CucumberExpressionTest {
    @Test
    public void transforms_nothing_by_default() {
        assertEquals(singletonList("22"), match("{what}", "22"));
    }

    @Test
    public void transforms_to_int_by_expression_type() {
        assertEquals(singletonList(22), match("{what:int}", "22"));
    }

    @Test
    public void transforms_to_int_by_explicit_type() {
        assertEquals(singletonList(22), match("{what}", "22", Integer.class));
    }

    @Test
    public void doesnt_match_a_float_to_an_int() {
        assertEquals(null, match("{what:int}", "1.22"));
    }

    @Test
    public void transforms_to_float_by_expression_type() {
        assertEquals(singletonList(new Float(0.22)), match("{what:float}", "0.22"));
        assertEquals(singletonList(new Float(0.22)), match("{what:float}", ".22"));
    }

    @Test
    public void transforms_to_float_by_explicit_type() {
        assertEquals(singletonList(new Float(0.22)), match("{what}", "0.22", Float.class));
        assertEquals(singletonList(new Float(0.22)), match("{what}", ".22", Float.class));
    }

    @Test
    public void doesnt_transform_unknown_type() {
        try {
            match("{what:unknown}", "something");
            fail();
        } catch (CucumberExpressionException expected) {
            assertEquals("No transformer for type name \"unknown\"", expected.getMessage());
        }
    }

    @Test
    public void exposes_source() {
        String expr = "I have {n:int} cuke(s) in my {bodypart} now";
        assertEquals(expr, new CucumberExpression(expr, emptyList(), new TransformLookup(Locale.ENGLISH)).getSource());
    }

    @Test
    public void exposes_offset_and_value() {
        String expr = "I have {n:int} cuke(s) in my {bodypart} now";
        Expression expression = new CucumberExpression(expr, emptyList(), new TransformLookup(Locale.ENGLISH));
        Argument arg1 = expression.match("I have 800 cukes in my brain now").get(0);
        assertEquals(7, arg1.getOffset());
        assertEquals("800", arg1.getValue());
    }

    // Java-specific

    @Test
    public void transforms_to_double_with_comma_for_locale_using_comma() {
        List<Object> values = match("{what}", "1,22", singletonList(Double.class), Locale.FRANCE);
        assertEquals(singletonList(1.22), values);
    }

    private List<Object> match(String expr, String text) {
        return match(expr, text, emptyList(), Locale.ENGLISH);
    }

    private List<Object> match(String expr, String text, Class<?> type) {
        return match(expr, text, singletonList(type), Locale.ENGLISH);
    }

    private List<Object> match(String expr, String text, List<Class<?>> explicitTypes, Locale locale) {
        CucumberExpression expression = new CucumberExpression(expr, explicitTypes, new TransformLookup(locale));
        List<Argument> arguments = expression.match(text);
        if (arguments == null) return null;
        return arguments.stream().map(Argument::getTransformedValue).collect(Collectors.toList());
    }
}
