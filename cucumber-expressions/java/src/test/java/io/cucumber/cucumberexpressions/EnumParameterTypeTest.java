package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class EnumParameterTypeTest {

    public enum Mood {
        happy,
        meh,
        sad
    }

    @Test
    public void converts_to_enum() {
        ParameterTypeRegistry registry = new ParameterTypeRegistry(Locale.ENGLISH);
        registry.defineParameterType(ParameterType.fromEnum(Mood.class));

        CucumberExpression expression = new CucumberExpression("I am {Mood}", registry);
        List<Argument<?>> args = expression.match("I am happy");
        assertEquals(Mood.happy, args.get(0).getValue());
    }

}
