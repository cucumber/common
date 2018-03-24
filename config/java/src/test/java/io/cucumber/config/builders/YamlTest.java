package io.cucumber.config.builders;

import io.cucumber.config.MapBuilder;
import io.cucumber.config.FieldSetterContract;

import java.io.StringReader;

public class YamlTest extends FieldSetterContract {
    @Override
    protected MapBuilder makeMapBuilder() {
        StringReader yamlReader = new StringReader("" +
                "testing:\n" +
                "  somebool: true\n" +
                "  meaning: 42\n" +
                "  message: hello\n" +
                "  stringlist:\n" +
                "  - one\n" +
                "  - two\n"
        );
        return new YamlBuilder(new String[]{"testing"}, yamlReader);
    }
}
