package io.cucumber.config;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.Reader;
import java.util.Map;

import static io.cucumber.config.DeepMap.getMap;

class JsonBuilder implements MapBuilder {
    private final String[] keys;
    private Map<String, ?> map;

    JsonBuilder(String[] keys, Reader jsonReader) {
        this.keys = keys;
        this.map = new Gson().fromJson(jsonReader, new TypeToken<Map<String, Object>>() {
        }.getType());
    }

    @Override
    public Map<String, ?> buildMap() {
        return getMap(keys, map);
    }
}
