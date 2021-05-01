package io.cucumber.messages;

import java.io.IOException;

public interface MessageWriter {
    void write(Object message) throws IOException;
}
