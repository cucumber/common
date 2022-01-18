package io.cucumber.messages;

import java.io.IOException;

public interface MessageWriter<T> {
    void write(T message) throws IOException;
}
