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
public class Config {
    private final Map<String, Value> valueByProperty = new TreeMap<>();
    private final Map<String, Config> configByProperty = new TreeMap<>();

    public String getString(String key) {
        return getIn(normalize(key), false).getString();
    }

    public Boolean getBoolean(String key) {
        return getIn(normalize(key), false).getBoolean();
    }

    public Integer getInteger(String key) {
        return getIn(normalize(key), false).getInt();
    }

    public boolean isNull(String key) {
        return getIn(normalize(key), true).isNull();
    }

    public void setNull(String key) {
        setIn(normalize(key), new NullValue());
    }

    public void set(String key, String value) {
        setIn(normalize(key), RealValue.fromString(value));
    }

    public void set(String key, int value) {
        setIn(normalize(key), RealValue.fromInteger(value));
    }

    public void set(String key, boolean value) {
        setIn(normalize(key), RealValue.fromBoolean(value));
    }

    // Use by loaders
    public void setValue(String property, Value value) {
        this.valueByProperty.put(property.toLowerCase(), value);
    }

    public Config getChild(String property) {
        if (!this.configByProperty.containsKey(property.toLowerCase())) {
            this.configByProperty.put(property.toLowerCase(), new Config());
        }
        return this.configByProperty.get(property.toLowerCase());
    }

    private Value getValue(String property) {
        return this.valueByProperty.get(property.toLowerCase());
    }

    private Value getIn(String normalizedKey, boolean allowNull) {
        List<String> path = toPath(normalizedKey);
        Config config = this;
        for (int i = 0; i < path.size(); i++) {
            String property = path.get(i);
            if (i == path.size() - 1) {
                Value value = config.getValue(property);
                if (value != null) return value;
                if (allowNull) return new NullValue();
                throw new UndefinedKeyException(normalizedKey);
            } else {
                config = config.getChild(property.toLowerCase());
                if (config == null) {
                    if (allowNull) return new NullValue();
                    throw new UndefinedKeyException(normalizedKey);
                }
            }
        }
        throw new RuntimeException("path cannot be empty");
    }

    private void setIn(String normalizedKey, Value value) {
        List<String> path = toPath(normalizedKey);
        Config config = this;
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

    private void print(int depth, String rootKey, Appendable out) throws IOException {
        for (Map.Entry<String, Value> entry : valueByProperty.entrySet()) {
            if (rootKey == null || rootKey.equals(entry.getKey())) {
                String key = entry.getKey();

                // Print the key/value
                indent(depth, out);
                out.append(entry.getKey()).append(":");
                if (!entry.getValue().isNull()) {
                    out.append(" ").append(entry.getValue().getString());
                }
                out.append("\n");
            }
        }
        for (Map.Entry<String, Config> entry : configByProperty.entrySet()) {
            if (rootKey == null || rootKey.equals(entry.getKey())) {
                indent(depth, out);
                out.append(entry.getKey()).append(":\n");
                Config config = entry.getValue();
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
}
