package io.cucumber.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class OptparseBuilder implements MapBuilder {
    private final List<String> args;
    private final Map<String, String> aliases;
    private final String surplusKey;
    private final FieldSetter fieldSetter;

    OptparseBuilder(Object config, String surplusKey, List<String> args, Map<String, String> aliases) {
        this.fieldSetter = new FieldSetter(config);
        this.surplusKey = surplusKey;
        this.args = new ArrayList<>(args);
        this.aliases = aliases;
    }

    @Override
    public Map<String, ?> buildMap() {
        Map<String, List<Object>> result = new HashMap<>();

        List<Object> surplus = new ArrayList<>();

        String fieldKey = null;
        while (!args.isEmpty()) {
            String arg = args.remove(0).trim();
            Object value = null;

            if (arg.startsWith("--no-")) {
                fieldKey = arg.substring(4).replaceAll("-", "");
                value = false;
            } else if (arg.startsWith("--")) {
                fieldKey = arg.replaceAll("-", "");
            } else if (arg.startsWith("-")) {
                fieldKey = aliases.get(arg).replaceAll("-", "");
            } else if (fieldKey != null) {
                // previous loop was an option
                value = arg;
            } else {
                surplus.add(arg);
            }

            if (fieldKey != null && fieldSetter.isBoolean(fieldKey)) {
                if (value == null) {
                    value = true;
                }
            }

            if (value != null) {
                List<Object> list = result.get(fieldKey);
                if (list == null) {
                    list = new ArrayList<>();
                    result.put(fieldKey, list);
                }
                list.add(value);
                fieldKey = null;
            }
        }

        if (!surplus.isEmpty()) {
            result.put(surplusKey, surplus);
        }

        return result;
    }
}
