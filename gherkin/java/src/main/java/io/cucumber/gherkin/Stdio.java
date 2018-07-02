package io.cucumber.gherkin;

import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.Charset;

/**
 * UTF-8 STDOUT and STDERR
 */
public class Stdio {
    public static final PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out, Charset.forName("UTF-8")), true);
    public static final PrintWriter err = new PrintWriter(new OutputStreamWriter(System.err, Charset.forName("UTF-8")), true);
}
