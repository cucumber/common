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
        config.set("name", "progress");
        assertEquals("progress", config.getString("name"));
    }

    @Test
    public void gets_boolean() {
        Config config = new Config();
        config.set("a", true);
        config.set("b", false);

        assertTrue(config.getBoolean("a"));
        assertFalse(config.getBoolean("b"));
    }

    @Test
    public void throws_exception_when_trying_to_set_value_at_subconfig() {
        Config config = new Config();
        config.getChild("sub");
        try {
            config.set("sub", 3);
            fail();
        } catch (RuntimeException expected) {
            assertEquals("Can't override config as property", expected.getMessage());
        }
    }

    @Test
    public void appends_to_list() {
        Config config = new Config();
        config.setValue("list", new PropertyList());
        config.setValue("list", Property.fromString("one"));
        config.setValue("list", Property.fromString("two"));
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

        two.setValue("hello", Property.fromString("world"));
        assertEquals("world", root.getString("one.two.hello"));
    }

    @Test
    public void throws_exception_when_no_value_set() {
        Config config = new Config();
        try {
            config.getString("not.set");
            fail();
        } catch (UndefinedKeyException expected) {
            assertEquals("No such key: not.set", expected.getMessage());
        }
    }

    @Test
    public void unset_value_is_null() {
        Config config = new Config();
        assertTrue(config.isNull("booya.kasha"));
    }

    @Test
    public void set_value_is_not_null() {
        Config config = new Config();
        config.set("booya.kasha", "wat");
        config.set("ninky", "nonk");
        assertFalse(config.isNull("booya.kasha"));
        assertFalse(config.isNull("ninky"));
    }

    @Test
    public void has_yaml_representation() {
        Config config = new Config();
        config.set("a.b.c.d.e", "1");
        config.set("aa.x.y.z", "X");
        config.set("a.c.d.e", "3");
        config.set("a.d.e", "4");

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
