package io.cucumber.messages;

import com.google.protobuf.GeneratedMessageV3;

import java.io.IOException;
import java.io.OutputStream;

public class MessageToBinaryWriter implements MessageWriter {
    private final OutputStream out;

    public MessageToBinaryWriter(OutputStream out) {
        this.out = out;
    }

    @Override
    public void write(GeneratedMessageV3 message) throws IOException {
        message.writeDelimitedTo(out);
    }
}
