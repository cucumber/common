package io.cucumber.messages;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public final class JSON {
    private static final ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(JsonInclude.Include.NON_NULL);
    private JSON() {}

    public static String toJSON(Object message) throws IOException {
        return mapper.writeValueAsString(message);
    }
}
