package io.cucumber.messages;

import com.google.protobuf.GeneratedMessageV3;
import com.google.protobuf.util.JsonFormat;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;

public class MessageToNdjsonWriter implements MessageWriter {
    private final Writer out;
    private final JsonFormat.Printer jsonPrinter = JsonFormat
            .printer()
            .omittingInsignificantWhitespace();

    public MessageToNdjsonWriter(OutputStream out) {
        this.out = new OutputStreamWriter(out, StandardCharsets.UTF_8);
    }

    @Override
    public void write(GeneratedMessageV3 message) throws IOException {
        out.write(jsonPrinter.print(message));
        out.write("\n");
        out.flush();
    }
}
