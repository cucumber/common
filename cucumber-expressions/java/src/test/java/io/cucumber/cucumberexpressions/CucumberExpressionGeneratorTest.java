package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Currency;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class CucumberExpressionGeneratorTest {

    private final ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);
    private final CucumberExpressionGenerator generator = new CucumberExpressionGenerator(parameterTypeRegistry);

    @Test
    public void documents_expression_generation() {
        /// [generate-expression]
        CucumberExpressionGenerator generator = new CucumberExpressionGenerator(parameterTypeRegistry);
        String undefinedStepText = "I have 2 cucumbers and 1.5 tomato";
        GeneratedExpression generatedExpression = generator.generateExpressions(undefinedStepText).get(0);
        assertEquals("I have {int} cucumbers and {double} tomato", generatedExpression.getSource());
        assertEquals(Double.class, generatedExpression.getParameterTypes().get(1).getType());
        /// [generate-expression]
    }

    @Test
    public void generates_expression_for_no_args() {
        assertExpression("hello", Collections.<String>emptyList(), "hello");
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
                new SingleTransformer<>(new Function<String, Currency>() {
                    @Override
                    public Currency apply(String s) {
                        return Currency.getInstance(s);
                    }
                })
        ));
        assertExpression(
                "I have a {currency} account and a {currency} account", asList("currency", "currency2"),
                "I have a EUR account and a GBP account");
    }

    @Test
    public void prefers_leftmost_match_when_there_is_overlap() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "currency",
                "cd",
                Currency.class,
                new SingleTransformer<>(new Function<String, Currency>() {
                    @Override
                    public Currency apply(String s) {
                        return Currency.getInstance(s);
                    }
                })
        ));
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "date",
                "bc",
                Date.class,
                new SingleTransformer<>(new Function<String, Date>() {
                    @Override
                    public Date apply(String s) {
                        return new Date(s);
                    }
                })
        ));
        assertExpression(
                "a{date}defg", singletonList("date"),
                "abcdefg");
    }

    @Test
    public void prefers_widest_match_when_pos_is_same() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "currency",
                "cd",
                Currency.class,
                new SingleTransformer<>(new Function<String, Currency>() {
                    @Override
                    public Currency apply(String s) {
                        return Currency.getInstance(s);
                    }
                })
        ));
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "date",
                "cde",
                Date.class,
                new SingleTransformer<>(new Function<String, Date>() {
                    @Override
                    public Date apply(String s) {
                        return new Date(s);
                    }
                })
        ));
        assertExpression(
                "ab{date}fg", singletonList("date"),
                "abcdefg");
    }

    @Test
    public void generates_all_combinations_of_expressions_when_several_parameter_types_match() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "currency",
                "x",
                Currency.class,
                new SingleTransformer<>(new Function<String, Currency>() {
                    @Override
                    public Currency apply(String s) {
                        return Currency.getInstance(s);
                    }
                }),
                true,
                true
        ));
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "date",
                "x",
                Date.class,
                new SingleTransformer<>(new Function<String, Date>() {
                    @Override
                    public Date apply(String s) {
                        return new Date(s);
                    }
                }),
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

    private void assertExpression(String expectedExpression, List<String> expectedArgumentNames, String text) {
        GeneratedExpression generatedExpression = generator.generateExpressions(text).get(0);
        assertEquals(expectedArgumentNames, generatedExpression.getParameterNames());
        assertEquals(expectedExpression, generatedExpression.getSource());
    }
}
