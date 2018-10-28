package io.cucumber.cucumberexpressions;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

public class CucumberExpressionTest {

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    @Test
    public void documents_match_arguments() {
        ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);

        /// [capture-match-arguments]
        String expr = "I have {int} cuke(s)";
        Expression expression = new CucumberExpression(expr, parameterTypeRegistry);
        List<Argument<?>> args = expression.match("I have 7 cukes");
        assertEquals(7, args.get(0).getValue());
        /// [capture-match-arguments]
    }

    @Test
    public void matches_word() {
        assertEquals(singletonList("blind"), match("three {word} mice", "three blind mice"));
    }

    @Test
    public void matches_double_quoted_string() {
        assertEquals(singletonList("blind"), match("three {string} mice", "three \"blind\" mice"));
    }

    @Test
    public void matches_multiple_double_quoted_strings() {
        assertEquals(asList("blind", "crippled"), match("three {string} and {string} mice", "three \"blind\" and \"crippled\" mice"));
    }

    @Test
    public void matches_single_quoted_string() {
        assertEquals(singletonList("blind"), match("three {string} mice", "three 'blind' mice"));
    }

    @Test
    public void matches_multiple_single_quoted_strings() {
        assertEquals(asList("blind", "crippled"), match("three {string} and {string} mice", "three 'blind' and 'crippled' mice"));
    }

    @Test
    public void does_not_match_misquoted_string() {
        assertNull(match("three {string} mice", "three \"blind' mice"));
    }

    @Test
    public void matches_single_quoted_string_with_double_quotes() {
        assertEquals(singletonList("\"blind\""), match("three {string} mice", "three '\"blind\"' mice"));
    }

    @Test
    public void matches_double_quoted_string_with_single_quotes() {
        assertEquals(singletonList("'blind'"), match("three {string} mice", "three \"'blind'\" mice"));
    }

    @Test
    public void matches_double_quoted_string_with_escaped_double_quote() {
        assertEquals(singletonList("bl\"nd"), match("three {string} mice", "three \"bl\\\"nd\" mice"));
    }

    @Test
    public void matches_single_quoted_string_with_escaped_single_quote() {
        assertEquals(singletonList("bl'nd"), match("three {string} mice", "three 'bl\\'nd' mice"));
    }

    @Test
    public void matches_escaped_parenthesis() {
        assertEquals(singletonList("blind"), match("three \\(exceptionally) {string} mice", "three (exceptionally) \"blind\" mice"));
    }

    @Test
    public void matches_escaped_slash() {
        assertEquals(emptyList(), match("12\\/2020", "12/2020"));
    }

    @Test
    public void matches_int() {
        assertEquals(singletonList(22), match("{int}", "22"));
    }

    @Test
    public void doesnt_match_float_as_int() {
        assertNull(match("{int}", "1.22"));
    }

    @Test
    public void matches_float() {
        assertEquals(singletonList(0.22f), match("{float}", "0.22"));
        assertEquals(singletonList(0.22f), match("{float}", ".22"));
    }

    @Test
    public void matches_anonymous_parameter_type_with_hint() {
        assertEquals(singletonList(0.22f), match("{}", "0.22", Float.class));
    }

    @Test
    public void matches_anonymous_parameter_type() {
        assertEquals(singletonList("0.22"), match("{}", "0.22"));
    }

    @Test
    public void does_not_allow_parameter_type_with_left_bracket() {
        expectedException.expectMessage("Illegal character '[' in parameter name {[string]}");
        match("{[string]}", "something");
    }

    @Test
    public void throws_unknown_parameter_type() {
        expectedException.expectMessage("Undefined parameter type {unknown}. Please register a ParameterType for {unknown}.");
        match("{unknown}", "something");
    }

    @Test
    public void does_not_allow_optional_parameter_types() {
        expectedException.expectMessage("Parameter types cannot be optional: ({int})");
        match("({int})", "3");
    }

    @Test
    public void does_not_allow_text_parameter_type_alternation() {
        expectedException.expectMessage("Parameter types cannot be alternative: x/{int}");
        match("x/{int}", "3");
    }

    @Test
    public void does_not_allow_parameter_type_text_alternation() {
        expectedException.expectMessage("Parameter types cannot be alternative: {int}/x");
        match("{int}/x", "3");
    }

    @Test
    public void exposes_source() {
        String expr = "I have {int} cuke(s)";
        assertEquals(expr, new CucumberExpression(expr, new ParameterTypeRegistry(Locale.ENGLISH)).getSource());
    }

    // Java-specific

    @Test
    public void matches_byte() {
        assertEquals(singletonList(Byte.MAX_VALUE), match("{byte}", "127"));
    }

    @Test
    public void matches_short() {
        assertEquals(singletonList(Short.MAX_VALUE), match("{short}", String.valueOf(Short.MAX_VALUE)));
    }

    @Test
    public void matches_long() {
        assertEquals(singletonList(Long.MAX_VALUE), match("{long}", String.valueOf(Long.MAX_VALUE)));
    }

    @Test
    public void matches_biginteger() {
        BigInteger bigInteger = BigInteger.valueOf(Long.MAX_VALUE);
        bigInteger = bigInteger.pow(10);
        assertEquals(singletonList(bigInteger), match("{biginteger}", bigInteger.toString()));
    }

    @Test
    public void matches_bigdecimal() {
        BigDecimal bigDecimal = BigDecimal.valueOf(Math.PI);
        assertEquals(singletonList(bigDecimal), match("{bigdecimal}", bigDecimal.toString()));
    }

    @Test
    public void matches_double_with_comma_for_locale_using_comma() {
        List<?> values = match("{double}", "1,22", Locale.FRANCE);
        assertEquals(singletonList(1.22), values);
    }

    private List<?> match(String expr, String text, Type... typeHints) {
        return match(expr, text, Locale.ENGLISH, typeHints);
    }

    private List<?> match(String expr, String text, Locale locale, Type... typeHints) {
        CucumberExpression expression = new CucumberExpression(expr, new ParameterTypeRegistry(locale));
        List<Argument<?>> args = expression.match(text, typeHints);
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
