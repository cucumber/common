package io.cucumber.config;

import java.io.StringReader;

public class JsonTest extends FieldSetterContract {
    @Override
    protected MapBuilder makeMapBuilder(Object config) {
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
