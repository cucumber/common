package io.cucumber.messages;

import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;

import static io.cucumber.messages.Messages.*;

/**
 * Iterates over messages read from a stream. Client code should not depend on this class
 * directly, but rather on a {@code Iterable<Messages.Envelope>} object.
 * Tests can then use a {@code new ArrayList<Messages.Envelope>} which implements the same interface.
 */
public final class NdjsonToMessageIterable implements Iterable<Envelope> {
    private final BufferedReader input;
    private Envelope next;

    public NdjsonToMessageIterable(InputStream input) {
        this.input = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8));
    }

    @Override
    public Iterator<Envelope> iterator() {
        return new Iterator<Envelope>() {
            @Override
            public boolean hasNext() {
                try {
                    String line = input.readLine();
                    if (line == null) return false;
                    if (line.trim().equals("")) {
                        return hasNext();
                    }
                    try {
                        next = Jackson.OBJECT_MAPPER.readValue(line, Envelope.class);
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(String.format("Could not parse JSON: %s", line), e);
                    }
                    return true;
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public Envelope next() {
                if (next == null) {
                    throw new IllegalStateException("next() should only be called after a call to hasNext() that returns true");
                }
                return next;
            }

            @Override
            public void remove() {
                throw new UnsupportedOperationException();
            }
        };
    }
}
