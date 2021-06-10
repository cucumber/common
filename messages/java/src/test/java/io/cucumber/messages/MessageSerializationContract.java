package io.cucumber.messages;

import io.cucumber.messages.types.Attachment;
import io.cucumber.messages.types.Envelope;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.GherkinDocument;
import io.cucumber.messages.types.Location;
import io.cucumber.messages.types.Source;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.assertEquals;

abstract class MessageSerializationContract {

    @Test
    void can_serialise_messages_over_a_stream() throws IOException {
        List<Envelope> outgoingMessages = new ArrayList<>();
        {
            Envelope envelope = new Envelope();
            envelope.setSource(new Source(null, "Feature: Hello", null));
            outgoingMessages.add(envelope);
        }
        {
            Envelope envelope = new Envelope();
            Attachment attachment = new Attachment();
            attachment.setBody("the body");
            envelope.setAttachment(attachment);
            outgoingMessages.add(envelope);
        }

        assertRoundtrip(outgoingMessages);
    }

    @Test
    void writes_empty_arrays_and_empty_strings() throws IOException {
        List<Envelope> outgoingMessages = new ArrayList<>();
        {
            Envelope envelope = new Envelope();
            envelope.setGherkinDocument(
                    new GherkinDocument(
                            "hello.feature",
                            new Feature(
                                    new Location(),
                                    emptyList(),
                                    "en",
                                    null,
                                    null,
                                    "",
                                    emptyList()
                            ),
                            emptyList()
                    )
            );
            outgoingMessages.add(envelope);
        }
        assertRoundtrip(outgoingMessages);
    }

    private void assertRoundtrip(List<Envelope> outgoingMessages) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        MessageWriter messageWriter = makeMessageWriter(output);
        writeOutgoingMessages(outgoingMessages, messageWriter);

        InputStream input = new ByteArrayInputStream(output.toByteArray());
        Iterable<Envelope> incomingMessages = makeMessageIterable(input);

        assertEquals(outgoingMessages, toList(incomingMessages));
    }

    protected abstract MessageWriter makeMessageWriter(OutputStream output);

    protected abstract Iterable<Envelope> makeMessageIterable(InputStream input);

    private void writeOutgoingMessages(List<Envelope> messages, MessageWriter messageWriter)
            throws IOException {
        for (Envelope writtenMessage : messages) {
            messageWriter.write(writtenMessage);
        }
    }

    private static <T> List<T> toList(Iterable<T> iterable) {
        List<T> result = new ArrayList<>();
        for (T item : iterable) {
            result.add(item);
        }
        return result;
    }

}
