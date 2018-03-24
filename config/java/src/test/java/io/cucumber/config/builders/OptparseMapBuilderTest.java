package io.cucumber.config.builders;

import io.cucumber.config.MapBuilder;
import io.cucumber.config.Value;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class OptparseMapBuilderTest extends MapBuilderContract {
    @Override
    protected MapBuilder makeMapBuilder() {
        return new OptparseMapBuilder(
                "extra",
                asList(
                        "--somebool",
                        "--meaning", "42",
                        "--message", "hello",
                        "--stringlist", "one",
                        "--stringlist", "two"
                ));
    }


//    @Override
//    protected ConfigLoader makeConfigLoader() {
//    }

    @Test
    public void supports_no_boolean_option() {
//        Config config = new Config();
//        config.set("testing.somebool", Property.fromBoolean(true, null));
//        assertTrue(config.get("testing.somebool").asBoolean());
//        ConfigLoader loader = new OptparseMapBuilder(
//                "testing.",
//                "testing.extra",
//                singletonList("--no-somebool")
//        );
//        loader.load(config);
//        assertFalse(config.get("testing.somebool").asBoolean());
    }

    @Test
    public void aliases_options() {
//        ConfigLoader loader = new OptparseMapBuilder(
//                "testing.",
//                "testing.extra",
//                asList("-t", "three"),
//                new HashMap<String, String>() {{
//                    put("-t", "--two");
//                }});
//        Config config = new Config();
//        loader.load(config);
//        assertEquals("three", config.get("testing.two").asString());
    }

    @Test
    public void sets_surplus_to_special_property() {
//        ConfigLoader loader = new OptparseMapBuilder(
//                "testing.",
//                "testing.extra",
//                asList("a", "b", "c")
//        );
//        Config config = new Config();
//        config.set("testing.extra", new PropertyList());
//        loader.load(config);
//        assertEquals(asList("a", "b", "c"), stringList(config.get("testing.extra")));
    }

    private List<String> stringList(Value value) {
        List<String> result = new ArrayList<>();
        for (Value v : value.asList()) {
            result.add(v.asString());
        }
        return result;
    }
}
