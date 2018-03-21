package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import io.cucumber.config.Property;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class OptparseConfigLoader implements ConfigLoader {
    private final String prefix;
    private final List<String> args;
    private final Map<String, String> aliases;
    private final String surplusKey;

    public OptparseConfigLoader(String prefix, String surplusKey, List<String> args) {
        this(prefix, surplusKey, args, Collections.<String, String>emptyMap());
    }

    public OptparseConfigLoader(String prefix, String surplusKey, List<String> args, Map<String, String> aliases) {
        this.prefix = prefix;
        this.surplusKey = surplusKey;
        this.args = new ArrayList<>(args);
        this.aliases = aliases;
    }

    private class Option {
        private final String optname;
        private final String name;
        private String value;

        Option(String optname, String name) {
            this.optname = optname;
            this.name = name;
        }

        Option(String optname, String name, boolean bool) {
            this(optname, name);
            this.value = bool ? "true" : "false";
        }

        void setValue(String value) {
            this.value = value;
        }

        void update(Config config) {
            String key = prefix + name;
            if (value == null) {
                config.set(key, new Property("true", optname));
            } else {
                config.set(key, new Property(value, optname + " " + value));
            }
        }

        public boolean hasValue() {
            return value != null;
        }
    }

    @Override
    public void load(Config config) {
        List<String> surplus = new ArrayList<>();
        Option option = null;
        while (!args.isEmpty()) {
            String arg = args.remove(0).trim();
            if (arg.startsWith("--")) {
                option = createOption(config, option, arg);
            } else if (arg.startsWith("-")) {
                String optname = aliases.get(arg);
                if (optname == null) {
                    throw new RuntimeException("Unsupported option: " + arg);
                }
                option = createOption(config, option, optname);
            } else {
                if (option != null && !option.hasValue()) {
                    option.setValue(arg);
                } else {
                    surplus.add(arg);
                }
            }
        }
        if (option != null) {
            option.update(config);
        }
        for (String s : surplus) {
            config.set(surplusKey, new Property(s, "command line arguments"));
        }
    }

    private Option createOption(Config config, Option option, String arg) {
        String optname = arg;
        if (option != null) {
            option.update(config);
        }
        if (arg.startsWith("--no-")) {
            arg = arg.substring(4);
            option = new Option(optname, arg.replaceAll("-", ""), false);
        } else {
            option = new Option(optname, arg.replaceAll("-", ""));
        }
        return option;
    }

}
