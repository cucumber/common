package io.cucumber.htmlformatter;

import io.cucumber.messages.Messages;
import io.cucumber.messages.Messages.Envelope;
import io.cucumber.messages.Messages.TestRunFinished;
import io.cucumber.messages.Messages.TestRunStarted;
import io.cucumber.messages.Messages.Timestamp;
import org.junit.jupiter.api.Test;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.MatcherAssert.assertThat;

class MessagesToHtmlWriterTest {

    @Test
    void it_writes_one_message_to_html() throws IOException {
        String html = renderAsHtml(
                Envelope.newBuilder()
                        .setTestRunStarted(TestRunStarted.newBuilder()
                                .setTimestamp(Timestamp.newBuilder()
                                        .setSeconds(10)
                                        .build())
                                .build())
                        .build()
        );
        assertThat(html, containsString("" +
                "window.CUCUMBER_MESSAGES = [" +
                "{\"testRunStarted\":{\"timestamp\":{\"seconds\":\"10\"}}}" +
                "];"));
    }
    @Test
    void it_writes_no_message_to_html() throws IOException {
        String html = renderAsHtml();
        assertThat(html, containsString("window.CUCUMBER_MESSAGES = [];"));
    }

    @Test
    void it_writes_two_messages_separated_by_a_comma() throws IOException {
        String html = renderAsHtml(
                Envelope.newBuilder()
                        .setTestRunStarted(TestRunStarted.newBuilder()
                                .setTimestamp(Timestamp.newBuilder()
                                        .setSeconds(10)
                                        .build())
                                .build())
                        .build(),
                Envelope.newBuilder()
                        .setTestRunFinished(TestRunFinished.newBuilder()
                                .setTimestamp(Timestamp.newBuilder()
                                        .setSeconds(15)
                                        .build())
                                .build())
                        .build()
        );
        assertThat(html, containsString("" +
                "window.CUCUMBER_MESSAGES = [" +
                "{\"testRunStarted\":{\"timestamp\":{\"seconds\":\"10\"}}}," +
                "{\"testRunFinished\":{\"timestamp\":{\"seconds\":\"15\"}}}" +
                "];"));
    }

    private static String renderAsHtml(Envelope... messages) throws IOException {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        OutputStreamWriter osw = new OutputStreamWriter(bytes, UTF_8);
        BufferedWriter bw = new BufferedWriter(osw);
        try (MessagesToHtmlWriter messagesToHtmlWriter = new MessagesToHtmlWriter(bw)) {
            for (Envelope message : messages) {
                messagesToHtmlWriter.write(message);
            }
        }

        return new String(bytes.toByteArray(), UTF_8);
    }
}
