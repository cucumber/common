package io.cucumber.gherkin;

import io.cucumber.c21e.Exe;
import io.cucumber.c21e.ExeFile;
import io.cucumber.messages.Messages.Source;
import io.cucumber.messages.Messages.Wrapper;
import io.cucumber.messages.ProtobufStreamIterable;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
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

    public static Iterable<Wrapper> fromPaths(List<String> paths, boolean includeSource, boolean includeAst, boolean includePickles) {
        return new Gherkin(paths, null, includeSource, includeAst, includePickles).messages();
    }

    public static Iterable<Wrapper> fromSources(List<Source> sources, boolean includeSource, boolean includeAst, boolean includePickles) {
        return new Gherkin(Collections.<String>emptyList(), sources, includeSource, includeAst, includePickles).messages();
    }

    public Iterable<Wrapper> messages() {
        try {
            Exe exe = makeExe();
            List<String> args = new ArrayList<>();
            if (!includeSource) args.add("--no-source");
            if (!includeAst) args.add("--no-ast");
            if (!includePickles) args.add("--no-pickles");
            args.addAll(paths);
            InputStream gherkinStdout = exe.execute(args, getSourcesStream());
            return new ProtobufStreamIterable(gherkinStdout);
        } catch (IOException e) {
            throw new GherkinException("Couldn't execute gherkin", e);
        }
    }

    public static Exe makeExe() {
        return new Exe(new ExeFile(new File("gherkin-go"), "gherkin-go-{{.OS}}-{{.Arch}}{{.Ext}}"));
    }

    private InputStream getSourcesStream() throws IOException {
        if (sources == null) return null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        for (Source source : sources) {
            Wrapper.newBuilder().setSource(source).build().writeDelimitedTo(baos);
        }
        return new ByteArrayInputStream(baos.toByteArray());
    }
}
