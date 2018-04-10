package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class CombinatorialGeneratedExpressionFactoryTest {
    private static final String WORD = "\\w+";

    @Test
    public void generates_multiple_expressions() {
        List<ParameterType<?>> first = new ArrayList<>();
        first.add(new ParameterType<>("color", WORD, Color.class, new Transformer<Color>() {
            @Override
            public Color transform(String arg) {
                return new Color(arg);
            }
        }));
        first.add(new ParameterType<>("csscolor", WORD, CssColor.class, new Transformer<CssColor>() {
            @Override
            public CssColor transform(String arg) {
                return new CssColor(arg);
            }
        }));

        List<ParameterType<?>> second = new ArrayList<>();
        second.add(new ParameterType<>("date", WORD, Date.class, new Transformer<Date>() {
            @Override
            public Date transform(String arg) {
                return new Date(arg);
            }
        }));
        second.add(new ParameterType<>("datetime", WORD, DateTime.class, new Transformer<DateTime>() {
            @Override
            public DateTime transform(String arg) {
                return new DateTime(arg);
            }
        }));
        second.add(new ParameterType<>("timestamp", WORD, Timestamp.class, new Transformer<Timestamp>() {
            @Override
            public Timestamp transform(String arg) {
                return new Timestamp(arg);
            }
        }));
        List<List<ParameterType<?>>> parameterTypeCombinations = asList(first, second);

        CombinatorialGeneratedExpressionFactory factory = new CombinatorialGeneratedExpressionFactory(
                "I bought a {%s} ball on {%s}",
                parameterTypeCombinations
        );
        List<GeneratedExpression> generatedExpressions = factory.generateExpressions();
        List<String> expressions = new ArrayList<>();
        for (GeneratedExpression generatedExpression : generatedExpressions) {
            String source = generatedExpression.getSource();
            expressions.add(source);
        }
        assertEquals(asList(
                "I bought a {color} ball on {date}",
                "I bought a {color} ball on {datetime}",
                "I bought a {color} ball on {timestamp}",
                "I bought a {csscolor} ball on {date}",
                "I bought a {csscolor} ball on {datetime}",
                "I bought a {csscolor} ball on {timestamp}"
        ), expressions);
    }

    public static class Color {
        Color(String s) {
            assertNotNull(s);
        }
    }

    public static class CssColor {
        CssColor(String s) {
            assertNotNull(s);
        }
    }

    public static class Date {
        Date(String s) {
            assertNotNull(s);
        }
    }

    public static class DateTime {
        DateTime(String s) {
            assertNotNull(s);
        }
    }

    public static class Timestamp {
        Timestamp(String s) {
            assertNotNull(s);
        }
    }
}
