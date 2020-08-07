package io.cucumber.messages;

import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

abstract class MessageSerializationContract {

    @Test
    void can_serialise_messages_over_a_stream() throws IOException {
        List<Messages.Envelope> outgoingMessages = createOutgoingMessages();

        ByteArrayOutputStream output = new ByteArrayOutputStream();
        MessageWriter messageWriter = makeMessageWriter(output);
        writeOutgoingMessages(outgoingMessages, messageWriter);

        InputStream input = new ByteArrayInputStream(output.toByteArray());
        Iterable<Messages.Envelope> incomingMessages = makeMessageIterable(input);

        assertEquals(outgoingMessages, toList(incomingMessages));
    }

    protected abstract MessageWriter makeMessageWriter(OutputStream output);

    protected abstract Iterable<Messages.Envelope> makeMessageIterable(InputStream input);

    private List<Messages.Envelope> createOutgoingMessages() {
        List<Messages.Envelope> outgoingMessages = new ArrayList<>();
        outgoingMessages.add(Messages.Envelope.newBuilder()
                .setSource(Messages.Source.newBuilder()
                        .setData("Feature: Hello")).build());
        outgoingMessages.add(Messages.Envelope.newBuilder()
                .setAttachment(Messages.Attachment.newBuilder()
                        .setBody("the body")).build());
        return outgoingMessages;
    }

    private void writeOutgoingMessages(List<Messages.Envelope> messages, MessageWriter messageWriter)
            throws IOException {
        for (Messages.Envelope writtenMessage : messages) {
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
