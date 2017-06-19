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
}
