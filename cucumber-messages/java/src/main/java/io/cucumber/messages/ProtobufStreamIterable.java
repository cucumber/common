package io.cucumber.messages;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

/**
 * Iterates over messages read from a stream. Client code should not depend on this class
 * directly, but rather on a {@code Iterable<Messages.Wrapper>} object.
 * Tests can then use a {@code new ArrayList<Messages.Wrapper>} which implements the same interface .
 */
public class ProtobufStreamIterable implements Iterable<Messages.Wrapper> {
    private final InputStream input;
    private Messages.Wrapper next;

    public ProtobufStreamIterable(InputStream input) {
        this.input = input;
    }

    @Override
    public Iterator<Messages.Wrapper> iterator() {
        return new Iterator<Messages.Wrapper>() {
            @Override
            public boolean hasNext() {
                try {
                    next = Messages.Wrapper.parseDelimitedFrom(input);
                    return next != null;
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public Messages.Wrapper next() {
                if(next == null) {
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
