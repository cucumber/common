package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import org.junit.Test;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

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
