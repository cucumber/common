package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;

public class CombinatorialGeneratedExpressionFactoryTest {
    private static final String WORD = "\\w+";

    @Test
    public void generates_multiple_expressions() {
        List<List<ParameterType<?>>> parameterTypeCombinations = asList(
                asList(
                        new ParameterType<>("color", WORD, Color.class, new Transformer<Color>() {
                            @Override
                            public Color transform(String... args) {
                                return new Color(args[0]);
                            }
                        }),
                        new ParameterType<>("csscolor", WORD, CssColor.class, new Transformer<CssColor>() {
                            @Override
                            public CssColor transform(String... args) {
                                return new CssColor(args[0]);
                            }
                        })
                ),
                asList(
                        new ParameterType<>("date", WORD, Date.class, new Transformer<Date>() {
                            @Override
                            public Date transform(String... args) {
                                return new Date(args[0]);
                            }
                        }),
                        new ParameterType<>("datetime", WORD, DateTime.class, new Transformer<DateTime>() {
                            @Override
                            public DateTime transform(String... args) {
                                return new DateTime(args[0]);
                            }
                        }),
                        new ParameterType<>("timestamp", WORD, Timestamp.class, new Transformer<Timestamp>() {
                            @Override
                            public Timestamp transform(String... args) {
                                return new Timestamp(args[0]);
                            }
                        })
                )
        );
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
        }
    }

    public static class CssColor {
        CssColor(String s) {
        }
    }

    public static class Date {
        Date(String s) {
        }
    }

    public static class DateTime {
        public DateTime(String s) {
        }
    }

    public static class Timestamp {
        public Timestamp(String s) {
        }
    }
}
