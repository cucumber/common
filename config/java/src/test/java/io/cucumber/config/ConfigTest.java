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
        config.set("name", new Property("progress", null));
        assertEquals("progress", config.get("name").asString());
    }

    @Test
    public void gets_boolean() {
        Config config = new Config();
        config.set("a", new Property("true", null));
        config.set("b", new Property("false", null));

        assertTrue(config.get("a").asBoolean());
        assertFalse(config.get("b").asBoolean());
    }

    @Test
    public void throws_exception_when_trying_to_set_value_at_subconfig() {
        Config config = new Config();
        config.set("foo.sub", new Property("a", null));
        try {
            config.set("foo", new Property("3", null));
            fail();
        } catch (RuntimeException expected) {
            assertEquals("Can't override config as property", expected.getMessage());
        }
    }

    @Test
    public void appends_to_list() {
        Config config = new Config();
        config.set("some.list", new PropertyList());
        config.set("some.list", new Property("one", null));
        config.set("some.list", new Property("two", null));
        Value l = config.get("some.list");
        List<Value> list = l.asList();
        assertEquals("one", list.get(0).asString());
        assertEquals("two", list.get(1).asString());
    }

    @Test
    public void gets_deep_value() {
        Config config = new Config();
        config.set("one.two.hello", new Property("world", null));
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
        config.set("booya.kasha", new Property("wat", null));
        config.set("ninky", new Property("nonk", null));
        assertFalse(config.get("booya.kasha").isEmpty());
        assertFalse(config.get("ninky").isEmpty());
    }

    @Test
    public void has_yaml_representation() {
        Config config = new Config();
        config.set("a.b.c.d.e", new Property("1", "Comment E"));
        config.set("aa.x.y.z", new Property("X", null));
        config.set("a.c.d.e", new Property("3", null));
        config.set("a.d.e", new Property("4", null));
        config.set("a.l", new PropertyList());
        config.set("a.l", new Property("one", null));
        config.set("a.l", new Property("two", "TWO"));

        String expected = "" +
                "a:\n" +
                "  b:\n" +
                "    c:\n" +
                "      d:\n" +
                "        # Comment E\n" +
                "        e: 1\n" +
                "  c:\n" +
                "    d:\n" +
                "      e: 3\n" +
                "  d:\n" +
                "    e: 4\n" +
                "  l:\n" +
                "    - one\n" +
                "    # TWO\n" +
                "    - two\n" +
                "";
        assertEquals(expected, config.toYaml("a"));
    }
}
