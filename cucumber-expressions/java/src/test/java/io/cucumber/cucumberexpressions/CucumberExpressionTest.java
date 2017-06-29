package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class CucumberExpressionTest {
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
    public void matches_single_quoted_string() {
        assertEquals(singletonList("blind"), match("three {string} mice", "three 'blind' mice"));
    }

    @Test
    public void does_not_match_misquoted_string() {
        assertEquals(null, match("three {string} mice", "three \"blind' mice"));
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
    public void matches_int() {
        assertEquals(singletonList(22), match("{int}", "22"));
    }

    @Test
    public void doesnt_match_float_as_int() {
        assertEquals(null, match("{int}", "1.22"));
    }

    @Test
    public void matches_float() {
        assertEquals(singletonList(0.22f), match("{float}", "0.22"));
        assertEquals(singletonList(0.22f), match("{float}", ".22"));
    }

    @Test
    public void throws_unknown_parameter_type() {
        try {
            match("{unknown}", "something");
            fail();
        } catch (UndefinedParameterTypeException expected) {
            assertEquals("Undefined parameter type {unknown}", expected.getMessage());
        }
    }

    @Test
    public void exposes_source() {
        String expr = "I have {int} cuke(s)";
        assertEquals(expr, new CucumberExpression(expr, new ParameterTypeRegistry(Locale.ENGLISH)).getSource());
    }

    // Java-specific

    @Test
    public void matches_byte() {
        assertEquals(singletonList((byte) 15), match("{byte}", "0x0F"));
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
    public void matches_bigint() {
        assertEquals(singletonList(BigInteger.ONE), match("{bigint}", BigInteger.ONE.toString()));
    }

    @Test
    public void matches_bigdecimal() {
        assertEquals(singletonList(BigDecimal.ONE), match("{bigdecimal}", BigDecimal.ONE.toString()));
    }

    @Test
    public void matches_double_with_comma_for_locale_using_comma() {
        List<?> values = match("{double}", "1,22", Locale.FRANCE);
        assertEquals(singletonList(1.22), values);
    }

    private List<?> match(String expr, String text) {
        return match(expr, text, Locale.ENGLISH);
    }

    private List<?> match(String expr, String text, Locale locale) {
        CucumberExpression expression = new CucumberExpression(expr, new ParameterTypeRegistry(locale));
        List<Argument<?>> args = expression.match(text);
        return args == null ? null : args.stream().map(Argument::getValue).collect(Collectors.toList());
    }
}
