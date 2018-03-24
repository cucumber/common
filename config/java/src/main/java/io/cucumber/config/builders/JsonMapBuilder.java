package io.cucumber.config.builders;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import io.cucumber.config.MapBuilder;

import java.io.Reader;
import java.util.Map;

public class JsonMapBuilder implements MapBuilder {
    private final String[] keys;
    private Map<String, Object> map;

    public JsonMapBuilder(String[] keys, Reader jsonReader) {
        this.keys = keys;
        this.map = new Gson().fromJson(jsonReader, new TypeToken<Map<String, Object>>() {
        }.getType());
    }

    @Override
    public Map<String, ?> buildMap() {
        for (String key : keys) {
            map = (Map<String, Object>) map.get(key);
        }
        return map;
    }
}
