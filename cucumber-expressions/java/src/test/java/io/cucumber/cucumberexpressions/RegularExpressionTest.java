package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static java.util.regex.Pattern.compile;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class RegularExpressionTest {

    private final ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);

    @Test
    public void documentation_match_arguments() {
        /// [capture-match-arguments]
        Pattern expr = Pattern.compile("I have (\\d+) cukes? in my (\\w+) now");
        Expression expression = new RegularExpression(expr, parameterTypeRegistry);
        List<Argument<?>> match = expression.match("I have 7 cukes in my belly now");
        assertEquals(7, match.get(0).getValue());
        assertEquals("belly", match.get(1).getValue());
        /// [capture-match-arguments]
    }

    @Test
    public void matches_positive_int() {
        List<?> match = match(compile("(\\d+)"), "22");
        assertEquals(singletonList(22), match);
    }

    @Test
    public void matches_positive_int_with_hint() {
        List<?> match = match(compile("(\\d+)"), "22", Integer.class);
        assertEquals(singletonList(22), match);
    }

    @Test
    public void matches_positive_int_with_conflicting_type_hint() {
        List<?> match = match(compile("(\\d+)"), "22", String.class);
        assertEquals(singletonList("22"), match);
    }

    @Test
    public void matches_nested_capture_group_without_match() {
        List<?> match = match(compile("^a user( named \"([^\"]*)\")?$"), "a user");
        assertEquals(singletonList(null), match);
    }

    @Test
    public void matches_nested_capture_group_with_match() {
        List<?> match = match(compile("^a user( named \"([^\"]*)\")?$"), "a user named \"Charlie\"");
        assertEquals(singletonList("Charlie"), match);
    }

    @Test
    public void ignores_non_capturing_groups() {
        String expr = "(\\S+) ?(can|cannot)? (?:delete|cancel) the (\\d+)(?:st|nd|rd|th) (attachment|slide) ?(?:upload)?";
        String step = "I can cancel the 1st slide upload";
        List<?> match = match(compile(expr), step);
        assertEquals(asList("I", "can", 1, "slide"), match);
    }

    @Test
    public void matches_capture_group_nested_in_optional_one() {
        String regex = "^a (pre-commercial transaction |pre buyer fee model )?purchase(?: for \\$(\\d+))?$";
        assertEquals(asList(null, null), match(compile(regex), "a purchase"));
        assertEquals(asList(null, 33), match(compile(regex), "a purchase for $33"));
        assertEquals(asList("pre buyer fee model ", null), match(compile(regex), "a pre buyer fee model purchase"));
    }

    @Test
    public void works_with_escaped_parenthesis() {
        String expr = "Across the line\\(s\\)";
        String step = "Across the line(s)";
        List<?> match = match(compile(expr), step);
        assertEquals(emptyList(), match);
    }

    @Test
    public void exposes_source_and_regexp() {
        String regexp = "I have (\\d+) cukes? in my (.+) now";
        RegularExpression expression = new RegularExpression(Pattern.compile(regexp), new ParameterTypeRegistry(Locale.ENGLISH));
        assertEquals(regexp, expression.getSource());
        assertEquals(regexp, expression.getRegexp().pattern());
    }

    @Test
    public void uses_float_type_hint_when_group_doesnt_match_known_param_type() {
        List<?> match = match(compile("a (.*)"), "a 22", Float.class);
        assertEquals(Float.class, match.get(0).getClass());
        assertEquals(22f, (Float) match.get(0), 0.00001);
    }

    @Test
    public void uses_double_type_hint_when_group_doesnt_match_known_param_type() {
        List<?> match = match(compile("a (\\d\\d.\\d)"), "a 33.5", Double.class);
        assertEquals(Double.class, match.get(0).getClass());
        assertEquals(33.5d, (Double) match.get(0), 0.00001);
    }

    @Test
    public void uses_two_type_hints_to_resolve_anonymous_parameter_type() {
        List<?> match = match(compile("a (.*) and a (.*)"), "a 22 and a 33.5", Float.class, Double.class);

        assertEquals(Float.class, match.get(0).getClass());
        assertEquals(22f, (Float) match.get(0), 0.00001);

        assertEquals(Double.class, match.get(1).getClass());
        assertEquals(33.5d, (Double) match.get(1), 0.00001);
    }

    @Test
    public void retains_all_content_captured_by_the_capture_group() {
        List<?> match = match(compile("a quote ([\"a-z ]+)"), "a quote \" and quote \"", String.class);
        assertEquals(asList("\" and quote \""), match);
    }

    @Test
    public void uses_parameter_type_registry_when_parameter_type_is_defined() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "test",
                "[\"a-z ]+",
                String.class,
                new Transformer<String>() {
                    @Override
                    public String transform(String s) {
                        return s.toUpperCase();
                    }
                }
        ));
        List<?> match = match(compile("a quote ([\"a-z ]+)"), "a quote \" and quote \"", String.class);
        assertEquals(asList("\" AND QUOTE \""), match);
    }

    @Test
    public void ignores_type_hint_when_parameter_type_has_strong_type_hint() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "test",
                "one|two|three",
                Integer.class,
                new Transformer<Integer>() {
                    @Override
                    public Integer transform(String s) {
                        return 42;
                    }
                }, false, false, true
        ));
        assertEquals(asList(42), match(compile("(one|two|three)"), "one", String.class));
    }

    @Test
    public void follows_type_hint_when_parameter_type_does_not_have_strong_type_hint() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "test",
                "one|two|three",
                Integer.class,
                new Transformer<Integer>() {
                    @Override
                    public Integer transform(String s) {
                        return 42;
                    }
                }, false, false, false
        ));
        assertEquals(asList("one"), match(compile("(one|two|three)"), "one", String.class));
    }

    @Test
    public void matches_anonymous_parameter_type_with_hint() {
        assertEquals(singletonList(0.22f), match(compile("(.*)"), "0.22", Float.class));
    }

    @Test
    public void matches_anonymous_parameter_type() {
        assertEquals(singletonList("0.22"), match(compile("(.*)"), "0.22"));
    }

    private List<?> match(Pattern pattern, String text, Type... types) {
        RegularExpression regularExpression = new RegularExpression(pattern, parameterTypeRegistry);
        List<Argument<?>> arguments = regularExpression.match(text, types);
        List<Object> values = new ArrayList<>();
        for (Argument<?> argument : arguments) {
            values.add(argument.getValue());
        }
        return values;
    }

}
