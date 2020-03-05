package io.cucumber.htmlformatter;

import io.cucumber.messages.Messages;
import io.cucumber.messages.internal.com.google.protobuf.util.JsonFormat;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Writer;

import static java.nio.charset.StandardCharsets.UTF_8;

public class MessagesToHtmlWriter implements AutoCloseable {

    private final Writer writer;

    private final JsonFormat.Printer jsonPrinter = JsonFormat
            .printer()
            .omittingInsignificantWhitespace();

    private boolean preWritten = false;
    private boolean postWritten = false;
    private boolean firstMessageWritten = false;

    public MessagesToHtmlWriter(Writer writer) {
        this.writer = writer;
    }

    private void writePreamble() throws IOException {
        writer.write("" +
                "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "  <head>\n" +
                "    <title>Cucumber</title>\n" +
                "    <meta content=\"text/html;charset=utf-8\" http-equiv=\"Content-Type\">\n" +
                "    <style>\n"
        );
        writeFile("cucumber-react.css");
        writer.write("" +
                "</style>\n" +
                "  </head>\n" +
                "  <body>\n" +
                "    <div id=\"content\">\n" +
                "    </div>\n" +
                "    <script>\n" +
                "      window.CUCUMBER_MESSAGES = ["
        );
    }

    private void writePostAmble() throws IOException {
        writer.write("];\n" +
                "    </script>\n" +
                "    <script>\n"
        );
        writeFile("cucumber-html.js");
        writer.write("" +
                "    </script>\n" +
                "  </body>\n" +
                "</html>"
        );
    }

    private void writeFile(String name) throws IOException {
        InputStream resource = MessagesToHtmlWriter.class.getResourceAsStream(name);
        BufferedReader reader = new BufferedReader(new InputStreamReader(resource, UTF_8));
        char[] buffer = new char[2 * 1024 * 1024];
        for (int read = reader.read(buffer); read != -1; read = reader.read(buffer)) {
            writer.write(buffer, 0, read);
        }
    }

    public void write(Messages.Envelope envelope) throws IOException {
        if (!preWritten) {
            writePreamble();
            preWritten = true;
        }
        if (!firstMessageWritten) {
            firstMessageWritten = true;
        } else {
            writer.write(",");
        }
        writer.write(jsonPrinter.print(envelope));
    }

    @Override
    public void close() throws IOException {
        if (!postWritten) {
            writePostAmble();
            postWritten = true;
        }
        writer.close();
    }

}
