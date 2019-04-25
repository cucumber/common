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
        List<Messages.Wrapper> outgoingMessages = createOutgoingMessages();

        ByteArrayOutputStream output = new ByteArrayOutputStream();
        writeOutgoingMessages(outgoingMessages, output);

        InputStream input = new ByteArrayInputStream(output.toByteArray());
        Iterable<Messages.Wrapper> incomingMessages = new ProtobufStreamIterable(input);

        assertEquals(outgoingMessages, toList(incomingMessages));
    }

    private List<Messages.Wrapper> createOutgoingMessages() {
        List<Messages.Wrapper> outgoingMessages = new ArrayList<>();
        outgoingMessages.add(Messages.Wrapper.newBuilder().setSource(Messages.Source.newBuilder().setData("Feature: Hello")).build());
        outgoingMessages.add(Messages.Wrapper.newBuilder().setAttachment(Messages.Attachment.newBuilder().setData("Some stack trace")).build());
        return outgoingMessages;
    }

    private void writeOutgoingMessages(List<Messages.Wrapper> messages, OutputStream output) throws IOException {
        for (Messages.Wrapper writtenMessage : messages) {
            writtenMessage.writeDelimitedTo(output);
        }
    }

    private static <T> List<T> toList(Iterable<T> iterable) {
        List<T> result = new ArrayList<>();
        iterable.iterator().forEachRemaining(result::add);
        return result;
    }
}
