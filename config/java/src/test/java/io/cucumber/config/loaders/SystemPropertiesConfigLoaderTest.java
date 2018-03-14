package io.cucumber.config.loaders;

import java.util.HashMap;

public class SystemPropertiesConfigLoaderTest extends ConfigLoaderContract {
    @Override
    protected ConfigLoader makeConfigLoader() {
        return new SystemPropertiesConfigLoader(new HashMap<Object, Object>() {{
            put("testing.somebool", "true");
            put("testing.meaning", "42");
            put("testing.list", "one,two");
        }});
    }
}
