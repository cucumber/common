package io.cucumber.messages;

import io.cucumber.messages.types.Envelope;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;

import static java.util.Objects.requireNonNull;

public final class MessageToNdjsonWriter implements AutoCloseable {
    private final Writer writer;
    private final Serializer serializer;

    public MessageToNdjsonWriter(OutputStream outputStream, Serializer serializer) {
        this(
                new OutputStreamWriter(
                        requireNonNull(outputStream),
                        StandardCharsets.UTF_8),
                requireNonNull(serializer)
        );
    }

    private MessageToNdjsonWriter(Writer writer, Serializer serializer) {
        this.writer = writer;
        this.serializer = serializer;
    }

    public void write(Envelope message) throws IOException {
        requireNonNull(message);
        serializer.writeValue(writer, message);
        writer.write("\n");
        writer.flush();
    }

    @Override
    public void close() throws IOException {
        writer.close();
    }

    @FunctionalInterface
    public interface Serializer {

        void writeValue(Writer writer, Envelope value) throws IOException;

    }
}
