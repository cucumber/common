package io.cucumber.messages;

import java.io.InputStream;
import java.io.OutputStream;

public class ProtobufSerializationTest extends MessageSerializationContract {
    @Override
    protected MessageWriter makeMessageWriter(OutputStream output) {
        return new MessageToBinaryWriter(output);
    }

    @Override
    protected Iterable<Messages.Envelope> makeMessageIterable(InputStream input) {
        return new BinaryToMessageIterable(input);
    }
}
