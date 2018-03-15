package io.cucumber.config.loaders;

import org.yaml.snakeyaml.Yaml;

import java.io.Reader;
import java.util.Map;

public class YamlConfigLoader extends MapConfigLoader {
    private static final Yaml YAML = new Yaml();

    public YamlConfigLoader(Reader reader) {
        super((Map<String, Object>) YAML.load(reader));
    }
}
