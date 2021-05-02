package io.cucumber.htmlformatter;

import io.cucumber.messages.NdjsonToMessageIterable;
import io.cucumber.messages.types.Envelope;

import java.io.OutputStreamWriter;

import static java.nio.charset.StandardCharsets.UTF_8;

public class Main {
    public static void main(String[] args) {
        OutputStreamWriter writer = new OutputStreamWriter(System.out, UTF_8);
        NdjsonToMessageIterable envelopes = new NdjsonToMessageIterable(System.in);
        try (MessagesToHtmlWriter htmlWriter = new MessagesToHtmlWriter(writer)) {
            for (Envelope envelope : envelopes) {
                htmlWriter.write(envelope);
            }
        } catch (Throwable e) {
            // Workaround for https://github.com/mojohaus/exec-maven-plugin/issues/141
            e.printStackTrace();
            System.exit(1);
        }
    }
}
