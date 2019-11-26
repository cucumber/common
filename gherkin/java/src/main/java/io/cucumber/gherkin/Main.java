package io.cucumber.gherkin;

import io.cucumber.messages.MessageWriter;
import io.cucumber.messages.Messages.Envelope;
import io.cucumber.messages.NdjsonMessageWriter;
import io.cucumber.messages.ProtobufMessageWriter;

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
        String format = "protobuf";
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
                case "--format":
                    format = args.remove(0).trim();
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

        MessageWriter messageWriter = makeMessageWriter(format);

        Stream<Envelope> messages = paths.isEmpty() ?
                Gherkin.fromStream(System.in) :
                Gherkin.fromPaths(paths, includeSource, includeAst, includePickles, idGenerator);
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

    private static MessageWriter makeMessageWriter(String format) {
        MessageWriter messageWriter;
        switch (format) {
            case "ndjson":
                messageWriter = new NdjsonMessageWriter(System.out);
                break;
            case "protobuf":
                messageWriter = new ProtobufMessageWriter(System.out);
                break;
            default:
                throw new Error(String.format("Unsupported format: %s", format));
        }
        return messageWriter;
    }
}
