package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import io.cucumber.config.Property;
import org.junit.Test;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class OptparseConfigLoaderTest extends ConfigLoaderContract {
    @Override
    protected ConfigLoader makeConfigLoader() {
        return new OptparseConfigLoader("testing.", asList(
                "--somebool",
                "--meaning", "42",
                "--list", "one",
                "--list", "two"
        ));
    }

    @Test
    public void supports_no_boolean_option() {
        Config config = new Config();
        config.set("testing.somebool", Property.fromBoolean(true));
        assertTrue(config.get("testing.somebool").asBoolean());
        new OptparseConfigLoader("testing.", singletonList("--no-somebool")).load(config);
        assertFalse(config.get("testing.somebool").asBoolean());
    }

    @Test
    public void returns_surplus() {
        OptparseConfigLoader optparseConfigLoader = new OptparseConfigLoader("testing.",
                asList("--one", "--two", "three", "four", "--five"));
        Config config = new Config();
        optparseConfigLoader.load(config);
        assertEquals("true", config.get("testing.one").asString());
        assertEquals("three", config.get("testing.two").asString());
        assertEquals("true", config.get("testing.five").asString());
        assertEquals(singletonList("four"), optparseConfigLoader.getSurplus());
    }
}
