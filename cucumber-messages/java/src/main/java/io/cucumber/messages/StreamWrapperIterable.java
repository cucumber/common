package io.cucumber.messages;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

/**
 * Iterates over messages read from a stream. Client code should not depend on this class
 * directly, but rather on a {@code Iterable<Messages.Wrapper>} object.
 * Tests can then use a {@code new ArrayList<Messages.Wrapper>} which implements the same interface .
 */

public class StreamWrapperIterable implements Iterable<Messages.Wrapper> {
    private final InputStream input;

    public StreamWrapperIterable(InputStream input) {
        this.input = input;
    }

    @Override
    public Iterator<Messages.Wrapper> iterator() {
        return new Iterator<Messages.Wrapper>() {
            @Override
            public boolean hasNext() {
                try {
                    return input.available() > 0;
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public Messages.Wrapper next() {
                try {
                    return Messages.Wrapper.parseDelimitedFrom(input);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            public void remove() {
                throw new UnsupportedOperationException();
            }
        };
    }
}
