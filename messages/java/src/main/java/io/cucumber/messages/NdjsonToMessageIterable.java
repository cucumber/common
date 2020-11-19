package io.cucumber.messages;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;

/**
 * Iterates over messages read from a stream. Client code should not depend on this class
 * directly, but rather on a {@code Iterable<Messages.Envelope>} object.
 * Tests can then use a {@code new ArrayList<Messages.Envelope>} which implements the same interface.
 */
public class NdjsonToMessageIterable implements Iterable<Messages.Envelope> {
    public static final JsonFormat.Parser JSON_PARSER = JsonFormat
            .parser()
            .ignoringUnknownFields();
    private final BufferedReader input;
    private Messages.Envelope next;

    public NdjsonToMessageIterable(InputStream input) {
        this.input = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8));
    }

    @Override
    public Iterator<Messages.Envelope> iterator() {
        return new Iterator<Messages.Envelope>() {
            @Override
            public boolean hasNext() {
                try {
                    String line = input.readLine();
                    if (line == null) return false;
                    if (line.trim().equals("")) {
                        return hasNext();
                    }
                    Messages.Envelope.Builder builder = Messages.Envelope.newBuilder();
                    try {
                        JSON_PARSER.merge(line, builder);
                    } catch(InvalidProtocolBufferException e) {
                        throw new RuntimeException(String.format("Not JSON: %s", line));
                    }
                    next = builder.build();
                    return true;
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public Messages.Envelope next() {
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
