package io.cucumber.gherkin;

import io.cucumber.gherkin.pickles.PickleCompiler;
import io.cucumber.messages.BinaryToMessageIterable;
import io.cucumber.messages.IdGenerator;
import io.cucumber.messages.Messages;
import io.cucumber.messages.Messages.Envelope;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

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
        return new Gherkin(Collections.<String>emptyList(), envelopes, includeSource, includeAst, includePickles, idGenerator).messages();
    }

    public static Stream<Envelope> fromStream(InputStream in) {
        BinaryToMessageIterable envelopeIterable = new BinaryToMessageIterable(in);
        return StreamSupport.stream(envelopeIterable.spliterator(), false);
    }

    public static Envelope makeSourceEnvelope(String data, String uri) {
        return Envelope.newBuilder().setSource(Messages.Source
                .newBuilder()
                .setData(data)
                .setUri(uri)
                .setMediaType("text/x.cucumber.gherkin+plain")
        ).build();
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
        if (envelope.hasSource()) {

            Parser<Messages.GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder(idGenerator));
            Messages.Source source = envelope.getSource();
            String uri = source.getUri();
            String data = source.getData();

            try {
                Messages.GherkinDocument gherkinDocument = null;

                if (includeGherkinDocument) {
                    gherkinDocument = parser.parse(data).setUri(uri).build();
                    messages.add(Envelope.newBuilder().setGherkinDocument(gherkinDocument).build());
                }
                if (includePickles) {
                    if (gherkinDocument == null) {
                        gherkinDocument = parser.parse(data).setUri(uri).build();
                    }
                    PickleCompiler pickleCompiler = new PickleCompiler(idGenerator);
                    List<Messages.Pickle> pickles = pickleCompiler.compile(gherkinDocument, uri);
                    for (Messages.Pickle pickle : pickles) {
                        messages.add(Envelope.newBuilder().setPickle(pickle).build());
                    }
                }
            } catch (ParserException.CompositeParserException e) {
                for (ParserException error : e.errors) {
                    addErrorAttachment(messages, error, uri);
                }
            } catch (ParserException e) {
                addErrorAttachment(messages, e, uri);
            }
        }
        return messages.stream();
    }

    private void addErrorAttachment(List<Envelope> messages, ParserException e, String uri) {
        Messages.Attachment attachment = Messages.Attachment.newBuilder()
                // TODO: Set media here?
                .setSource(Messages.SourceReference.newBuilder()
                        .setUri(uri)
                        .setLocation(
                                Messages.Location.newBuilder()
                                        .setLine(e.location.getLine())
                                        .setColumn(e.location.getColumn())
                                        .build()
                        )
                        .build())
                .setText(e.getMessage())
                .build();
        messages.add(Envelope.newBuilder().setAttachment(attachment).build());
    }
}
