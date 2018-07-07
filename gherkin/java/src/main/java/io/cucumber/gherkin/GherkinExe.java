package io.cucumber.gherkin;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import static io.cucumber.gherkin.IO.copy;

class GherkinExe {
    private final ExeFile exeFile = new ExeFile("gherkin-{{.OS}}-{{.Arch}}{{.Ext}}");

    /**
     * Executes the gherkin binary command line program.
     *
     * @param args  command line options
     * @param stdin stream to write to the process' STDIN
     * @return the STDOUT of the executable
     * @throws IOException          if execution failed
     * @throws InterruptedException if execution failed
     */
    InputStream execute(List<String> args, InputStream stdin) throws IOException, InterruptedException {
        exeFile.extract();

        List<String> allArgs = new ArrayList<>();
        allArgs.add(exeFile.getFile().getAbsolutePath());
        allArgs.addAll(args);

        ProcessBuilder processBuilder = new ProcessBuilder().command(allArgs);
        File stderrFile = File.createTempFile("gherkin-stderr-", ".log");
        stderrFile.deleteOnExit();
        processBuilder.redirectError(stderrFile);
        Process process = processBuilder.start();
        if (stdin != null) {
            OutputStream processStdin = process.getOutputStream();
            copy(stdin, processStdin);
            processStdin.flush();
            processStdin.close();
        }
        InputStream processStdout = process.getInputStream();
        process.waitFor();
        if (process.exitValue() != 0) {
            byte[] stderr = Files.readAllBytes(stderrFile.toPath());
            throw new GherkinException(String.format("Error executing gherkin executable.\nSTDERR:%s",
                    new String(stderr, "UTF-8")));
        }
        return processStdout;
    }
}
