package io.cucumber.htmlformatter;

import io.cucumber.messages.Messages;
import io.cucumber.messages.internal.com.google.protobuf.util.JsonFormat;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Objects.requireNonNull;

/**
 * Writes Cucumber messages to a single page html report.
 */
public class MessagesToHtmlWriter implements AutoCloseable {

    private static final int mebibytes = 1024 * 1024;
    private final Writer writer;

    private final JsonFormat.Printer jsonPrinter = JsonFormat
            .printer()
            .omittingInsignificantWhitespace();
    private final String template;

    private boolean preWritten = false;
    private boolean postWritten = false;
    private boolean firstMessageWritten = false;

    public MessagesToHtmlWriter(Writer writer) throws IOException {
        this.writer = writer;
        this.template = readResource("index.mustache.html");
    }

    private void writePreamble() throws IOException {
        writeTemplateBetween(writer, template, null, "{{css}}");
        writeResource(writer, "cucumber-react.css");
        writeTemplateBetween(writer, template, "{{css}}", "{{messages}}");
    }

    private void writePostAmble() throws IOException {
        writeTemplateBetween(writer, template, "{{messages}}", "{{script}}");
        writeResource(writer, "cucumber-html.js");
        writeTemplateBetween(writer, template, "{{script}}", null);
    }

    public void write(Messages.Envelope envelope) throws IOException {
        if(postWritten){
            return;
        }

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
        if (!preWritten) {
            writePreamble();
            preWritten = true;
        }

        if (!postWritten) {
            writePostAmble();
            postWritten = true;
        }
        writer.close();
    }

    private static void writeTemplateBetween(Writer writer, String template, String begin, String end) throws IOException {
        int beginIndex = begin == null ? 0 : template.indexOf(begin) + begin.length();
        int endIndex = end == null ? template.length() : template.indexOf(end);
        writer.write(template.substring(beginIndex, endIndex));
    }

    private static void writeResource(Writer writer, String name) throws IOException {
        InputStream resource = MessagesToHtmlWriter.class.getResourceAsStream(name);
        requireNonNull(resource, name + " could not be loaded");
        BufferedReader reader = new BufferedReader(new InputStreamReader(resource, UTF_8));
        char[] buffer = new char[2 * mebibytes];
        for (int read = reader.read(buffer); read != -1; read = reader.read(buffer)) {
            writer.write(buffer, 0, read);
        }
    }

    private static String readResource(String name) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(baos))) {
            writeResource(writer, name);
        }
        return new String(baos.toByteArray(), UTF_8);
    }
}
