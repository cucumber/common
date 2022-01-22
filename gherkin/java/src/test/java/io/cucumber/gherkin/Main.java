package io.cucumber.gherkin;

import io.cucumber.messages.IdGenerator;
import io.cucumber.messages.MessageToNdjsonWriter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static io.cucumber.gherkin.Jackson.OBJECT_MAPPER;
import static io.cucumber.messages.Messages.Envelope;
import static java.util.Arrays.asList;

public class Main {

    public static void main(String[] argv) throws IOException {
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

        Stream<Envelope> messages = Gherkin.fromPaths(paths, includeSource, includeAst, includePickles, idGenerator);
        try (MessageToNdjsonWriter writer = new MessageToNdjsonWriter(System.out, OBJECT_MAPPER::writeValue)) {
            messages.forEach(envelope -> printMessages(writer, envelope));
        }
    }

    private static void printMessages(MessageToNdjsonWriter writer, Envelope envelope) {
        try {
            writer.write(envelope);
        } catch (IOException e) {
            throw new GherkinException("Couldn't print messages", e);
        }
    }

}
