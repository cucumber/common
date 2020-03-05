package io.cucumber.htmlformatter;

import io.cucumber.messages.Messages;
import org.junit.jupiter.api.Test;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.List;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.MatcherAssert.assertThat;

class MessagesToHtmlWriterTest {

    @Test
    void it_writes_html_to_output() throws IOException {
        List<Messages.Envelope> messages = Arrays.asList(
                Messages.Envelope.newBuilder()
                        .setTestRunStarted(Messages.TestRunStarted.newBuilder()
                                .setTimestamp(Messages.Timestamp.newBuilder()
                                        .setSeconds(10)
                                        .build())
                                .build())
                        .build(),
                Messages.Envelope.newBuilder()
                        .setTestRunFinished(Messages.TestRunFinished.newBuilder()
                                .setTimestamp(Messages.Timestamp.newBuilder()
                                        .setSeconds(15)
                                        .build())
                                .build())
                        .build()
        );

        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        OutputStreamWriter osw = new OutputStreamWriter(bytes, UTF_8);
        BufferedWriter bw = new BufferedWriter(osw);
        try (MessagesToHtmlWriter messagesToHtmlWriter = new MessagesToHtmlWriter(bw)) {
            for (Messages.Envelope message : messages) {
                messagesToHtmlWriter.write(message);
            }
        }

        assertThat(new String(bytes.toByteArray(), UTF_8), containsString("" +
                "window.CUCUMBER_MESSAGES = [" +
                "{\"testRunStarted\":{\"timestamp\":{\"seconds\":\"10\"}}}," +
                "{\"testRunFinished\":{\"timestamp\":{\"seconds\":\"15\"}}}" +
                "];"));
    }
}
