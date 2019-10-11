package io.cucumber.gherkin;

import io.cucumber.c21e.Exe;
import io.cucumber.c21e.ExeFile;
import io.cucumber.gherkin.pickles.PickleCompiler;
import io.cucumber.messages.Messages;
import io.cucumber.messages.Messages.Envelope;
import io.cucumber.messages.ProtobufStreamIterable;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Main entry point for the Gherkin library
 */
public class Gherkin {
    private final List<String> paths;
    private final List<Envelope> envelopes;
    private final boolean includeSource;
    private final boolean includeAst;
    private final boolean includePickles;

    private Gherkin(List<String> paths, List<Envelope> envelopes, boolean includeSource, boolean includeAst, boolean includePickles) {
        this.paths = paths;
        this.envelopes = envelopes;
        this.includeSource = includeSource;
        this.includeAst = includeAst;
        this.includePickles = includePickles;
    }

    public static Iterable<Envelope> fromPaths(List<String> paths, boolean includeSource, boolean includeAst, boolean includePickles) {
        return new Gherkin(paths, null, includeSource, includeAst, includePickles).messages();
    }

    public static Iterable<Envelope> fromSources(List<Envelope> envelopes, boolean includeSource, boolean includeAst, boolean includePickles) {
        return new Gherkin(Collections.<String>emptyList(), envelopes, includeSource, includeAst, includePickles).messages();
    }

    public static Iterable<Envelope> fromStream(InputStream in) {
        return new ProtobufStreamIterable(in);
    }

    public static Envelope makeSourceEnvelope(String data, String uri) {
        return Envelope.newBuilder().setSource(Messages.Source
                .newBuilder()
                .setData(data)
                .setUri(uri)
                .setMedia(Messages.Media.newBuilder()
                        .setEncoding(Messages.Media.Encoding.UTF8)
                        .setContentType("text/x.cucumber.gherkin+plain")
                )
        ).build();
    }

    // TODO: Return Stream<Envelope>
    public Iterable<Envelope> messages() {
        String executable = System.getenv("GHERKIN_EXECUTABLE");
        if (executable != null) {
            try {
                File file = new File(executable);
                ExeFile exeFile = new ExeFile(file.getParentFile(), file.getName());
                Exe exe = new Exe(exeFile);
                List<String> args = new ArrayList<>();
                if (!includeSource) args.add("--no-source");
                if (!includeAst) args.add("--no-ast");
                if (!includePickles) args.add("--no-pickles");
                args.addAll(paths);
                InputStream gherkinStdout = exe.execute(args, getSourcesStream());
                ProtobufStreamIterable streamIterable = new ProtobufStreamIterable(gherkinStdout);
                return wrapIterable(streamIterable, exe);
            } catch (IOException e) {
                throw new GherkinException("Couldn't execute gherkin", e);
            }
        } else {
            Stream<Envelope> envelopeStream = envelopes != null ? envelopes.stream() : envelopeStreamFromPaths(paths);
            return envelopeStream
                    .flatMap((Function<Envelope, Stream<Envelope>>) envelope -> parserMessageStream(envelope, includeSource, includeAst, includePickles))
                    .collect(Collectors.toList());
        }
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

            Parser<Messages.GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder());
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
                    PickleCompiler pickleCompiler = new PickleCompiler();
                    List<Messages.Pickle> pickles = pickleCompiler.compile(gherkinDocument, uri, data);
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
                .setData(e.getMessage())
                .build();
        messages.add(Envelope.newBuilder().setAttachment(attachment).build());
    }

    // Wraps the iterable in an adapter that will wait for the exe to exit when the stream has reach the end.
    private Iterable<Envelope> wrapIterable(final Iterable<Envelope> streamIterable, final Exe exe) {
        return () -> {
            final Iterator<Envelope> iterator = streamIterable.iterator();
            return new Iterator<Envelope>() {
                @Override
                public boolean hasNext() {
                    boolean hasNext = iterator.hasNext();
                    if (!hasNext) {
                        try {
                            exe.waitFor();
                        } catch (IOException | InterruptedException e) {
                            throw new GherkinException("Failed waiting for gherkin", e);
                        }
                    }
                    return hasNext;
                }

                @Override
                public Envelope next() {
                    return iterator.next();
                }

                @Override
                public void remove() {
                    throw new UnsupportedOperationException();
                }
            };
        };
    }

    private InputStream getSourcesStream() throws IOException {
        if (envelopes == null) return null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        for (Envelope envelope : envelopes) {
            envelope.writeDelimitedTo(baos);
        }
        return new ByteArrayInputStream(baos.toByteArray());
    }
}
