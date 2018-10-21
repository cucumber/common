package io.cucumber.c21e;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class IO {
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
