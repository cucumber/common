package io.cucumber.config.builders;

import io.cucumber.config.MapBuilder;
import org.yaml.snakeyaml.Yaml;

import java.io.Reader;
import java.util.Map;

import static io.cucumber.config.builders.DeepMap.getMap;

public class YamlBuilder implements MapBuilder {
    private final String[] keys;
    private Map<String, ?> map;

    public YamlBuilder(String[] keys, Reader yamlReader) {
        this.keys = keys;
        this.map = new Yaml().load(yamlReader);
    }

    @Override
    public Map<String, ?> buildMap() {
        return getMap(keys, map);
    }
}
