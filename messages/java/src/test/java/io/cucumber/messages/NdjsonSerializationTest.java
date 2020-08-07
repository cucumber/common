package io.cucumber.messages;

import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class NdjsonSerializationTest extends MessageSerializationContract {
    @Override
    protected MessageWriter makeMessageWriter(OutputStream output) {
        return new MessageToNdjsonWriter(output);
    }

    @Override
    protected Iterable<Messages.Envelope> makeMessageIterable(InputStream input) {
        return new NdjsonToMessageIterable(input);
    }

    @Test
    void ignores_missing_fields() {
        InputStream input = new ByteArrayInputStream("{\"unused\": 99}\n".getBytes(UTF_8));
        Iterable<Messages.Envelope> incomingMessages = makeMessageIterable(input);
        Iterator<Messages.Envelope> iterator = incomingMessages.iterator();
        assertTrue(iterator.hasNext());
        Messages.Envelope envelope = iterator.next();
        assertEquals(Messages.Envelope.newBuilder().build(), envelope);
        assertFalse(iterator.hasNext());
    }

}
