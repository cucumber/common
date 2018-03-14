package io.cucumber.config.loaders;

import io.cucumber.config.Config;

import java.util.ArrayList;
import java.util.List;

public class OptparseConfigLoader implements ConfigLoader {
    private final String prefix;
    private final List<String> args;

    public OptparseConfigLoader(String prefix, List<String> args) {
        this.prefix = prefix;
        this.args = new ArrayList<>(args);
    }

    @Override
    public void load(Config config) {
        String option = null;
        String value = null;
        while (!args.isEmpty()) {
            String arg = args.remove(0).trim();
            if (arg.startsWith("-")) {
                option = arg.replaceAll("-", "");
            } else {
                value = arg;
            }

            if (option != null) {
                String key = prefix + option;
                if (value == null) {
                    config.set(key, true);
                } else {
                    config.set(key, value);
                }
            }
        }
        if (option != null) {
            String key = prefix + option;
            if (value == null) {
                config.set(key, true);
            } else {
                config.set(key, value);
            }
        }
    }
}
