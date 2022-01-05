package io.cucumber.gherkin;

import io.cucumber.messages.IdGenerator;
import io.cucumber.messages.MessageToNdjsonWriter;
import io.cucumber.messages.MessageWriter;
import io.cucumber.messages.types.Envelope;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static java.util.Arrays.asList;

public class Main {

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

        MessageWriter messageWriter = makeMessageWriter();

        Stream<Envelope> messages = Gherkin.fromPaths(paths, includeSource, includeAst, includePickles, idGenerator);
        printMessages(messageWriter, messages);
    }

    private static void printMessages(MessageWriter messageWriter, Stream<Envelope> messages) {
        messages.forEach(envelope -> {
            try {
                messageWriter.write(envelope);
            } catch (IOException e) {
                throw new GherkinException("Couldn't print messages", e);
            }
        });
    }

    private static MessageWriter makeMessageWriter() {
        return new MessageToNdjsonWriter(System.out);
    }
}
