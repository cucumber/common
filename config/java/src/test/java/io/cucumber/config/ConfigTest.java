package io.cucumber.config;

import org.junit.Test;

import java.util.List;

import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.fail;

public class ConfigTest {
    @Test
    public void gets_and_sets_value() {
        Config config = new Config();
        config.set("name", new Property("progress"));
        assertEquals("progress", config.get("name").asString());
    }

    @Test
    public void gets_boolean() {
        Config config = new Config();
        config.set("a", new Property("true"));
        config.set("b", new Property("false"));

        assertTrue(config.get("a").asBoolean());
        assertFalse(config.get("b").asBoolean());
    }

    @Test
    public void throws_exception_when_trying_to_set_value_at_subconfig() {
        Config config = new Config();
        config.set("foo.sub", new Property("a"));
        try {
            config.set("foo", new Property("3"));
            fail();
        } catch (RuntimeException expected) {
            assertEquals("Can't override config as property", expected.getMessage());
        }
    }

    @Test
    public void appends_to_list() {
        Config config = new Config();
        config.set("some.list", new PropertyList());
        config.set("some.list", new Property("one"));
        config.set("some.list", new Property("two"));
        Value l = config.get("some.list");
        List<Value> list = l.asList();
        assertEquals("one", list.get(0).asString());
        assertEquals("two", list.get(1).asString());
    }

    @Test
    public void gets_deep_value() {
        Config config = new Config();
        config.set("one.two.hello", new Property("world"));
        assertEquals("world", config.get("one.two.hello").asString());
    }

    @Test
    public void unset_value_is_null() {
        Config config = new Config();
        assertNull(config.get("not.set"));
    }

    @Test
    public void set_value_is_not_null() {
        Config config = new Config();
        config.set("booya.kasha", new Property("wat"));
        config.set("ninky", new Property("nonk"));
        assertFalse(config.get("booya.kasha").isNull());
        assertFalse(config.get("ninky").isNull());
    }

    @Test
    public void has_yaml_representation() {
        Config config = new Config();
        config.set("a.b.c.d.e", new Property("1"));
        config.set("aa.x.y.z", new Property("X"));
        config.set("a.c.d.e", new Property("3"));
        config.set("a.d.e", new Property("4"));

        String expected = "" +
                "a:\n" +
                "  b:\n" +
                "    c:\n" +
                "      d:\n" +
                "        e: 1\n" +
                "  c:\n" +
                "    d:\n" +
                "      e: 3\n" +
                "  d:\n" +
                "    e: 4\n" +
                "";
        assertEquals(expected, config.toYaml("a"));
    }
}
