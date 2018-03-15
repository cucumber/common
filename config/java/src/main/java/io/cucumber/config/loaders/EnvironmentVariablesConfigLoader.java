package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import io.cucumber.config.Property;

import java.util.Map;

public class EnvironmentVariablesConfigLoader implements ConfigLoader {
    private final Map<String, String> env;

    public EnvironmentVariablesConfigLoader() {
        this(System.getenv());
    }

    public EnvironmentVariablesConfigLoader(Map<String, String> env) {
        this.env = env;
    }

    @Override
    public void load(Config config) {
        for (Map.Entry<String, String> entry : env.entrySet()) {
            String key = entry.getKey();
            String[] values = entry.getValue().split(",");
            for (String value : values) {
                config.set(key, new Property(value));
            }
        }
    }
}
