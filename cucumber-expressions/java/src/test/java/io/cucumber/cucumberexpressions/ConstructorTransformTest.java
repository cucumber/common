package io.cucumber.cucumberexpressions;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ConstructorTransformTest {
    public static class NoStringCtor {
    }

    public static class FailingCtor {
        public FailingCtor(String s) throws Exception {
            throw new Exception("Boo");
        }
    }

    public static abstract class Abstract {
        public Abstract(String s) throws Exception {
        }
    }

    @Test
    public void requires_string_ctor() {
        try {
            new ConstructorTransform<>(NoStringCtor.class);
            fail();
        } catch (CucumberExpressionException expected) {
            assertEquals("Missing constructor: `public NoStringCtor(String)`", expected.getMessage());
        }
    }

    @Test
    public void reports_ctor_exceptions() {
        try {
            new ConstructorTransform<>(FailingCtor.class).transform("hello");
            fail();
        } catch (CucumberExpressionException expected) {
            assertEquals("Failed to invoke `new FailingCtor(\"hello\")`", expected.getMessage());
            assertEquals("Boo", expected.getCause().getMessage());
        }
    }

    @Test
    public void reports_abstract_exceptions() {
        try {
            new ConstructorTransform<>(Abstract.class).transform("hello");
            fail();
        } catch (CucumberExpressionException expected) {
            assertEquals("Failed to invoke `new Abstract(\"hello\")`", expected.getMessage());
            assertEquals(InstantiationException.class, expected.getCause().getClass());
        }
    }
}
