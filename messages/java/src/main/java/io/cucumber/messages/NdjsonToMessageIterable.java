package io.cucumber.messages;

import io.cucumber.messages.Messages.Envelope;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;

/**
 * Iterates over messages read from a stream. Client code should not depend on this class
 * directly, but rather on a {@code Iterable<Messages.Envelope>} object.
 * Tests can then use a {@code new ArrayList<Messages.Envelope>} which implements the same interface.
 */
public final class NdjsonToMessageIterable implements Iterable<Envelope>, AutoCloseable {
    private final BufferedReader reader;
    private final Deserializer deserializer;
    private Envelope next;

    public NdjsonToMessageIterable(InputStream inputStream, Deserializer deserializer) {
        this(new InputStreamReader(inputStream, StandardCharsets.UTF_8), deserializer);
    }

    public NdjsonToMessageIterable(Reader reader, Deserializer deserializer) {
        this(new BufferedReader(reader), deserializer);
    }

    public NdjsonToMessageIterable(BufferedReader reader, Deserializer deserializer) {
        this.reader = reader;
        this.deserializer = deserializer;
    }

    @Override
    public Iterator<Envelope> iterator() {
        return new Iterator<Envelope>() {
            @Override
            public boolean hasNext() {
                try {
                    String line = reader.readLine();
                    if (line == null) return false;
                    if (line.trim().equals("")) {
                        return hasNext();
                    }
                    try {
                        next = deserializer.readValue(line);
                    } catch (IOException e) {
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

    @Override
    public void close() throws IOException {
        this.reader.close();
    }

    @FunctionalInterface
    public interface Deserializer {

        Envelope readValue(String json) throws IOException;

    }
}
