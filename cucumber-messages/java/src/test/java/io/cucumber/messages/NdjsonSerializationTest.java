package io.cucumber.messages;

import java.io.InputStream;
import java.io.OutputStream;

public class NdjsonSerializationTest extends MessageSerializationContract {
    @Override
    protected MessageWriter makeMessageWriter(OutputStream output) {
        return new NdjsonMessageWriter(output);
    }

    @Override
    protected Iterable<Messages.Envelope> makeMessageIterable(InputStream input) {
        return new NdjsonToMessageIterable(input);
    }
}
