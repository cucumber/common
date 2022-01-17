package io.cucumber.messages;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;

import static com.fasterxml.jackson.databind.SerializationFeature.WRITE_ENUMS_USING_TO_STRING;

public final class JSON {
    private static final ObjectMapper mapper = new ObjectMapper()
            .registerModule(new ParameterNamesModule())
            .registerModule(new Jdk8Module())
            .setSerializationInclusion(JsonInclude.Include.NON_ABSENT)
            .enable(WRITE_ENUMS_USING_TO_STRING)
            .disable(JsonGenerator.Feature.AUTO_CLOSE_TARGET);

    private JSON() {
    }

    public static void writeValue(OutputStream out, Object value) throws IOException {
        mapper.writeValue(out, value);
    }

    public static void writeValue(Writer w, Object value) throws IOException {
        mapper.writeValue(w, value);
    }

    public static String writeValueAsString(Object value) throws IOException {
        return mapper.writeValueAsString(value);
    }

    public static byte[] writeValueAsBytes(Object value) throws IOException {
        return mapper.writeValueAsBytes(value);
    }

}
