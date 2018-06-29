package gherkin.messages;

import gherkin.GherkinException;
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
    private final String cucumberExecutable;
    private final List<String> paths;
    private final boolean printSource;
    private final boolean printAst;
    private final boolean printPickles;

    public SubprocessCucumberMessages(String gherkinExecutable, List<String> paths, boolean printSource, boolean printAst, boolean printPickles) {
        this.cucumberExecutable = gherkinExecutable;
        this.paths = paths;
        this.printSource = printSource;
        this.printAst = printAst;
        this.printPickles = printPickles;
    }

    @Override
    public List<Wrapper> messages() {
        try {
            List<String> args = new ArrayList<>();
            args.add(cucumberExecutable);
            args.add("--protobuf");
            if(!printSource) args.add("--no-source");
            if(!printAst) args.add("--no-ast");
            if(!printPickles) args.add("--no-pickles");
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
