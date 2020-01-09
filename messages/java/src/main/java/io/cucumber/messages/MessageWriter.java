package io.cucumber.messages;

import com.google.protobuf.GeneratedMessageV3;

import java.io.IOException;

public interface MessageWriter {
    void write(GeneratedMessageV3 message) throws IOException;
}
