package io.cucumber.messages;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.function.BiFunction;

/**
 * Iterates over messages read from a stream. Client code should not depend on this class
 * directly, but rather on a {@code Iterable<Messages.Envelope>} object.
 * Tests can then use a {@code new ArrayList<Messages.Envelope>} which implements the same interface.
 */
public final class NdjsonToMessageIterable<T> implements Iterable<T>, AutoCloseable {
    private final BufferedReader reader;
    private final Class<T> klass;
    private final BiFunction<String, Class<T>, T> deserializer;
    private T next;

    public NdjsonToMessageIterable(InputStream inputStream, Class<T> klass, BiFunction<String, Class<T>, T> deserializer) {
        this(new InputStreamReader(inputStream, StandardCharsets.UTF_8), klass, deserializer);
    }

    public NdjsonToMessageIterable(Reader reader, Class<T> klass, BiFunction<String, Class<T>, T> deserializer) {
        this(new BufferedReader(reader), klass, deserializer);
    }

    public NdjsonToMessageIterable(BufferedReader reader, Class<T> klass, BiFunction<String, Class<T>, T> deserializer) {
        this.reader = reader;
        this.klass = klass;
        this.deserializer = deserializer;
    }

    @Override
    public Iterator<T> iterator() {
        return new Iterator<T>() {
            @Override
            public boolean hasNext() {
                try {
                    String line = reader.readLine();
                    if (line == null) return false;
                    if (line.trim().equals("")) {
                        return hasNext();
                    }
                    try {
                        next = deserializer.apply(line, klass);
                    } catch (Exception e) {
                        throw new RuntimeException(String.format("Could not parse JSON: %s", line), e);
                    }
                    return true;
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public T next() {
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
}
