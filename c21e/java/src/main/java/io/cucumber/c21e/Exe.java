package io.cucumber.c21e;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import static io.cucumber.c21e.IO.copy;

public class Exe {
    private final ExeFile exeFile;

    public Exe(ExeFile exeFile) {
        this.exeFile = exeFile;
    }

    /**
     * Executes the executable.
     *
     * @param args  command line arguments
     * @param stdin stream to write to the executable's STDIN
     * @return the STDOUT of the executable
     * @throws IOException          if execution failed
     * @throws InterruptedException if execution failed
     */
    public InputStream execute(List<String> args, InputStream stdin) throws IOException, InterruptedException {
        File file = exeFile.extract();
        List<String> allArgs = new ArrayList<>();
        allArgs.add(file.getAbsolutePath());
        allArgs.addAll(args);

        ProcessBuilder processBuilder = new ProcessBuilder().command(allArgs);
        File stderrFile = File.createTempFile("stderr-", ".log");
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
            throw new ExeException(String.format("Error executing %s.\nSTDERR:%s",
                    file.getAbsolutePath(),
                    new String(stderr, StandardCharsets.UTF_8)));
        }
        return processStdout;
    }
}
