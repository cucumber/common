package io.cucumber.gherkin;

import io.cucumber.messages.types.Envelope;
import io.cucumber.messages.MessageToNdjsonWriter;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static io.cucumber.gherkin.Jackson.OBJECT_MAPPER;
import static java.util.Arrays.asList;

public class Main {

    public static void main(String[] argv) throws IOException {
        List<String> args = new ArrayList<>(asList(argv));
        List<Path> paths = new ArrayList<>();

        GherkinParser.Builder builder = GherkinParser.builder();

        while (!args.isEmpty()) {
            String arg = args.remove(0).trim();

            switch (arg) {
                case "--no-source":
                    builder.includeSource(false);
                    break;
                case "--no-ast":
                    builder.includeGherkinDocument(false);
                    break;
                case "--no-pickles":
                    builder.includePickles(false);
                    break;
                case "--predictable-ids":
                    builder.idGenerator(new IncrementingIdGenerator());
                    break;
                default:
                    paths.add(Paths.get(arg));
            }
        }

        GherkinParser parser = builder.build();

        try (MessageToNdjsonWriter writer = new MessageToNdjsonWriter(System.out, OBJECT_MAPPER::writeValue)) {
            for (Path path : paths) {
                parser.parse(path)
                        .forEach(envelope -> printMessage(writer, envelope));
            }
        }
    }

    private static void printMessage(MessageToNdjsonWriter writer, Envelope envelope) {
        try {
            writer.write(envelope);
        } catch (IOException e) {
            throw new GherkinException("Couldn't print messages", e);
        }
    }

}
