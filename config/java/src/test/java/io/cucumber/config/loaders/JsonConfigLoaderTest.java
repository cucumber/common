package io.cucumber.config.loaders;

import java.io.StringReader;

public class JsonConfigLoaderTest extends ConfigLoaderContract {
    @Override
    protected ConfigLoader makeConfigLoader() {
        return new JsonConfigLoader(new StringReader("" +
                "{\n" +
                "  \"testing\": {\n" +
                "    \"somebool\": true,\n" +
                "    \"meaning\": 42,\n" +
                "    \"list\": [\n" +
                "      \"one\",\n" +
                "      \"two\"\n" +
                "    ]\n" +
                "  }\n" +
                "}\n"
        ));
    }
}
