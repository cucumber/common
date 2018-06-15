package io.cucumber.config;

import org.yaml.snakeyaml.Yaml;

import java.io.Reader;
import java.util.Map;

import static io.cucumber.config.DeepMap.getMap;

class YamlBuilder implements MapBuilder {
    private final String[] keys;
    private Map<String, ?> map;

    YamlBuilder(String[] keys, Reader yamlReader) {
        this.keys = keys;
        this.map = new Yaml().load(yamlReader);
    }

    @Override
    public Map<String, ?> buildMap() {
        return getMap(keys, map);
    }
}
