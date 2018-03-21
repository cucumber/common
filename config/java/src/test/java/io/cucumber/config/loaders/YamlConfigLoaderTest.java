package io.cucumber.config.loaders;

import java.io.StringReader;

public class YamlConfigLoaderTest extends ConfigLoaderContract {
    @Override
    protected ConfigLoader makeConfigLoader() {
        return new YamlConfigLoader(new StringReader("" +
                "testing:\n" +
                "  somebool: true\n" +
                "  meaning: 42\n" +
                "  list:\n" +
                "  - one\n" +
                "  - two\n"
        ), "test.yml");
    }
}
