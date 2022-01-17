package io.cucumber.messages;

import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;

import static io.cucumber.messages.Messages.*;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
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
    void writes_source_envelope() throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        MessageWriter writer = makeMessageWriter(output);
        writer.write(new Source("uri", "data", SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN));
        String json = new String(output.toByteArray(), StandardCharsets.UTF_8);
        assertEquals("{\"uri\":\"uri\",\"data\":\"data\",\"mediaType\":\"text/x.cucumber.gherkin+plain\"}\n", json);
    }

    @Test
    void does_not_serialize_null_fields() throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        OutputStreamWriter writer = new OutputStreamWriter(output);
        JSON.writeValue(writer, new Envelope(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        ));
        writer.flush();
        assertEquals("{}", new String(output.toByteArray(), UTF_8));
    }

    @Test
    void ignores_missing_fields() {
        InputStream input = new ByteArrayInputStream("{\"unused\": 99}\n".getBytes(UTF_8));
        Iterable<Envelope> incomingMessages = makeMessageIterable(input);
        Iterator<Envelope> iterator = incomingMessages.iterator();
        assertTrue(iterator.hasNext());
        Envelope envelope = iterator.next();
        assertEquals(new Envelope(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        ), envelope);
        assertFalse(iterator.hasNext());
    }

    @Test
    void ignores_empty_lines() {
        InputStream input = new ByteArrayInputStream("{}\n{}\n\n{}\n".getBytes(UTF_8));
        Iterable<Envelope> incomingMessages = makeMessageIterable(input);
        Iterator<Envelope> iterator = incomingMessages.iterator();
        for (int i = 0; i < 3; i++) {
            assertTrue(iterator.hasNext());
            Envelope envelope = iterator.next();
            assertEquals(new Envelope(
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
            ), envelope);
        }
        assertFalse(iterator.hasNext());
    }

    @Test
    void handles_enums() {
        InputStream input = new ByteArrayInputStream("{\"attachment\":{\"contentEncoding\":\"BASE64\"}}\n".getBytes(UTF_8));
        Iterable<Envelope> incomingMessages = makeMessageIterable(input);
        Iterator<Envelope> iterator = incomingMessages.iterator();
        assertTrue(iterator.hasNext());
        Envelope envelope = iterator.next();
        assertEquals(AttachmentContentEncoding.BASE64, envelope.getAttachment().get().getContentEncoding());
        assertFalse(iterator.hasNext());
    }

    @Test
    void includes_offending_line_in_error_message() {
        InputStream input = new ByteArrayInputStream("BLA BLA".getBytes(UTF_8));
        Iterable<Envelope> incomingMessages = makeMessageIterable(input);
        Iterator<Envelope> iterator = incomingMessages.iterator();

        RuntimeException exception = assertThrows(RuntimeException.class, () -> assertTrue(iterator.hasNext()));
        assertEquals(exception.getMessage(), "Not JSON: BLA BLA");
    }
}
