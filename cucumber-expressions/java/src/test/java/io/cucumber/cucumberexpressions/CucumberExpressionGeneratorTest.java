package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.Test;

import java.text.DateFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Currency;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

public class CucumberExpressionGeneratorTest {

    private final ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);
    private final CucumberExpressionGenerator generator = new CucumberExpressionGenerator(parameterTypeRegistry);
    private static final DateFormat df = DateFormat.getDateInstance();

    @Test
    public void documents_expression_generation() {
        CucumberExpressionGenerator generator = new CucumberExpressionGenerator(parameterTypeRegistry);
        String undefinedStepText = "I have 2 cucumbers and 1.5 tomato";
        GeneratedExpression generatedExpression = generator.generateExpressions(undefinedStepText).get(0);
        assertEquals("I have {int} cucumbers and {double} tomato", generatedExpression.getSource());
        assertEquals(Double.class, generatedExpression.getParameterTypes().get(1).getType());
    }

    @Test
    public void generates_expression_for_no_args() {
        assertExpression("hello", Collections.<String>emptyList(), "hello");
    }

    @Test
    public void generates_expression_with_escaped_left_parenthesis() {
        assertExpression(
                "\\(iii)", Collections.<String>emptyList(),
                "(iii)");
    }

    @Test
    public void generates_expression_with_escaped_left_curly_brace() {
        assertExpression(
                "\\{iii}", Collections.<String>emptyList(),
                "{iii}");
    }

    @Test
    public void generates_expression_with_escaped_slashes() {
        assertExpression(
                "The {int}\\/{int}\\/{int} hey", asList("int1", "int2", "int3"),
                "The 1814/05/17 hey");
    }

    @Test
    public void generates_expression_for_int_double_arg() {
        assertExpression(
                "I have {int} cukes and {double} euro", asList("int1", "double1"),
                "I have 2 cukes and 1.5 euro");
    }

    @Test
    public void generates_expression_for_strings() {
        assertExpression(
                "I like {string} and {string}", asList("string", "string2"),
                "I like \"bangers\" and 'mash'");
    }

    @Test
    public void generates_expression_with_percent_sign() {
        assertExpression(
                "I am {int}% foobar", singletonList("int1"),
                "I am 20% foobar");
    }

    @Test
    public void generates_expression_for_just_int() {
        assertExpression(
                "{int}", singletonList("int1"),
                "99999");
    }

    @Test
    public void numbers_all_arguments_when_type_is_reserved_keyword() {
        assertExpression(
                "I have {int} cukes and {int} euro", asList("int1", "int2"),
                "I have 2 cukes and 5 euro");
    }

    @Test
    public void numbers_only_second_argument_when_type_is_not_reserved_keyword() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "currency",
                "[A-Z]{3}",
                Currency.class,
                new Transformer<Currency>() {
                    @Override
                    public Currency transform(String arg) {
                        return Currency.getInstance(arg);
                    }
                }
        ));
        assertExpression(
                "I have a {currency} account and a {currency} account", asList("currency", "currency2"),
                "I have a EUR account and a GBP account");
    }

    @Test
    public void does_not_suggest_parameter_type_when_surrounded_by_alphanum() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "direction",
                "(up|down)",
                String.class,
                new Transformer<String>() {
                    @Override
                    public String transform(String arg) {
                        return arg;
                    }
                },
                true,
                false
        ));
        assertExpression(
                "I like muppets", Collections.<String>emptyList(),
                "I like muppets");
    }

    @Test
    public void does_suggest_parameter_type_when_surrounded_by_space() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "direction",
                "(up|down)",
                String.class,
                new Transformer<String>() {
                    @Override
                    public String transform(String arg) {
                        return arg;
                    }
                },
                true,
                false
        ));
        assertExpression(
                "it went {direction} and {direction}", asList("direction", "direction2"),
                "it went up and down");
    }

    @Test
    public void prefers_leftmost_match_when_there_is_overlap() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "right",
                "c d",
                String.class,
                (Transformer<String>) s -> s
        ));
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "left",
                "b c",
                String.class,
                new Transformer<String>() {
                    @Override
                    public String transform(String arg) {
                        return arg;
                    }
                }
        ));
        assertExpression(
                "a {left} d e f g", singletonList("left"),
                "a b c d e f g");
    }

    @Test
    public void prefers_widest_match_when_pos_is_same() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "airport",
                "[A-Z]{3}",
                String.class,
                (Transformer<String>) s -> s
        ));
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "leg",
                "[A-Z]{3}-[A-Z]{3}",
                String.class,
                (Transformer<String>) s -> s
        ));
        assertExpression(
                "leg {leg}", singletonList("leg"),
                "leg LHR-CDG");
    }

    @Test
    public void generates_all_combinations_of_expressions_when_several_parameter_types_match() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "currency",
                "x",
                Currency.class,
                (Transformer<Currency>) Currency::getInstance,
                true,
                true
        ));
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "date",
                "x",
                Date.class,
                new Transformer<Date>() {
                    @Override
                    public Date transform(String arg) {
                        try {
                            return df.parse(arg);
                        } catch (ParseException e) {
                            throw new RuntimeException(e);
                        }
                    }
                },
                true,
                false
        ));

        List<GeneratedExpression> generatedExpressions = generator.generateExpressions("I have x and x and another x");
        List<String> expressions = new ArrayList<>();
        for (GeneratedExpression generatedExpression : generatedExpressions) {
            String source = generatedExpression.getSource();
            expressions.add(source);
        }
        assertEquals(asList(
                "I have {currency} and {currency} and another {currency}",
                "I have {currency} and {currency} and another {date}",
                "I have {currency} and {date} and another {currency}",
                "I have {currency} and {date} and another {date}",
                "I have {date} and {currency} and another {currency}",
                "I have {date} and {currency} and another {date}",
                "I have {date} and {date} and another {currency}",
                "I have {date} and {date} and another {date}"
        ), expressions);
    }

    @Test
    public void exposes_transforms_in_generated_expression() {
        GeneratedExpression generatedExpression = generator.generateExpressions("I have 2 cukes and 1.5 euro").get(0);
        assertEquals(Integer.class, generatedExpression.getParameterTypes().get(0).getType());
        assertEquals(Double.class, generatedExpression.getParameterTypes().get(1).getType());
    }

    @Test
    public void matches_parameter_types_with_optional_capture_groups() {
        ParameterType<String> optionalFlight = new ParameterType<>(
                "optional-flight",
                "(1st flight)?",
                String.class,
                (Transformer<String>) arg -> arg,
                true,
                false
        );
        ParameterType<String> optionalHotel = new ParameterType<>(
                "optional-hotel",
                "(1 hotel)?",
                String.class,
                (Transformer<String>) arg -> arg,
                true,
                false
        );

        parameterTypeRegistry.defineParameterType(optionalFlight);
        parameterTypeRegistry.defineParameterType(optionalHotel);
        List<GeneratedExpression> generatedExpressions = generator.generateExpressions("I reach Stage 4: 1st flight -1 hotel");
        assertEquals("I reach Stage {int}: {optional-flight} {int} hotel", generatedExpressions.get(0).getSource());
    }

    @Test
    public void generates_at_most_256_expressions() {
        for (int i = 0; i < 4; i++) {
            ParameterType<String> myType = new ParameterType<>(
                    "my-type-" + i,
                    "[a-z]",
                    String.class,
                    (Transformer<String>) arg -> arg,
                    true,
                    false
            );
            parameterTypeRegistry.defineParameterType(myType);

        }
        // This would otherwise generate 4^11=419430 expressions and consume just shy of 1.5GB.
        assertEquals(256, generator.generateExpressions("a b c d e f g h i j k").size());
    }

    @Test
    public void prefers_expression_with_longest_non_empty_match() {
        ParameterType<String> zeroOrMore = new ParameterType<>(
                "zero-or-more",
                "[a-z]*",
                String.class,
                (Transformer<String>) arg -> arg,
                true,
                false
        );
        parameterTypeRegistry.defineParameterType(zeroOrMore);
        ParameterType<String> exactlyOne = new ParameterType<>(
                "exactly-one",
                "[a-z]",
                String.class,
                (Transformer<String>) arg -> arg,
                true,
                false
        );
        parameterTypeRegistry.defineParameterType(exactlyOne);

        List<GeneratedExpression> generatedExpressions = generator.generateExpressions("a simple step");
        assertEquals(2, generatedExpressions.size());
        assertEquals("{exactly-one} {zero-or-more} {zero-or-more}", generatedExpressions.get(0).getSource());
        assertEquals("{zero-or-more} {zero-or-more} {zero-or-more}", generatedExpressions.get(1).getSource());
    }

    private void assertExpression(String expectedExpression, List<String> expectedArgumentNames, String text) {
        GeneratedExpression generatedExpression = generator.generateExpressions(text).get(0);
        assertEquals(expectedExpression, generatedExpression.getSource());
        assertEquals(expectedArgumentNames, generatedExpression.getParameterNames());

        // Check that the generated expression matches the text
        CucumberExpression cucumberExpression = new CucumberExpression(generatedExpression.getSource(), parameterTypeRegistry);
        List<Argument<?>> match = cucumberExpression.match(text);
        if (match == null) {
            fail(String.format("Expected text '%s' to match generated expression '%s'", text, generatedExpression.getSource()));
        }
        assertEquals(expectedArgumentNames.size(), match.size());
    }

}
