package io.cucumber.cucumberexpressions;

import org.junit.Test;

import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class EnumParameterTypeTest {
    @Test
    public void constructs_enum() {
        ParameterType<String, Color> t = ParameterType.single("color", "\\w+", Color.class, new Transformer<String, Color>() {
            @Override
            public Color transform(String arg) {
                return Color.valueOf(arg);
            }
        });
        assertEquals(Color.BLUE, t.transform(singletonList("BLUE")));
    }

    public enum Color {
        RED, BLUE, YELLOW
    }
}
