package io.cucumber.messages;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MessageToNdjsonWriter implements MessageWriter {
    private final Writer out;
    private final ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(JsonInclude.Include.NON_EMPTY);

    public MessageToNdjsonWriter(OutputStream out) {
        this.out = new OutputStreamWriter(out, StandardCharsets.UTF_8);
    }

    @Override
    public void write(Object message) throws IOException {
        out.write(mapper.writeValueAsString(message));
        out.write("\n");
        out.flush();
    }
}
