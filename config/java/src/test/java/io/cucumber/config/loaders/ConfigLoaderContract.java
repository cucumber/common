package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public abstract class ConfigLoaderContract {
    @Test
    public void creates_map_with_env() {
        Config config = new Config();
        ConfigLoader configLoader = makeConfigLoader();
        configLoader.load(config);

        assertEquals("progress", config.getString("cucumber.format"));
        assertEquals("progress", config.getString("CUCUMBER_FORMAT"));
    }

    protected abstract ConfigLoader makeConfigLoader();
}
