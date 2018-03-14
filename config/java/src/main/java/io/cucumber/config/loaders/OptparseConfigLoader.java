package io.cucumber.config.loaders;

import io.cucumber.config.Config;

import java.util.ArrayList;
import java.util.List;

public class OptparseConfigLoader implements ConfigLoader {
    private final String prefix;
    private final List<String> args;
    private final List<String> surplus = new ArrayList<>();

    public OptparseConfigLoader(String prefix, List<String> args) {
        this.prefix = prefix;
        this.args = new ArrayList<>(args);
    }

    public List<String> getSurplus() {
        return surplus;
    }

    private class Option {
        private final String name;
        private String value;

        Option(String name) {
            this.name = name;
        }

        void setValue(String value) {
            this.value = value;
        }

        void update(Config config) {
            String key = prefix + name;
            if (value == null) {
                config.set(key, true);
            } else {
                config.set(key, value);
            }
        }

        public boolean hasValue() {
            return value != null;
        }
    }

    @Override
    public void load(Config config) {
        Option option = null;
        while (!args.isEmpty()) {
            String arg = args.remove(0).trim();
            if (arg.startsWith("-")) {
                if (option != null) {
                    option.update(config);
                }
                option = new Option(arg.replaceAll("-", ""));
            } else {
                if(option != null && !option.hasValue()) {
                    option.setValue(arg);
                } else {
                    surplus.add(arg);
                }
            }
        }
        if (option != null) {
            option.update(config);
        }
    }

}
