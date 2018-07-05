package io.cucumber.gherkin;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.Charset;

class IO {
    /**
     * UTF-8 STDOUT
     */
    public static final PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out, Charset.forName("UTF-8")), true);

    /**
     * UTF-8 STDERR
     */
    public static final PrintWriter err = new PrintWriter(new OutputStreamWriter(System.err, Charset.forName("UTF-8")), true);

    public static void copy(InputStream in, OutputStream out) throws IOException {
        int read = 0;
        byte[] buf = new byte[4096];
        while ((read = in.read(buf)) > 0) out.write(buf, 0, read);
    }
}
