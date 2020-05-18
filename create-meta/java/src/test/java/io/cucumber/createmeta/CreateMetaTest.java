package io.cucumber.createmeta;

import io.cucumber.messages.Messages;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class CreateMetaTest {
    private Messages.Meta meta = CreateMeta.createMeta("cucumber-jvm", "3.2.1");

    @Test
    public void it_provides_the_correct_tool_name() {
      assertEquals("cucumber-jvm", meta.getImplementation().getName());
    }

    @Test
    public void it_provides_the_correct_tool_version() {
      assertEquals("3.2.1", meta.getImplementation().getVersion());
    }
}