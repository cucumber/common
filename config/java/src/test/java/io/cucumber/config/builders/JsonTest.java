package io.cucumber.config.builders;

import io.cucumber.config.MapBuilder;
import io.cucumber.config.FieldSetterContract;

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
