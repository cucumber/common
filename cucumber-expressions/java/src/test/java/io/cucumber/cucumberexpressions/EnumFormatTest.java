package io.cucumber.cucumberexpressions;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class EnumFormatTest {
    public static enum Color {
        RED, BLUE, YELLOW
    }

    @Test
    public void constructs_enum() {
        Parameter<Color> t = new EnumParameter<>(Color.class);
        assertEquals(Color.BLUE, t.transform("BLUE"));
    }
}
