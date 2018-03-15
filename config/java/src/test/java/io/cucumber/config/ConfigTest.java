package io.cucumber.config;

import org.junit.Test;

import java.util.List;

import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ConfigTest {
    @Test
    public void gets_and_sets_value() {
        Config config = new Config();
        config.setIn("name", new Property("progress"));
        assertEquals("progress", config.getIn("name").asString());
    }

    @Test
    public void gets_boolean() {
        Config config = new Config();
        config.setIn("a", new Property("true"));
        config.setIn("b", new Property("false"));

        assertTrue(config.getIn("a").asBoolean());
        assertFalse(config.getIn("b").asBoolean());
    }

    @Test
    public void throws_exception_when_trying_to_set_value_at_subconfig() {
        Config config = new Config();
        config.getChild("sub");
        try {
            config.setIn("sub", new Property("3"));
            fail();
        } catch (RuntimeException expected) {
            assertEquals("Can't override config as property", expected.getMessage());
        }
    }

    @Test
    public void appends_to_list() {
        Config config = new Config();
        config.setValue("list", new PropertyList());
        config.setValue("list", new Property("one"));
        config.setValue("list", new Property("two"));
        Value l = config.getValue("list");
        List<Value> list = l.asList();
        assertEquals("one", list.get(0).asString());
        assertEquals("two", list.get(1).asString());
    }

    @Test
    public void gets_deep_value() {
        Config root = new Config();

        Value one = root.getChild("one");
        Value two = one.getChild("two");

        two.setValue("hello", new Property("world"));
        assertEquals("world", root.getIn("one.two.hello").asString());
    }

    @Test
    public void throws_exception_when_no_value_set() {
        Config config = new Config();
        assertTrue(config.getIn("not.set").isNull());
    }

    @Test
    public void unset_value_is_null() {
        Config config = new Config();
        assertTrue(config.getIn("booya.kasha").isNull());
    }

    @Test
    public void set_value_is_not_null() {
        Config config = new Config();
        config.setIn("booya.kasha", new Property("wat"));
        config.setIn("ninky", new Property("nonk"));
        assertFalse(config.getIn("booya.kasha").isNull());
        assertFalse(config.getIn("ninky").isNull());
    }

    @Test
    public void has_yaml_representation() {
        Config config = new Config();
        config.setIn("a.b.c.d.e", new Property("1"));
        config.setIn("aa.x.y.z", new Property("X"));
        config.setIn("a.c.d.e", new Property("3"));
        config.setIn("a.d.e", new Property("4"));

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
