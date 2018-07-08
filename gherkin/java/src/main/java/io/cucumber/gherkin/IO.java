package io.cucumber.gherkin;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.Charset;

public class IO {
    /**
     * UTF-8 STDOUT
     */
    static final PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out, Charset.forName("UTF-8")), true);

    /**
     * UTF-8 STDERR
     */
    public static final PrintWriter err = new PrintWriter(new OutputStreamWriter(System.err, Charset.forName("UTF-8")), true);

    public static int copy(InputStream in, OutputStream out) throws IOException {
        int total = 0;
        int read;
        byte[] buf = new byte[4096];
        while ((read = in.read(buf)) > 0) {
            total += read;
            out.write(buf, 0, read);
        }
        return total;
    }
}
