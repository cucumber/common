package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import static java.util.Arrays.asList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class TreeRegexpTest {

    @Test
    public void exposes_group_source() {
        TreeRegexp tr = new TreeRegexp("(a(?:b)?)(c)");
        List<String> list = new ArrayList<>();
        for (GroupBuilder gb : tr.getGroupBuilder().getChildren()) {
            String source = gb.getSource();
            list.add(source);
        }
        assertEquals(asList("a(?:b)?", "c"), list);
    }

    @Test
    public void builds_tree() {
        TreeRegexp tr = new TreeRegexp("(a(b(c))(d))");
        Group g = tr.match("abcd");
        assertEquals("abcd", g.getChildren().get(0).getValue());
        assertEquals("bc", g.getChildren().get(0).getChildren().get(0).getValue());
        assertEquals("c", g.getChildren().get(0).getChildren().get(0).getChildren().get(0).getValue());
        assertEquals("d", g.getChildren().get(0).getChildren().get(1).getValue());
    }

    @Test
    public void ignores_question_mark_colon_non_capturing_group() {
        TreeRegexp tr = new TreeRegexp("a(?:b)(c)");
        Group g = tr.match("abc");
        assertEquals("abc", g.getValue());
        assertEquals(1, g.getChildren().size());
    }

    @Test
    public void ignores_question_mark_exclamation_mark_non_capturing_group() {
        TreeRegexp tr = new TreeRegexp("a(?!b)(.+)");
        Group g = tr.match("aBc");
        assertEquals("aBc", g.getValue());
        assertEquals(1, g.getChildren().size());
    }

    @Test
    public void ignores_question_mark_equal_sign_non_capturing_group() {
        TreeRegexp tr = new TreeRegexp("a(?=b)(.+)");
        Group g = tr.match("abc");
        assertEquals("abc", g.getValue());
        assertEquals(1, g.getChildren().size());
        assertEquals("bc", g.getChildren().get(0).getValue());
    }

    @Test
    public void ignores_question_mark_less_than_equal_sign_non_capturing_group() {
        TreeRegexp tr = new TreeRegexp("a(.+)(?<=c)$");
        Group g = tr.match("abc");
        assertEquals("abc", g.getValue());
        assertEquals(1, g.getChildren().size());
        assertEquals("bc", g.getChildren().get(0).getValue());
    }

    @Test
    public void ignores_question_mark_less_than_exclamation_mark_non_capturing_group() {
        TreeRegexp tr = new TreeRegexp("a(.+)(?<!b)$");
        Group g = tr.match("abc");
        assertEquals("abc", g.getValue());
        assertEquals(1, g.getChildren().size());
        assertEquals("bc", g.getChildren().get(0).getValue());
    }

    @Test
    public void matches_optional_group() {
        TreeRegexp tr = new TreeRegexp("^Something( with an optional argument)?");
        Group g = tr.match("Something");
        assertNull(g.getChildren().get(0).getValue());
    }

    @Test
    public void matches_nested_groups() {
        TreeRegexp tr = new TreeRegexp("^A (\\d+) thick line from ((\\d+),\\s*(\\d+),\\s*(\\d+)) to ((\\d+),\\s*(\\d+),\\s*(\\d+))");
        Group g = tr.match("A 5 thick line from 10,20,30 to 40,50,60");

        assertEquals("5", g.getChildren().get(0).getValue());
        assertEquals("10,20,30", g.getChildren().get(1).getValue());
        assertEquals("10", g.getChildren().get(1).getChildren().get(0).getValue());
        assertEquals("20", g.getChildren().get(1).getChildren().get(1).getValue());
        assertEquals("30", g.getChildren().get(1).getChildren().get(2).getValue());
        assertEquals("40,50,60", g.getChildren().get(2).getValue());
        assertEquals("40", g.getChildren().get(2).getChildren().get(0).getValue());
        assertEquals("50", g.getChildren().get(2).getChildren().get(1).getValue());
        assertEquals("60", g.getChildren().get(2).getChildren().get(2).getValue());
    }

    @Test
    public void captures_non_capturing_groups_with_capturing_groups_inside() {
        TreeRegexp tr = new TreeRegexp("the stdout(?: from \"(.*?)\")?");
        Group g = tr.match("the stdout");
        assertEquals("the stdout", g.getValue());
        assertNull(g.getChildren().get(0).getValue());
        assertEquals(1, g.getChildren().size());
    }

    @Test
    public void detects_multiple_non_capturing_groups() {
        TreeRegexp tr = new TreeRegexp("(?:a)(:b)(\\?c)(d)");
        Group g = tr.match("a:b?cd");
        assertEquals(3, g.getChildren().size());
    }

    @Test
    public void works_with_escaped_backslash() {
        TreeRegexp tr = new TreeRegexp("foo\\\\(bar|baz)");
        Group g = tr.match("foo\\bar");
        assertEquals(1, g.getChildren().size());
    }

    @Test
    public void works_with_slash_which_doesnt_need_escaping_in_java() {
        TreeRegexp tr = new TreeRegexp("^I go to '/(.+)'$");
        Group g = tr.match("I go to '/hello'");
        assertEquals(1, g.getChildren().size());
    }

    @Test
    public void works_digit_and_word() {
        TreeRegexp tr = new TreeRegexp("^(\\d) (\\w+) (\\w+)$");
        Group g = tr.match("2 you привет");
        assertEquals(3, g.getChildren().size());
    }

    @Test
    public void captures_start_and_end() {
        TreeRegexp tr = new TreeRegexp("^the step \"([^\"]*)\" has status \"([^\"]*)\"$");
        Group g = tr.match("the step \"a pending step\" has status \"pending\"");
        assertEquals(10, g.getChildren().get(0).getStart());
        assertEquals(24, g.getChildren().get(0).getEnd());
        assertEquals(38, g.getChildren().get(1).getStart());
        assertEquals(45, g.getChildren().get(1).getEnd());
    }

    @Test
    public void doesnt_consider_parenthesis_in_character_class_as_group() {
        TreeRegexp tr = new TreeRegexp("^drawings: ([A-Z_, ()]+)$");
        Group g = tr.match("drawings: FU(BAR)");
        assertEquals("drawings: FU(BAR)", g.getValue());
        assertEquals("FU(BAR)", g.getChildren().get(0).getValue());
        assertEquals(0, g.getChildren().get(0).getChildren().size());
    }

    @Test
    public void works_with_flags() {
        TreeRegexp tr = new TreeRegexp(Pattern.compile("HELLO", Pattern.CASE_INSENSITIVE));
        Group g = tr.match("hello");
        assertEquals("hello", g.getValue());
    }

    @Test
    public void uses_loaded_pattern_compiler_service() {
        String regexp = "[0-9]";
        TreeRegexp tr = new TreeRegexp(regexp);
        assertNull(tr.match("1a"));

        PatternCompilerProvider.service = new PatternCompiler() {
            @Override
            public Pattern compile(String regexp, int flags) {
                return Pattern.compile(regexp + "[a-z]", flags);
            }
        };

        tr = new TreeRegexp(regexp);
        assertEquals("1a", tr.match("1a").getValue());
        PatternCompilerProvider.service = null;
    }

}
