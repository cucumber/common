package io.cucumber.config;

import org.junit.Test;

import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class ConfigTest {
    @Test
    public void builds_object() throws FileNotFoundException, UnsupportedEncodingException {
        Config config = new Config(
                "src/test/resources/test-config",
                new String[]{"testing"},
                null,
                "stringlist",
                "something else --somebool".split(" ")
        );

        Testing testing = new Testing();

        testing = config.configure(testing);
        assertEquals(43, testing.meaning); // From the JSON file
        assertEquals("Hello from YAML", testing.message);
        assertEquals(asList("something", "else"), testing.stringlist);
        assertTrue(testing.somebool);
    }
}
