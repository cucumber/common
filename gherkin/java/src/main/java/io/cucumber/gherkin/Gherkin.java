package io.cucumber.gherkin;

import io.cucumber.c21e.Exe;
import io.cucumber.c21e.ExeFile;
import io.cucumber.messages.Messages.Envelope;
import io.cucumber.messages.Messages.Source;
import io.cucumber.messages.ProtobufStreamIterable;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

/**
 * Main entry point for the Gherkin library
 */
public class Gherkin {
    private final List<String> paths;
    private final List<Source> sources;
    private final boolean includeSource;
    private final boolean includeAst;
    private final boolean includePickles;

    private Gherkin(List<String> paths, List<Source> sources, boolean includeSource, boolean includeAst, boolean includePickles) {
        this.paths = paths;
        this.sources = sources;
        this.includeSource = includeSource;
        this.includeAst = includeAst;
        this.includePickles = includePickles;
    }

    public static Iterable<Envelope> fromPaths(List<String> paths, boolean includeSource, boolean includeAst, boolean includePickles) {
        return new Gherkin(paths, null, includeSource, includeAst, includePickles).messages();
    }

    public static Iterable<Envelope> fromSources(List<Source> sources, boolean includeSource, boolean includeAst, boolean includePickles) {
        return new Gherkin(Collections.<String>emptyList(), sources, includeSource, includeAst, includePickles).messages();
    }

    public Iterable<Envelope> messages() {
        try {
            Exe exe = makeExe();
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
    }

    // Wraps the iterable in an adapter that will wait for the exe to exit when the stream has reach the end.
    private Iterable<Envelope> wrapIterable(final Iterable<Envelope> streamIterable, final Exe exe) {
        return new Iterable<Envelope>() {
            @Override
            public Iterator<Envelope> iterator() {
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
            }
        };
    }

    public static Exe makeExe() {
        return new Exe(new ExeFile(new File("executables"), "gherkin-{{.OS}}-{{.Arch}}{{.Ext}}"));
    }

    private InputStream getSourcesStream() throws IOException {
        if (sources == null) return null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        for (Source source : sources) {
            Envelope.newBuilder().setSource(source).build().writeDelimitedTo(baos);
        }
        return new ByteArrayInputStream(baos.toByteArray());
    }
}
