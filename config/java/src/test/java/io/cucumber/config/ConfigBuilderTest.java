package io.cucumber.config;

import org.junit.Test;

import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class ConfigBuilderTest {
    @Test
    public void builds_object_from_files_and_command_line() throws FileNotFoundException, UnsupportedEncodingException {
        ConfigBuilder configBuilder = new ConfigBuilder(
                "src/test/resources/test-config",
                new String[]{"testing"},
                null,
                new HashMap<>(),
                new HashMap<>(),
                "testing",
                "--somebool something else".split(" "),
                new HashMap<String, String>(),
                "stringlist"
        );

        MyConfig config = configBuilder.build(new MyConfig());
        assertEquals(43, config.meaning); // From the JSON file
        assertEquals("Hello from YAML", config.message);
        assertEquals(asList("something", "else"), config.stringlist);
        assertTrue(config.somebool);
    }

    @Test
    public void builds_object_from_env_and_system_properties() throws FileNotFoundException, UnsupportedEncodingException {
        ConfigBuilder configBuilder = new ConfigBuilder(
                "src/test/resources/does-not-exist",
                new String[]{"not-used"},
                null,
                new HashMap<String, String>() {{
                    put("testing.meaning", "43");
                }}, new HashMap<String, String>() {{
            put("TESTING_MESSAGE", "Hello from ENV");
            put("TESTING_SOMEBOOL", "true");
        }},
                "testing.",
                new String[0],
                new HashMap<String, String>(),
                "not-used"
        );

        MyConfig config = configBuilder.build(new MyConfig());
        assertEquals(43, config.meaning); // From system properties
        assertEquals("Hello from ENV", config.message); // From env vars
        assertTrue(config.somebool); // From env vars
    }
}
