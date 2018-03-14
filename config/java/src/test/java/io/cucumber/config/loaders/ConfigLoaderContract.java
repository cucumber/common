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

        assertEquals(true, config.getBoolean("cucumber.help"));
        assertEquals(true, config.getBoolean("CUCUMBER_HELP"));
    }

    protected abstract ConfigLoader makeConfigLoader();
}
