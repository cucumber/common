package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class GroupTest {
    @Test
    public void matches_optional_group() {
        Matcher matcher = Pattern.compile("^Something( with an optional argument)?").matcher("Something");
        assertTrue(matcher.lookingAt());
        Group g = new Group(matcher);
        assertEquals(null, g.getChildren().get(0).getValue());
    }

    @Test
    public void matches_two_groups() {
        Matcher matcher = Pattern.compile("^the step \"([^\"]*)\" has status \"([^\"]*)\"$").matcher("the step \"a pending step\" has status \"pending\"");
        assertTrue(matcher.lookingAt());
        Group g = new Group(matcher);
        assertEquals("a pending step", g.getChildren().get(0).getValue());
        assertEquals("pending", g.getChildren().get(1).getValue());
    }

    @Test
    public void matches_nested_groups() {
        String regexp = "^A (\\d+) thick line from ((\\d+),\\s*(\\d+),\\s*(\\d+)) to ((\\d+),\\s*(\\d+),\\s*(\\d+))?";
        String string = "A 5 thick line from 10,20,30 to 40,50,60";
        Matcher matcher = Pattern.compile(regexp).matcher(string);
        assertTrue(matcher.lookingAt());
        Group group = new Group(matcher);

        assertEquals("5", group.getChildren().get(0).getValue());
        assertEquals("10,20,30", group.getChildren().get(1).getValue());
        assertEquals("10", group.getChildren().get(1).getChildren().get(0).getValue());
        assertEquals("20", group.getChildren().get(1).getChildren().get(1).getValue());
        assertEquals("30", group.getChildren().get(1).getChildren().get(2).getValue());
        assertEquals("40,50,60", group.getChildren().get(2).getValue());
        assertEquals("40", group.getChildren().get(2).getChildren().get(0).getValue());
        assertEquals("50", group.getChildren().get(2).getChildren().get(1).getValue());
        assertEquals("60", group.getChildren().get(2).getChildren().get(2).getValue());
    }
}
