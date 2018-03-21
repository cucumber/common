package io.cucumber.config.loaders;

import io.cucumber.config.Config;

public interface ConfigLoader {
    void load(Config config);
}
