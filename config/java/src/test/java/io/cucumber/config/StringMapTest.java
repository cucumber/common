package io.cucumber.config;

import io.cucumber.config.FieldSetterContract;
import io.cucumber.config.MapBuilder;
import io.cucumber.config.StringMapBuilder;

import java.util.HashMap;

public class StringMapTest extends FieldSetterContract {
    @Override
    protected MapBuilder makeMapBuilder() {
        return new StringMapBuilder("testing.", new HashMap<Object, Object>() {{
            put("testing.somebool", "true");
            put("testing.meaning", "42");
            put("testing.message", "hello");
            put("testing.stringlist", "one,two");
        }});
    }
}
