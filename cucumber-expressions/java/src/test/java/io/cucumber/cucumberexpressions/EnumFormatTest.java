package io.cucumber.cucumberexpressions;

import org.junit.Test;

import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class EnumFormatTest {
    @Test
    public void constructs_enum() {
        ParameterType<Color> t = new EnumParameterType<>(Color.class, singletonList("\\w+"));
        assertEquals(Color.BLUE, t.transform("BLUE"));
    }

    public static enum Color {
        RED, BLUE, YELLOW
    }
}
