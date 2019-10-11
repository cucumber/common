package io.cucumber.messages;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

/**
 * Iterates over messages read from a stream. Client code should not depend on this class
 * directly, but rather on a {@code Iterable<Messages.Envelope>} object.
 * Tests can then use a {@code new ArrayList<Messages.Envelope>} which implements the same interface .
 */
public class ProtobufStreamIterable implements Iterable<Messages.Envelope> {
    private final InputStream input;
    private Messages.Envelope next;

    public ProtobufStreamIterable(InputStream input) {
        this.input = input;
    }

    @Override
    public Iterator<Messages.Envelope> iterator() {
        return new Iterator<Messages.Envelope>() {
            @Override
            public boolean hasNext() {
                try {
                    next = Messages.Envelope.parseDelimitedFrom(input);
                    return next != null;
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
