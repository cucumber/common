package io.cucumber.config.loaders;

import com.google.gson.Gson;

import java.io.Reader;
import java.util.Map;

public class JsonConfigLoader extends MapConfigLoader {
    private static final Gson GSON = new Gson();

    public JsonConfigLoader(Reader json) {
        super(GSON.fromJson(json, Map.class));
    }
}
