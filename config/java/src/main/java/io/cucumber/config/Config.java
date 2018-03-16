package io.cucumber.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;

/**
 * Nested configuration. Keys are hierarchical.
 */
public class Config implements Value {
    private final Map<String, Value> valueByProperty = new TreeMap<>();

    @Override
    public boolean isProperty() {
        return false;
    }

    @Override
    public List<Value> asList() {
        throw new UnsupportedOperationException();
    }

    @Override
    public void update(Value value) {
        throw new RuntimeException("Can't override config as property");
    }

    @Override
    public void setValue(String property, Value value) {
        String p = property.toLowerCase();
        if (valueByProperty.containsKey(p)) {
            Value existing = valueByProperty.get(p);
            existing.update(value);
        } else {
            valueByProperty.put(p, value);
        }
    }

    @Override
    public Value getChild(String property) {
        if (!valueByProperty.containsKey(property.toLowerCase())) {
            valueByProperty.put(property.toLowerCase(), new Config());
        }
        return valueByProperty.get(property.toLowerCase());
    }

    @Override
    public Value getValue(String property) {
        return valueByProperty.get(property.toLowerCase());
    }

    @Override
    public Value get(String key) {
        String normalizedKey = normalize(key);
        List<String> path = toPath(normalizedKey);
        Value config = this;
        for (int i = 0; i < path.size(); i++) {
            String property = path.get(i);
            if (i == path.size() - 1) {
                return config.getValue(property);
            } else {
                config = config.getChild(property.toLowerCase());
                if (config == null) {
                    return null;
                }
            }
        }
        throw new RuntimeException("path cannot be empty");
    }

    @Override
    public void set(String key, Value value) {
        String normalizedKey = normalize(key);
        List<String> path = toPath(normalizedKey);
        Value config = this;
        for (int i = 0; i < path.size(); i++) {
            String property = path.get(i);
            if (i == path.size() - 1) {
                config.setValue(property, value);
                return;
            } else {
                config = config.getChild(property.toLowerCase());
            }
        }
    }

    public String toYaml(String rootKey) {
        try {
            StringBuilder out = new StringBuilder();
            this.print(0, rootKey, out);
            return out.toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void print(int depth, String rootKey, Appendable out) throws IOException {
        // Print properties
        for (Map.Entry<String, Value> entry : valueByProperty.entrySet()) {
            String key = entry.getKey();
            Value value = entry.getValue();
            boolean print = rootKey == null || rootKey.equals(key);
            boolean isProperty = value.isProperty();

            if (print && isProperty) {
                value.print(depth, key, out);
            }
        }
        for (Map.Entry<String, Value> entry : valueByProperty.entrySet()) {
            String key = entry.getKey();
            Value value = entry.getValue();
            boolean print = rootKey == null || rootKey.equals(entry.getKey());
            boolean isProperty = value.isProperty();

            if (print && !isProperty) {
                indent(depth, out);
                out.append(key).append(":\n");
                value.print(depth + 1, null, out);
            }
        }
    }

    static void indent(int depth, Appendable out) throws IOException {
        for (int i = 0; i < depth; i++) {
            out.append("  ");
        }
    }

    private List<String> toPath(String key) {
        return Arrays.asList(normalize(key).split("\\."));
    }

    private String normalize(String key) {
        return key.replace('_', '.').toLowerCase(Locale.ENGLISH);
    }

    @Override
    public String asString() {
        throw new UnsupportedOperationException();
    }

    @Override
    public Boolean asBoolean() {
        throw new UnsupportedOperationException();
    }

    @Override
    public Integer asInt() {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isEmpty() {
        return valueByProperty.isEmpty();
    }
}
