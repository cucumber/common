package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public abstract class ConfigLoaderContract {
    @Test
    public void configures_boolean() {
        assertEquals(true, loadConfig().getBoolean("testing.somebool"));
    }

    private Config loadConfig() {
        Config config = new Config();
        ConfigLoader configLoader = makeConfigLoader();
        configLoader.load(config);
        return config;
    }

    protected abstract ConfigLoader makeConfigLoader();
}
