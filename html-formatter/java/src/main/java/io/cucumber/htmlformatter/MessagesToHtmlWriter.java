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
 * Writes the message output of a test run as single page html report.
 */
public class MessagesToHtmlWriter implements AutoCloseable {

    private final JsonFormat.Printer jsonPrinter = JsonFormat
            .printer()
            .omittingInsignificantWhitespace();
    private final String template;

    private Writer writer;
    private boolean preMessageWritten = false;
    private boolean postMessageWritten = false;
    private boolean firstMessageWritten = false;

    public MessagesToHtmlWriter(Writer writer) throws IOException {
        this.writer = writer;
        this.template = readResource("index.mustache.html");
    }

    private void writePreMessage() throws IOException {
        writeTemplateBetween(writer, template, null, "{{css}}");
        writeResource(writer, "cucumber-react.css");
        writeTemplateBetween(writer, template, "{{css}}", "{{messages}}");
    }

    private void writePostMessage() throws IOException {
        writeTemplateBetween(writer, template, "{{messages}}", "{{script}}");
        writeResource(writer, "cucumber-html.js");
        writeTemplateBetween(writer, template, "{{script}}", null);
    }

    /**
     * Writes a cucumber message to the html output.
     *
     * @param envelope the message
     * @throws IOException if an IO error occurs
     */
    public void write(Messages.Envelope envelope) throws IOException {
        if (postMessageWritten) {
            throw new IOException("Stream closed");
        }

        if (!preMessageWritten) {
            writePreMessage();
            preMessageWritten = true;
        }

        if (!firstMessageWritten) {
            firstMessageWritten = true;
        } else {
            writer.write(",");
        }

        writer.write(jsonPrinter.print(envelope));
    }

    /**
     * Closes the stream, flushing it first. Once closed further write()
     * invocations will cause an IOException to be thrown. Closing a closed
     * stream has no effect.
     *
     * @throws IOException if an IO error occurs
     */
    @Override
    public void close() throws IOException {
        if (postMessageWritten) {
            return;
        }

        if (!preMessageWritten) {
            writePreMessage();
            preMessageWritten = true;
        }

        writePostMessage();
        writer.close();
        postMessageWritten = true;
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
        char[] buffer = new char[1024];
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
