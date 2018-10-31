package io.cucumber.config;

import java.util.HashMap;

public class StringMapTest extends FieldSetterContract {
    @Override
    protected MapBuilder makeMapBuilder(Object config) {
        return new StringMapBuilder("testing.", new HashMap<Object, Object>() {{
            put("testing.somebool", "true");
            put("testing.meaning", "42");
            put("testing.message", "hello");
            put("testing.myenum", "BAR");
            put("testing.stringlist", "one,two");
        }});
    }
}
