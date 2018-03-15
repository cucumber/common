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
        config.set("name", new Property("progress"));
        assertEquals("progress", config.getString("name"));
    }

    @Test
    public void gets_boolean() {
        Config config = new Config();
        config.set("a", new Property("true"));
        config.set("b", new Property("false"));

        assertTrue(config.getBoolean("a"));
        assertFalse(config.getBoolean("b"));
    }

    @Test
    public void throws_exception_when_trying_to_set_value_at_subconfig() {
        Config config = new Config();
        config.getChild("sub");
        try {
            config.set("sub", new Property("3"));
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
        assertEquals("world", root.getString("one.two.hello"));
    }

    @Test
    public void throws_exception_when_no_value_set() {
        Config config = new Config();
        assertTrue(config.getIn("not.set").isNull());
    }

    @Test
    public void unset_value_is_null() {
        Config config = new Config();
        assertTrue(config.isNull("booya.kasha"));
    }

    @Test
    public void set_value_is_not_null() {
        Config config = new Config();
        config.set("booya.kasha", new Property("wat"));
        config.set("ninky", new Property("nonk"));
        assertFalse(config.isNull("booya.kasha"));
        assertFalse(config.isNull("ninky"));
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
