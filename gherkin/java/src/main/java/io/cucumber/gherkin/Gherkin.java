package io.cucumber.gherkin;

import io.cucumber.gherkin.pickles.PickleCompiler;
import io.cucumber.messages.IdGenerator;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Stream;

import static java.util.Collections.emptyList;
import static io.cucumber.messages.Messages.*;

/**
 * Main entry point for the Gherkin library
 */
public class Gherkin {
    private final List<String> paths;
    private final List<Envelope> envelopes;
    private final boolean includeSource;
    private final boolean includeAst;
    private final boolean includePickles;
    private final IdGenerator idGenerator;

    private Gherkin(List<String> paths, List<Envelope> envelopes, boolean includeSource, boolean includeAst, boolean includePickles, IdGenerator idGenerator) {
        this.paths = paths;
        this.envelopes = envelopes;
        this.includeSource = includeSource;
        this.includeAst = includeAst;
        this.includePickles = includePickles;
        this.idGenerator = idGenerator;
    }

    public static Stream<Envelope> fromPaths(List<String> paths, boolean includeSource, boolean includeAst, boolean includePickles, IdGenerator idGenerator) {
        return new Gherkin(paths, null, includeSource, includeAst, includePickles, idGenerator).messages();
    }

    public static Stream<Envelope> fromSources(List<Envelope> envelopes, boolean includeSource, boolean includeAst, boolean includePickles, IdGenerator idGenerator) {
        return new Gherkin(Collections.emptyList(), envelopes, includeSource, includeAst, includePickles, idGenerator).messages();
    }

    public static Envelope makeSourceEnvelope(String data, String uri) {
        Envelope envelope = new Envelope();
        envelope.setSource(new Source(uri, data, SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN));
        return envelope;
    }

    public Stream<Envelope> messages() {
        Stream<Envelope> envelopeStream = envelopes != null ? envelopes.stream() : envelopeStreamFromPaths(paths);
        return envelopeStream
                .flatMap((Function<Envelope, Stream<Envelope>>) envelope -> parserMessageStream(envelope, includeSource, includeAst, includePickles));
    }

    private Stream<Envelope> envelopeStreamFromPaths(List<String> paths) {
        return paths.stream().map(this::envelopeFromPath);
    }

    private Envelope envelopeFromPath(String path) {
        try {
            String data = read(new InputStreamReader(new FileInputStream(path), StandardCharsets.UTF_8));
            return makeSourceEnvelope(data, path);
        } catch (IOException e) {
            throw new GherkinException(e.getMessage(), e);
        }
    }

    private static String read(Reader reader) throws IOException {
        final char[] buffer = new char[0x10000];
        StringBuilder sb = new StringBuilder();
        int read;
        do {
            read = reader.read(buffer, 0, buffer.length);
            if (read > 0) {
                sb.append(buffer, 0, read);
            }
        } while (read >= 0);
        return sb.toString();
    }

    private Stream<Envelope> parserMessageStream(Envelope envelope, boolean includeSource, boolean includeGherkinDocument, boolean includePickles) {
        List<Envelope> messages = new ArrayList<>();

        if (includeSource) {
            messages.add(envelope);
        }
        messages.addAll(parseSource(envelope, includeGherkinDocument, includePickles));
        return messages.stream();
    }

    private List<Envelope> parseSource(Envelope envelope, boolean includeGherkinDocument, boolean includePickles) {
        return envelope.getSource()
                .map(source -> parseSource(includeGherkinDocument, includePickles, source))
                .orElse(emptyList());
    }

    private List<Envelope> parseSource(boolean includeGherkinDocument, boolean includePickles, Source source) {
        List<Envelope> messages = new ArrayList<>();

        Parser<GherkinDocument> parser = new Parser<>(new GherkinDocumentBuilder(idGenerator));
        String uri = source.getUri();
        String data = source.getData();

        try {
            GherkinDocument gherkinDocument = null;

            if (includeGherkinDocument) {
                gherkinDocument = parser.parse(data);
                gherkinDocument.setUri(uri);
                Envelope gherkinDocumentEnvelope = new Envelope();
                gherkinDocumentEnvelope.setGherkinDocument(gherkinDocument);
                messages.add(gherkinDocumentEnvelope);
            }
            if (includePickles) {
                if (gherkinDocument == null) {
                    gherkinDocument = parser.parse(data);
                    gherkinDocument.setUri(uri);
                }
                PickleCompiler pickleCompiler = new PickleCompiler(idGenerator);
                List<Pickle> pickles = pickleCompiler.compile(gherkinDocument, uri);
                for (Pickle pickle : pickles) {
                    Envelope pickleEnvelope = new Envelope();
                    pickleEnvelope.setPickle(pickle);
                    messages.add(pickleEnvelope);
                }
            }
        } catch (ParserException.CompositeParserException e) {
            for (ParserException error : e.errors) {
                addParseError(messages, error, uri);
            }
        } catch (ParserException e) {
            addParseError(messages, e, uri);
        }

        return messages;
    }

    private void addParseError(List<Envelope> messages, ParserException e, String uri) {
        long line = e.location.getLine();
        long column = e.location.getColumn();
        ParseError parseError = new ParseError(
                new SourceReference(
                        uri,
                        null, null,
                        // We want 0 values not to be serialised, which is why we set them to null
                        // This is a legacy requirement brought over from old protobuf behaviour
                        new io.cucumber.messages.Messages.Location(
                                line,
                                column == 0 ? null : column
                        )
                ),
                e.getMessage()
        );
        Envelope envelope = new Envelope();
        envelope.setParseError(parseError);
        messages.add(envelope);
    }
}
