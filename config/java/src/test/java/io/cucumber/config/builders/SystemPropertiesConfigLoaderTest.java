package io.cucumber.config.builders;

import io.cucumber.config.MapBuilder;

import java.util.HashMap;

public class SystemPropertiesConfigLoaderTest extends MapBuilderContract {
    @Override
    protected MapBuilder makeMapBuilder() {
        return new PrefixMapBuilder("testing.", new HashMap<Object, Object>() {{
            put("testing.somebool", "true");
            put("testing.meaning", "42");
            put("testing.message", "hello");
            put("testing.stringlist", "one,two");
        }});
    }
}
