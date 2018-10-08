package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static java.util.regex.Pattern.compile;
import static org.junit.Assert.assertEquals;

public class RegularExpressionTest {
    @Test
    public void documentation_match_arguments() {
        ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);

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
    public void matches_int_as_float_using_explicit_type() {
        List<?> match = match(compile("a (\\d+) and a (.*)"), "a 22 and a 33.5", Float.class, Double.class);
        assertEquals(asList(22f, 33.5d), match);
    }

    private List<?> match(Pattern pattern, String text, Type... types) {
        ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);
        RegularExpression regularExpression = new RegularExpression(pattern, parameterTypeRegistry);
        List<Argument<?>> arguments = regularExpression.match(text, types);
        List<Object> values = new ArrayList<>();
        for (Argument<?> argument : arguments) {
            values.add(argument.getValue());
        }
        return values;
    }
}
