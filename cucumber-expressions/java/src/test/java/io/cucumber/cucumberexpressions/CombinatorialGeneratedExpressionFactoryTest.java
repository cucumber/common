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
                        new ParameterType<>("color", WORD, Color.class, new SingleTransformer<>(new Function<String, Color>() {
                            @Override
                            public Color apply(String s) {
                                return new Color(s);
                            }
                        })),
                        new ParameterType<>("csscolor", WORD, CssColor.class, new SingleTransformer<>(new Function<String, CssColor>() {
                            @Override
                            public CssColor apply(String s) {
                                return new CssColor(s);
                            }
                        }))
                ),
                asList(
                        new ParameterType<>("date", WORD, Date.class, new SingleTransformer<>(new Function<String, Date>() {
                            @Override
                            public Date apply(String s) {
                                return new Date(s);
                            }
                        })),
                        new ParameterType<>("datetime", WORD, DateTime.class, new SingleTransformer<>(new Function<String, DateTime>() {
                            @Override
                            public DateTime apply(String s) {
                                return new DateTime(s);
                            }
                        })),
                        new ParameterType<>("timestamp", WORD, Timestamp.class, new SingleTransformer<>(new Function<String, Timestamp>() {
                            @Override
                            public Timestamp apply(String s) {
                                return new Timestamp(s);
                            }
                        }))
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
        public Color(String s) {
        }
    }

    public static class CssColor {
        public CssColor(String s) {
        }
    }

    public static class Date {
        public Date(String s) {
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
