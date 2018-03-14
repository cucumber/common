package io.cucumber.config.loaders;

import java.util.HashMap;

public class EnvironmentVariablesConfigLoaderTest extends ConfigLoaderContract {
    @Override
    protected ConfigLoader makeConfigLoader() {
        return new EnvironmentVariablesConfigLoader(new HashMap<String, String>() {{
            put("TESTING_SOMEBOOL", "true");
        }});
    }
}
