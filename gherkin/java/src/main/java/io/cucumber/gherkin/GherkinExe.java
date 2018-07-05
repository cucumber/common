package io.cucumber.gherkin;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

public class GherkinExe {
    private final ExeFile exeFile = new ExeFile("gherkin-{{.OS}}-{{.Arch}}{{.Ext}}");

    /**
     * Executes the gherkin binary command line program.
     *
     * @param args command line options
     * @return the STDOUT of the gherkin command
     * @throws IOException          if execution failed
     * @throws InterruptedException if execution failed
     */
    public InputStream execute(List<String> args) throws IOException, InterruptedException {
        if (!exeFile.getExeFile().isFile())
            exeFile.resolveExeFile();

        List<String> allArgs = new ArrayList<>();
        allArgs.add(exeFile.getExeFile().getAbsolutePath());
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
            throw new GherkinException("Error executing gherkin executable:" + new String(bytes, "UTF-8"));
        }
        return gherkinStdout;
    }
}
