package io.cucumber.gherkin;

import io.cucumber.messages.IdGenerator;
import io.cucumber.messages.MessageToNdjsonWriter;
import io.cucumber.messages.MessageWriter;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.stream.Stream;

import static io.cucumber.messages.Messages.Envelope;
import static java.util.Arrays.asList;

public class Main {
    private static final BiConsumer<Writer, Envelope> SERIALIZER = (writer, envelope) -> {
        try {
            Jackson.OBJECT_MAPPER.writeValue(writer, envelope);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    };

    public static void main(String[] argv) {
        List<String> args = new ArrayList<>(asList(argv));
        List<String> paths = new ArrayList<>();

        boolean includeSource = true;
        boolean includeAst = true;
        boolean includePickles = true;
        IdGenerator idGenerator = null;

        while (!args.isEmpty()) {
            String arg = args.remove(0).trim();

            switch (arg) {
                case "--no-source":
                    includeSource = false;
                    break;
                case "--no-ast":
                    includeAst = false;
                    break;
                case "--no-pickles":
                    includePickles = false;
                    break;
                case "--predictable-ids":
                    idGenerator = new IdGenerator.Incrementing();
                    break;
                default:
                    paths.add(arg);
            }
        }

        if (idGenerator == null) {
            idGenerator = new IdGenerator.UUID();
        }

        MessageWriter<Envelope> messageWriter = makeMessageWriter();

        Stream<Envelope> messages = Gherkin.fromPaths(paths, includeSource, includeAst, includePickles, idGenerator);
        printMessages(messageWriter, messages);
    }

    private static void printMessages(MessageWriter<Envelope> messageWriter, Stream<Envelope> messages) {
        messages.forEach(envelope -> {
            try {
                messageWriter.write(envelope);
            } catch (IOException e) {
                throw new GherkinException("Couldn't print messages", e);
            }
        });
    }

    private static MessageWriter<Envelope> makeMessageWriter() {
        return new MessageToNdjsonWriter<>(System.out, SERIALIZER);
    }
}
