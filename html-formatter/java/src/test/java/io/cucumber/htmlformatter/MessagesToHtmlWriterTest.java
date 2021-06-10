package io.cucumber.htmlformatter;

import io.cucumber.messages.TimeConversion;
import io.cucumber.messages.types.Envelope;
import io.cucumber.messages.types.TestRunFinished;
import io.cucumber.messages.types.TestRunStarted;
import org.junit.jupiter.api.Test;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.time.Instant;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

class MessagesToHtmlWriterTest {

    @Test
    void it_writes_one_message_to_html() throws IOException {
        Envelope envelope = new Envelope();
        Instant timestamp = Instant.ofEpochSecond(10);
        envelope.setTestRunStarted(new TestRunStarted(TimeConversion.javaInstantToTimestamp(timestamp)));
        String html = renderAsHtml(envelope);
        assertThat(html, containsString("" +
                "window.CUCUMBER_MESSAGES = [{\"testRunStarted\":{\"timestamp\":{\"seconds\":10,\"nanos\":0}}}];"));
    }

    @Test
    void it_writes_no_message_to_html() throws IOException {
        String html = renderAsHtml();
        assertThat(html, containsString("window.CUCUMBER_MESSAGES = [];"));
    }


    @Test
    void it_throws_when_writing_after_close() throws IOException {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        OutputStreamWriter osw = new OutputStreamWriter(bytes, UTF_8);
        BufferedWriter bw = new BufferedWriter(osw);
        MessagesToHtmlWriter messagesToHtmlWriter = new MessagesToHtmlWriter(bw);
        messagesToHtmlWriter.close();
        assertThrows(IOException.class, () -> messagesToHtmlWriter.write(null));
    }

    @Test
    void it_can_be_closed_twice() throws IOException {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        OutputStreamWriter osw = new OutputStreamWriter(bytes, UTF_8);
        BufferedWriter bw = new BufferedWriter(osw);
        MessagesToHtmlWriter messagesToHtmlWriter = new MessagesToHtmlWriter(bw);
        messagesToHtmlWriter.close();
        assertDoesNotThrow(messagesToHtmlWriter::close);
    }

    @Test
    void it_is_idempotent_under_failure_to_close() throws IOException {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        OutputStreamWriter osw = new OutputStreamWriter(bytes, UTF_8);
        BufferedWriter bw = new BufferedWriter(osw) {

            @Override
            public void close() throws IOException {
                throw new IOException("Can't close this");
            }
        };
        MessagesToHtmlWriter messagesToHtmlWriter = new MessagesToHtmlWriter(bw);
        assertThrows(IOException.class, messagesToHtmlWriter::close);
        byte[] before = bytes.toByteArray();
        assertThrows(IOException.class, messagesToHtmlWriter::close);
        byte[] after = bytes.toByteArray();
        assertArrayEquals(before, after);
    }

    @Test
    void it_writes_two_messages_separated_by_a_comma() throws IOException {
        Envelope testRunStarted = new Envelope();
        testRunStarted.setTestRunStarted(new TestRunStarted(TimeConversion.javaInstantToTimestamp(Instant.ofEpochSecond(10))));

        Envelope testRunFinished = new Envelope();
        testRunFinished.setTestRunFinished(new TestRunFinished(null, true, TimeConversion.javaInstantToTimestamp(Instant.ofEpochSecond(15))));

        String html = renderAsHtml(testRunStarted, testRunFinished);

        assertThat(html, containsString("" +
                "window.CUCUMBER_MESSAGES = [{\"testRunStarted\":{\"timestamp\":{\"seconds\":10,\"nanos\":0}}},{\"testRunFinished\":{\"success\":true,\"timestamp\":{\"seconds\":15,\"nanos\":0}}}];"));
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
