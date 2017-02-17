package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class CucumberExpressionTest {
    @Test
    public void documents_match_arguments() {
        ParameterRegistry parameterRegistry = new ParameterRegistry(Locale.ENGLISH);

        /// [capture-buildArguments-arguments]
        String expr = "I have {n} cuke(s) in my {bodypart} now";
        List<? extends Class<?>> types = asList(Integer.class, String.class);
        Expression expression = new CucumberExpression(expr, types, parameterRegistry);
        List<Argument> args = expression.match("I have 7 cukes in my belly now");
        assertEquals(7, args.get(0).getTransformedValue());
        assertEquals("belly", args.get(1).getTransformedValue());
        /// [capture-buildArguments-arguments]
    }

    @Test
    public void transforms_nothing_by_default() {
        assertEquals(singletonList("22"), match("{what}", "22"));
    }

    @Test
    public void transforms_to_int_by_expression_type() {
        assertEquals(singletonList(22), match("{int}", "22"));
    }

    @Test
    public void transforms_to_int_by_explicit_type() {
        assertEquals(singletonList(22), match("{what}", "22", Integer.class));
    }

    @Test
    public void doesnt_match_a_float_to_an_int() {
        assertEquals(null, match("{int}", "1.22"));
    }

    @Test
    public void transforms_to_float_by_expression_type() {
        assertEquals(singletonList(0.22f), match("{float}", "0.22"));
        assertEquals(singletonList(0.22f), match("{float}", ".22"));
    }

    @Test
    public void transforms_to_float_by_explicit_type() {
        assertEquals(singletonList(0.22f), match("{what}", "0.22", Float.class));
        assertEquals(singletonList(0.22f), match("{what}", ".22", Float.class));
    }

    @Test
    public void leaves_unknown_type_untransformed() {
        assertEquals(singletonList("something"), match("{unknown}", "something"));
    }

    @Test
    public void supports_deprecated_name_colon_type_syntax_for_now() {
        assertEquals(singletonList("something"), match("{param:unknown}", "something"));
    }

    @Test
    public void exposes_source() {
        String expr = "I have {int} cuke(s) in my {bodypart} now";
        assertEquals(expr, new CucumberExpression(expr, Collections.<Type>emptyList(), new ParameterRegistry(Locale.ENGLISH)).getSource());
    }

    @Test
    public void exposes_offset_and_value() {
        String expr = "I have {int} cuke(s) in my {bodypart} now";
        Expression expression = new CucumberExpression(expr, Collections.<Type>emptyList(), new ParameterRegistry(Locale.ENGLISH));
        Argument arg1 = expression.match("I have 800 cukes in my brain now").get(0);
        assertEquals(7, arg1.getOffset());
        assertEquals("800", arg1.getValue());
    }

    @Test
    public void escapes_special_characters() {
        String expr = "I have {int} cuke(s) and ^";
        Expression expression = new CucumberExpression(expr, Collections.<Type>emptyList(), new ParameterRegistry(Locale.ENGLISH));
        Argument arg1 = expression.match("I have 800 cukes and ^").get(0);
        assertEquals(7, arg1.getOffset());
        assertEquals("800", arg1.getValue());
    }

    // Java-specific

    @Test
    public void transforms_to_double_with_comma_for_locale_using_comma() {
        List<Object> values = match("{what}", "1,22", Collections.<Type>singletonList(Double.class), Locale.FRANCE);
        assertEquals(singletonList(1.22), values);
    }

    private List<Object> match(String expr, String text) {
        return match(expr, text, Collections.<Type>emptyList(), Locale.ENGLISH);
    }

    private List<Object> match(String expr, String text, Type type) {
        return match(expr, text, Collections.singletonList(type), Locale.ENGLISH);
    }

    private List<Object> match(String expr, String text, List<Type> explicitTypes, Locale locale) {
        CucumberExpression expression = new CucumberExpression(expr, explicitTypes, new ParameterRegistry(locale));
        List<Argument> args = expression.match(text);
        if (args == null) return null;
        List<Object> transformedValues = new ArrayList<>();
        for (Argument argument : args) {
            transformedValues.add(argument.getTransformedValue());
        }
        return transformedValues;
    }
}
