package io.cucumber.config.builders;

import io.cucumber.config.MapBuilder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OptparseBuilder implements MapBuilder {
    private final List<String> args;
    private final Map<String, String> aliases;
    private final String surplusKey;

    public OptparseBuilder(String surplusKey, List<String> args) {
        this(surplusKey, args, Collections.<String, String>emptyMap());
    }

    public OptparseBuilder(String surplusKey, List<String> args, Map<String, String> aliases) {
        this.surplusKey = surplusKey;
        this.args = new ArrayList<>(args);
        this.aliases = aliases;
    }

    @Override
    public Map<String, ?> buildMap() {
        Map<String, List<Object>> result = new HashMap<>();

        List<Object> surplus = new ArrayList<>();
        Option option = null;
        while (!args.isEmpty()) {
            String arg = args.remove(0).trim();
            if (arg.startsWith("--")) {
                option = createOption(result, option, arg);
            } else if (arg.startsWith("-")) {
                String optname = aliases.get(arg);
                if (optname == null) {
                    throw new RuntimeException("Unsupported option: " + arg);
                }
                option = createOption(result, option, optname);
            } else {
                if (option != null && !option.hasValue()) {
                    option.setValue(arg);
                } else {
                    surplus.add(arg);
                }
            }
        }
        if (option != null) {
            option.updateMap(result);
        }
        if (!surplus.isEmpty()) {
            result.put(surplusKey, surplus);
        }

        return result;
    }

    private Option createOption(Map<String, List<Object>> map, Option option, String arg) {
        if (option != null) {
            option.updateMap(map);
        }
        if (arg.startsWith("--no-")) {
            arg = arg.substring(4);
            option = new Option(arg.replaceAll("-", ""), false);
        } else {
            option = new Option(arg.replaceAll("-", ""));
        }
        return option;
    }

    private class Option {
        private final String name;
        private String value;

        Option(String name) {
            this.name = name;
        }

        Option(String name, boolean bool) {
            this(name);
            this.value = bool ? "true" : "false";
        }

        void setValue(String value) {
            this.value = value;
        }

        void updateMap(Map<String, List<Object>> map) {
            String key = name;
            List<Object> list = map.get(key);
            if (list == null) {
                list = new ArrayList<>();
                map.put(key, list);
            }

            if (value == null) {
                list.add(Boolean.TRUE);
            } else {
                list.add(value);
            }
        }

        boolean hasValue() {
            return value != null;
        }
    }

}
