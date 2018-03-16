package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import io.cucumber.config.Property;
import io.cucumber.config.PropertyList;
import io.cucumber.config.Value;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class OptparseConfigLoaderTest extends ConfigLoaderContract {
    @Override
    protected ConfigLoader makeConfigLoader() {
        return new OptparseConfigLoader(
                "testing.",
                "testing.extra",
                asList(
                        "--somebool",
                        "--meaning", "42",
                        "--list", "one",
                        "--list", "two"
                ));
    }

    @Test
    public void supports_no_boolean_option() {
        Config config = new Config();
        config.set("testing.somebool", Property.fromBoolean(true, null));
        assertTrue(config.get("testing.somebool").asBoolean());
        ConfigLoader loader = new OptparseConfigLoader(
                "testing.",
                "testing.extra",
                singletonList("--no-somebool")
        );
        loader.load(config);
        assertFalse(config.get("testing.somebool").asBoolean());
    }

    @Test
    public void aliases_options() {
        ConfigLoader loader = new OptparseConfigLoader(
                "testing.",
                "testing.extra",
                asList("-t", "three"),
                new HashMap<String, String>() {{
                    put("-t", "--two");
                }});
        Config config = new Config();
        loader.load(config);
        assertEquals("three", config.get("testing.two").asString());
    }

    @Test
    public void sets_surplus_to_special_property() {
        ConfigLoader loader = new OptparseConfigLoader(
                "testing.",
                "testing.extra",
                asList("a", "b", "c")
        );
        Config config = new Config();
        config.set("testing.extra", new PropertyList());
        loader.load(config);
        assertEquals(asList("a", "b", "c"), stringList(config.get("testing.extra")));
    }

    private List<String> stringList(Value value) {
        List<String> result = new ArrayList<>();
        for (Value v : value.asList()) {
            result.add(v.asString());
        }
        return result;
    }
}
