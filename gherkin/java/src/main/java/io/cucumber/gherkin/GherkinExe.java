package io.cucumber.gherkin;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

public class GherkinExe {
    private final MagicFile magicFile = new MagicFile("gherkin-{{.OS}}-{{.Arch}}{{.Ext}}");

    public InputStream execute(List<String> args) throws IOException, InterruptedException {
        if (!magicFile.getTargetFile().isFile())
            magicFile.extract();

        List<String> allArgs = new ArrayList<>();
        allArgs.add(magicFile.getTargetFile().getAbsolutePath());
        allArgs.addAll(args);

        ProcessBuilder processBuilder = new ProcessBuilder().command(allArgs);
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
        return gherkinStdout;
    }
}
