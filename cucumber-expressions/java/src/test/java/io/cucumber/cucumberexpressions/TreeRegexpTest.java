package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static org.junit.Assert.assertEquals;

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
    public void ignores_non_capturing_groups() {
        TreeRegexp tr = new TreeRegexp("(a(?:b)?)(c)");
        Group g = tr.match("ac");
        assertEquals("ac", g.getValue());
        assertEquals("a", g.getChildren().get(0).getValue());
        assertEquals(emptyList(), g.getChildren().get(0).getChildren());
        assertEquals("c", g.getChildren().get(1).getValue());
    }

    @Test
    public void matches_optional_group() {
        TreeRegexp tr = new TreeRegexp("^Something( with an optional argument)?");
        Group g = tr.match("Something");
        assertEquals(null, g.getChildren().get(0).getValue());
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
        assertEquals(null, g.getChildren().get(0).getValue());
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
        TreeRegexp tr = new TreeRegexp("^(\\d) (\\w+)$");
        Group g = tr.match("2 you");
        assertEquals(2, g.getChildren().size());
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
    public void works_with_flags() {
        TreeRegexp tr = new TreeRegexp(Pattern.compile("HELLO", Pattern.CASE_INSENSITIVE));
        Group g = tr.match("hello");
        assertEquals("hello", g.getValue());
    }
}
