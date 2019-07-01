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
    private Process process;
    private File stderrFile;
    private File file;

    public Exe(ExeFile exeFile) {
        this.exeFile = exeFile;
    }

    /**
     * Executes the executable.
     *
     * @param args  command line arguments
     * @param stdin stream to write to the executable's STDIN
     * @return the STDOUT of the executable
     * @throws IOException if stream processing failed
     */
    public InputStream execute(List<String> args, InputStream stdin) throws IOException {
        file = exeFile.extract();
        List<String> allArgs = new ArrayList<>();
        allArgs.add(file.getAbsolutePath());
        allArgs.addAll(args);

        ProcessBuilder processBuilder = new ProcessBuilder().command(allArgs);
        stderrFile = File.createTempFile("stderr-", ".log");
        stderrFile.deleteOnExit();
        processBuilder.redirectError(stderrFile);
        process = processBuilder.start();
        if (stdin != null) {
            OutputStream processStdin = process.getOutputStream();
            copy(stdin, processStdin);
            processStdin.flush();
            processStdin.close();
        }
        return process.getInputStream();
    }

    /**
     * Waits for the executable to finish.
     *
     * @throws IOException          if execution failed
     * @throws InterruptedException if execution failed
     */
    public void waitFor() throws InterruptedException, IOException {
        process.waitFor();
        if (process.exitValue() != 0) {
            byte[] stderr = Files.readAllBytes(stderrFile.toPath());
            throw new ExeException(String.format("Error executing %s.\nSTDERR:%s",
                    file.getAbsolutePath(),
                    new String(stderr, StandardCharsets.UTF_8)));
        }
    }
}
