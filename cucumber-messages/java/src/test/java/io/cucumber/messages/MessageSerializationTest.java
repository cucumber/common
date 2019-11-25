package io.cucumber.messages;

import org.junit.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class MessageSerializationTest {
    @Test
    public void can_serialise_messages_over_a_stream() throws IOException {
        List<Messages.Envelope> outgoingMessages = createOutgoingMessages();

        ByteArrayOutputStream output = new ByteArrayOutputStream();
        writeOutgoingMessages(outgoingMessages, output);

        InputStream input = new ByteArrayInputStream(output.toByteArray());
        Iterable<Messages.Envelope> incomingMessages = new BinaryToMessageIterable(input);

        assertEquals(outgoingMessages, toList(incomingMessages));
    }

    private List<Messages.Envelope> createOutgoingMessages() {
        List<Messages.Envelope> outgoingMessages = new ArrayList<>();
        outgoingMessages.add(Messages.Envelope.newBuilder().setSource(Messages.Source.newBuilder().setData("Feature: Hello")).build());
        outgoingMessages.add(Messages.Envelope.newBuilder().setAttachment(Messages.Attachment.newBuilder().setData("Some stack trace")).build());
        return outgoingMessages;
    }

    private void writeOutgoingMessages(List<Messages.Envelope> messages, OutputStream output) throws IOException {
        for (Messages.Envelope writtenMessage : messages) {
            writtenMessage.writeDelimitedTo(output);
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
