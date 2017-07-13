package io.cucumber.cucumberexpressions;

import org.junit.Test;

import static java.util.Collections.emptyList;
import static org.junit.Assert.assertEquals;

public class TreeRegexpTest {
    @Test
    public void builds_tree() {
        TreeRegexp tr = new TreeRegexp("(a(b)?)(c)");
        Group g = tr.match("ac");
        assertEquals("ac", g.getValue());
        assertEquals("a", g.getChildren().get(0).getValue());
        assertEquals(null, g.getChildren().get(0).getChildren().get(0).getValue());
        assertEquals("c", g.getChildren().get(1).getValue());
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
    public void matches_two_groups() {
        TreeRegexp tr = new TreeRegexp("^the step \"([^\"]*)\" has status \"([^\"]*)\"$");
        Group g = tr.match("the step \"a pending step\" has status \"pending\"");
        assertEquals("a pending step", g.getChildren().get(0).getValue());
        assertEquals("pending", g.getChildren().get(1).getValue());
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
}
