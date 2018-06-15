package io.cucumber.config;

import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class OptparseTest extends FieldSetterContract {
    @Override
    protected MapBuilder makeMapBuilder(Object config) {
        return new OptparseBuilder(
                config,
                "stringlist",
                asList(
                        "--somebool",
                        "--meaning", "42",
                        "--message", "hello",
                        "one",
                        "two"
                ),
                new HashMap<String, String>());
    }

    @Test
    public void ignores_arg_after_boolean_option() {
        MyConfig testing = new MyConfig();
        OptparseBuilder builder = new OptparseBuilder(
                testing,
                "stringlist",
                asList("--somebool", "one", "two"),
                new HashMap<String, String>()
        );
        Map<String, ?> map = builder.buildMap();
        new FieldSetter(testing).setFields(map);
        assertTrue(testing.somebool);
        assertEquals(asList("one", "two"), testing.stringlist);
    }

    @Test
    public void supports_no_boolean_option() {
        MyConfig testing = new MyConfig();
        OptparseBuilder builder = new OptparseBuilder(
                testing,
                "stringlist",
                singletonList("--no-somebool"),
                new HashMap<String, String>()
        );
        testing.somebool = true;
        new FieldSetter(testing).setFields(builder.buildMap());
        assertFalse(testing.somebool);
    }

    @Test
    public void aliases_options() {
        MyConfig testing = new MyConfig();
        OptparseBuilder builder = new OptparseBuilder(
                testing,
                "stringlist",
                singletonList("-s"),
                new HashMap<String, String>() {{
                    put("-s", "--somebool");
                }});
        new FieldSetter(testing).setFields(builder.buildMap());
        assertTrue(testing.somebool);
    }

    @Test
    public void sets_surplus_to_special_property() {
        MyConfig testing = new MyConfig();
        OptparseBuilder builder = new OptparseBuilder(
                testing,
                "stringlist",
                asList("a", "b", "c"),
                new HashMap<String, String>()
        );

        new FieldSetter(testing).setFields(builder.buildMap());
        assertEquals(asList("a", "b", "c"), testing.stringlist);
    }

    @Test
    public void adds_options_to_list() {
        MyConfig testing = new MyConfig();
        OptparseBuilder builder = new OptparseBuilder(
                testing,
                "nothing",
                asList("--stringlist", "a", "--stringlist", "b", "--stringlist", "c"),
                new HashMap<String, String>()
        );

        new FieldSetter(testing).setFields(builder.buildMap());
        assertEquals(asList("a", "b", "c"), testing.stringlist);
    }
}
