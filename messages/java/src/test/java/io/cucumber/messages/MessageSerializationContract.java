package io.cucumber.messages;

import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import static io.cucumber.messages.Messages.*;
import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.assertEquals;

abstract class MessageSerializationContract {

    @Test
    void can_serialise_messages_over_a_stream() throws IOException {
        List<Envelope> outgoingMessages = new ArrayList<>();
        {
            Envelope envelope = Envelope.fromSource(new Source("hello.feature", "Feature: Hello", SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN));
            outgoingMessages.add(envelope);
        }
        {
            Envelope envelope = Envelope.fromAttachment(
                    new Attachment(
                            "the body",
                            AttachmentContentEncoding.IDENTITY,
                            null,
                            "text/plain",
                            null,
                            null,
                            null,
                            null
                    )
            );
            outgoingMessages.add(envelope);
        }

        assertRoundtrip(outgoingMessages);
    }

    @Test
    void writes_empty_arrays_and_empty_strings() throws IOException {
        List<Envelope> outgoingMessages = new ArrayList<>();
        {
            Envelope envelope = Envelope.fromGherkinDocument(
                    new GherkinDocument(
                            "hello.feature",
                            new Feature(
                                    new Location(1L, 1L),
                                    emptyList(),
                                    "en",
                                    "Given ",
                                    "Hello",
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
