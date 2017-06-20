package io.cucumber.cucumberexpressions;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class EnumParameterTypeTest {
    @Test
    public void constructs_enum() {
        ParameterType<Color> t = new ParameterType<>("color", "\\w+", Color.class, new SingleTransformer<>(Color::valueOf));
        assertEquals(Color.BLUE, t.transform("BLUE"));
    }

    public static enum Color {
        RED, BLUE, YELLOW
    }
}
