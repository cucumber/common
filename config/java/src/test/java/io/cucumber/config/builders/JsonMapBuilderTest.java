package io.cucumber.config.builders;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import io.cucumber.config.MapBuilder;

import java.io.StringReader;
import java.util.Map;

public class JsonMapBuilderTest extends MapBuilderContract {
    @Override
    protected MapBuilder makeMapBuilder() {
        StringReader jsonReader = new StringReader("" +
                "{\n" +
                "  \"testing\": {\n" +
                "    \"somebool\": true,\n" +
                "    \"meaning\": 42,\n" +
                "    \"message\": \"hello\",\n" +
                "    \"stringlist\": [\n" +
                "      \"one\",\n" +
                "      \"two\"\n" +
                "    ]\n" +
                "  }\n" +
                "}\n"
        );
        return new JsonMapBuilder(new String[]{"testing"}, jsonReader);
    }
}
