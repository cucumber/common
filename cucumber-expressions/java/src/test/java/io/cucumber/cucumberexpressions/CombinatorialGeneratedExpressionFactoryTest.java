package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;

public class CombinatorialGeneratedExpressionFactoryTest {
    @Test
    public void generates_multiple_expressions() {
        List<List<ParameterType<?>>> parameterTypeCombinations = asList(
                asList(new ClassParameterType<>(Color.class), new ClassParameterType<>(CssColor.class)),
                asList(new ClassParameterType<>(Date.class), new ClassParameterType<>(DateTime.class), new ClassParameterType<>(Timestamp.class))
        );
        CombinatorialGeneratedExpressionFactory factory = new CombinatorialGeneratedExpressionFactory(
                "I bought a {%s} ball on {%s}",
                parameterTypeCombinations
        );
        List<GeneratedExpression> generatedExpressions = factory.generateExpressions();
        List<String> expressions = generatedExpressions.stream().map(GeneratedExpression::getSource).collect(Collectors.toList());
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
