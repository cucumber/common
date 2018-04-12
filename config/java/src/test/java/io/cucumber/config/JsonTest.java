package io.cucumber.config;

import io.cucumber.config.FieldSetterContract;
import io.cucumber.config.JsonBuilder;
import io.cucumber.config.MapBuilder;

import java.io.StringReader;

public class JsonTest extends FieldSetterContract {
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
        return new JsonBuilder(new String[]{"testing"}, jsonReader);
    }
}
