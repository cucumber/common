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

    public String getString(String key) {
        return getIn(normalize(key)).asString();
    }

    public Boolean getBoolean(String key) {
        return getIn(normalize(key)).asBoolean();
    }

    public Integer getInteger(String key) {
        return getIn(normalize(key)).asInt();
    }

    public boolean isNull(String key) {
        return getIn(normalize(key)).isNull();
    }

    @Override
    public boolean isProperty() {
        return false;
    }

    @Override
    public List<Value> asList() {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public void update(Value value) {
        throw new RuntimeException("Can't override config as property");
    }

    public void set(String key, Value value) {
        setIn(normalize(key), value);
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
        Value value = valueByProperty.get(property.toLowerCase());
        return value != null ? value : new Property(null);
    }

    public Value getIn(String normalizedKey) {
        List<String> path = toPath(normalizedKey);
        Value config = this;
        for (int i = 0; i < path.size(); i++) {
            String property = path.get(i);
            if (i == path.size() - 1) {
                return config.getValue(property);
            } else {
                config = config.getChild(property.toLowerCase());
                if (config == null) {
                    return new Property(null);
                }
            }
        }
        throw new RuntimeException("path cannot be empty");
    }

    private void setIn(String normalizedKey, Value value) {
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
            boolean print = rootKey == null || rootKey.equals(entry.getKey());
            boolean isProperty = entry.getValue().isProperty();
            if (print && isProperty) {
                indent(depth, out);
                out.append(entry.getKey()).append(":");
                if (!entry.getValue().isNull()) {
                    out.append(" ").append(entry.getValue().asString());
                }
                out.append("\n");
            }
        }
        for (Map.Entry<String, Value> entry : valueByProperty.entrySet()) {
            boolean print = rootKey == null || rootKey.equals(entry.getKey());
            boolean isProperty = entry.getValue().isProperty();
            if (print && !isProperty) {
                indent(depth, out);
                out.append(entry.getKey()).append(":\n");
                Value config = entry.getValue();
                config.print(depth + 1, null, out);
            }
        }
    }

    private void indent(int depth, Appendable out) throws IOException {
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
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public Boolean asBoolean() {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public Integer asInt() {
        throw new UnsupportedOperationException("TODO");
    }

    @Override
    public boolean isNull() {
        return false;
    }
}
