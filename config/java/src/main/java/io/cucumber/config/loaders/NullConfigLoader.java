package io.cucumber.config.loaders;

import io.cucumber.config.Config;

public class NullConfigLoader implements ConfigLoader {
    @Override
    public void load(Config config) {
    }
}
