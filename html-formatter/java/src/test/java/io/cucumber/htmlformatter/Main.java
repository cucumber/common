package io.cucumber.htmlformatter;

import io.cucumber.messages.NdjsonToMessageIterable;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.util.function.BiConsumer;
import java.util.function.BiFunction;

import static io.cucumber.messages.Messages.Envelope;

public final class Main {
    public static final BiFunction<String, Class<Envelope>, Envelope> DESERIALIZER = (json, klass) -> {
        try {
            return Jackson.OBJECT_MAPPER.readValue(json, klass);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    };

    private static final BiConsumer<Writer, Envelope> SERIALIZER = (writer, envelope) -> {
        try {
            Jackson.OBJECT_MAPPER.writeValue(writer, envelope);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    };

    public static void main(String[] args) throws IOException {
        InputStream in = System.in;
        if(args.length == 1) {
            in = new FileInputStream(args[0]);
        }
        try (NdjsonToMessageIterable<Envelope> envelopes = new NdjsonToMessageIterable<>(in, Envelope.class, DESERIALIZER)) {
            try (MessagesToHtmlWriter htmlWriter = new MessagesToHtmlWriter(System.out, SERIALIZER)) {
                for (Envelope envelope : envelopes) {
                    htmlWriter.write(envelope);
                }
            } catch (Throwable e) {
                // Workaround for https://github.com/mojohaus/exec-maven-plugin/issues/141
                e.printStackTrace();
                System.exit(1);
            }
        }
    }
}
