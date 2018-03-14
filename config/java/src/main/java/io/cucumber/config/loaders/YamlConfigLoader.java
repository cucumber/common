package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import io.cucumber.config.Property;
import io.cucumber.config.Value;
import org.yaml.snakeyaml.Yaml;

import java.io.Reader;
import java.util.List;
import java.util.Map;

public class YamlConfigLoader implements ConfigLoader {
    private static final Yaml YAML = new Yaml();
    private final Map<String, Object> map;

    public YamlConfigLoader(Reader reader) {
        this.map = YAML.load(reader);
    }

    @Override
    public void load(Config config) {
        populate(config, map);
    }

    private void populate(Value config, Map<String, Object> map) {
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String property = entry.getKey();
            property = property.replaceAll("_", "");
            Object value = entry.getValue();
            if (value == null) {
                config.setNull(property);
            } else if (value instanceof String) {
                config.setValue(property, new Property((String) value));
            } else if (value instanceof Boolean) {
                config.setValue(property, Property.fromBoolean((Boolean) value));
            } else if (value instanceof Integer) {
                config.setValue(property, Property.fromInteger((Integer) value));
            } else if (value instanceof Map) {
                Value childConfig = config.getChild(property);
                populate(childConfig, (Map<String, Object>) value);
            } else if (value instanceof List) {
                List<String> values = (List<String>) value;
                for (String v : values) {
                    config.setValue(property, new Property(v));
                }
            } else {
                throw new RuntimeException(String.format("Unsupported YAML type: %s (%s)", value, value.getClass()));
            }
        }
    }
}
