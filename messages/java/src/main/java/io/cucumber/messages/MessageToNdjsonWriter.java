package io.cucumber.messages;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.util.function.BiConsumer;

public final class MessageToNdjsonWriter<T> implements MessageWriter<T>, AutoCloseable {
    private final Writer writer;
    private final BiConsumer<Writer, T> serializer;

    public MessageToNdjsonWriter(OutputStream outputStream, BiConsumer<Writer, T> serializer) {
        this(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8), serializer);
    }

    public MessageToNdjsonWriter(Writer writer, BiConsumer<Writer, T> serializer) {
        this.writer = writer;
        this.serializer = serializer;
    }

    @Override
    public void write(T message) throws IOException {
        this.serializer.accept(writer, message);
        writer.write("\n");
        writer.flush();
    }

    @Override
    public void close() throws Exception {
        this.writer.close();
    }
}
