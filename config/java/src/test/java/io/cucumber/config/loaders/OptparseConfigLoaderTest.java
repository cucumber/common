package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import org.junit.Test;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class OptparseConfigLoaderTest extends ConfigLoaderContract {
    @Override
    protected ConfigLoader makeConfigLoader() {
        return new OptparseConfigLoader("testing.", asList("--somebool", "--meaning", "42"));
    }

    @Test
    public void returns_surplus() {
        OptparseConfigLoader optparseConfigLoader = new OptparseConfigLoader("testing.",
                asList("--one", "--two", "three", "four", "--five"));
        Config config = new Config();
        optparseConfigLoader.load(config);
        assertEquals("true", config.getString("testing.one"));
        assertEquals("three", config.getString("testing.two"));
        assertEquals("true", config.getString("testing.five"));
        assertEquals(singletonList("four"), optparseConfigLoader.getSurplus());
    }
}
