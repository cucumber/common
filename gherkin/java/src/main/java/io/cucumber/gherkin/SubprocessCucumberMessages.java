package io.cucumber.gherkin;

import io.cucumber.messages.Messages.Wrapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Spawns a subprocess and reads messages from that process' STDOUT (as Protobuf messages)
 */
public class SubprocessCucumberMessages implements CucumberMessages {
    private final List<String> paths;
    private final boolean includeSource;
    private final boolean includeAst;
    private final boolean includePickles;

    public SubprocessCucumberMessages(List<String> paths, boolean includeSource, boolean includeAst, boolean includePickles) {
        this.paths = paths;
        this.includeSource = includeSource;
        this.includeAst = includeAst;
        this.includePickles = includePickles;
    }

    @Override
    public List<Wrapper> messages() {
        GherkinExe gherkin = new GherkinExe();
        try {
            List<String> args = new ArrayList<>();
            if (!includeSource) args.add("--no-source");
            if (!includeAst) args.add("--no-ast");
            if (!includePickles) args.add("--no-pickles");
            args.addAll(paths);
            InputStream gherkinStdout = gherkin.execute(args);
            return new ProtobufCucumberMessages(gherkinStdout).messages();
        } catch (IOException | InterruptedException e) {
            throw new GherkinException(e);
        }
    }
}
