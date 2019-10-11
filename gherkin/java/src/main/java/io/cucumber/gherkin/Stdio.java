package io.cucumber.gherkin;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class Stdio {
    /**
     * UTF-8 STDOUT
     */
    public static final PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out, StandardCharsets.UTF_8), true);

    /**
     * UTF-8 STDERR
     */
    public static final PrintWriter err = new PrintWriter(new OutputStreamWriter(System.err, StandardCharsets.UTF_8), true);
}
