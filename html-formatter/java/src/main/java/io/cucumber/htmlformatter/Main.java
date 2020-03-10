package io.cucumber.htmlformatter;

import io.cucumber.messages.Messages;
import io.cucumber.messages.NdjsonToMessageIterable;

import java.io.IOException;
import java.io.OutputStreamWriter;

import static java.nio.charset.StandardCharsets.UTF_8;

public class Main {
    public static void main(String[] args) throws IOException {
        OutputStreamWriter writer = new OutputStreamWriter(System.out, UTF_8);
        NdjsonToMessageIterable envelopes = new NdjsonToMessageIterable(System.in);
        try (MessagesToHtmlWriter htmlWriter = new MessagesToHtmlWriter(writer)) {
            for (Messages.Envelope envelope : envelopes) {
                htmlWriter.write(envelope);
            }
        }
    }
}
