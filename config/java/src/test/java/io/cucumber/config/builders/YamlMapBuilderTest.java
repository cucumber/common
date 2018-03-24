package io.cucumber.config.builders;

import io.cucumber.config.MapBuilder;
import org.yaml.snakeyaml.Yaml;

import java.io.StringReader;
import java.util.Map;

public class YamlMapBuilderTest extends MapBuilderContract {
    @Override
    protected MapBuilder makeMapBuilder() {
        return new MapBuilder() {
            @Override
            public Map<String, ?> buildMap() {
                return new Yaml().load(new StringReader("" +
                        "somebool: true\n" +
                        "meaning: 42\n" +
                        "message: hello\n" +
                        "stringlist:\n" +
                        "- one\n" +
                        "- two\n"
                ));
            }
        };
    }
}
