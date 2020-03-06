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
    void it_writes_one_message_to_html() throws IOException {
        String html = renderAsHtml(Arrays.asList(
                Messages.Envelope.newBuilder()
                        .setTestRunStarted(Messages.TestRunStarted.newBuilder()
                                .setTimestamp(Messages.Timestamp.newBuilder()
                                        .setSeconds(10)
                                        .build())
                                .build())
                        .build()
        ));
        assertThat(html, containsString("" +
                "window.CUCUMBER_MESSAGES = [" +
                "{\"testRunStarted\":{\"timestamp\":{\"seconds\":\"10\"}}}" +
                "];"));
    }

    @Test
    void it_writes_two_messages_separated_by_a_comma() throws IOException {
        String html = renderAsHtml(Arrays.asList(
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
        ));
        assertThat(html, containsString("" +
                "window.CUCUMBER_MESSAGES = [" +
                "{\"testRunStarted\":{\"timestamp\":{\"seconds\":\"10\"}}}," +
                "{\"testRunFinished\":{\"timestamp\":{\"seconds\":\"15\"}}}" +
                "];"));
    }

    private String renderAsHtml(List<Messages.Envelope> messages) throws IOException {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        OutputStreamWriter osw = new OutputStreamWriter(bytes, UTF_8);
        BufferedWriter bw = new BufferedWriter(osw);
        try (MessagesToHtmlWriter messagesToHtmlWriter = new MessagesToHtmlWriter(bw)) {
            for (Messages.Envelope message : messages) {
                messagesToHtmlWriter.write(message);
            }
        }

        return new String(bytes.toByteArray(), UTF_8);
    }
}
