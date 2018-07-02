package io.cucumber.gherkin;

import io.cucumber.messages.Messages.Wrapper;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
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
        MagicFile magicFile = new MagicFile("gherkin-go/gherkin-{{.OS}}-{{.Arch}}");
        magicFile.extract();

        try {
            List<String> args = new ArrayList<>();
            args.add(magicFile.getTargetFile().getAbsolutePath());
            if (!includeSource) args.add("--no-source");
            if (!includeAst) args.add("--no-ast");
            if (!includePickles) args.add("--no-pickles");
            args.addAll(paths);
            ProcessBuilder processBuilder = new ProcessBuilder().command(args);
            File stderrFile = File.createTempFile("gherkin-stderr-", ".log");
            stderrFile.deleteOnExit();
            processBuilder.redirectError(stderrFile);
            Process gherkin = processBuilder.start();
            InputStream gherkinStdout = gherkin.getInputStream();
            int exit = gherkin.waitFor();
            if (exit != 0) {
                byte[] bytes = Files.readAllBytes(stderrFile.toPath());
                throw new GherkinException("Failed to parse Gherkin:" + new String(bytes, "UTF-8"));
            }
            return new ProtobufCucumberMessages(gherkinStdout).messages();
        } catch (IOException | InterruptedException e) {
            throw new GherkinException(e);
        }
    }
}
