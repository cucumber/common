package io.cucumber.config.builders;

import io.cucumber.config.FieldSetter;
import io.cucumber.config.FieldSetterContract;
import io.cucumber.config.MapBuilder;
import org.junit.Test;

import java.util.HashMap;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class OptparseTest extends FieldSetterContract {
    @Override
    protected MapBuilder makeMapBuilder() {
        return new OptparseBuilder(
                "stringlist",
                asList(
                        "--somebool",
                        "--meaning", "42",
                        "--message", "hello",
                        "one",
                        "two"
                ));
    }

    @Test
    public void supports_no_boolean_option() {
        OptparseBuilder builder = new OptparseBuilder(
                "stringlist",
                singletonList("--no-somebool"));
        Testing testing = new Testing();
        testing.somebool = true;
        new FieldSetter(testing).setFields(builder.buildMap());
        assertFalse(testing.somebool);
    }

    @Test
    public void aliases_options() {
        OptparseBuilder builder = new OptparseBuilder(
                "stringlist",
                singletonList("-s"),
                new HashMap<String, String>() {{
                    put("-s", "--somebool");
                }});
        Testing testing = new Testing();
        new FieldSetter(testing).setFields(builder.buildMap());
        assertTrue(testing.somebool);
    }

    @Test
    public void sets_surplus_to_special_property() {
        OptparseBuilder builder = new OptparseBuilder(
                "stringlist",
                asList("a", "b", "c"));

        Testing testing = new Testing();
        new FieldSetter(testing).setFields(builder.buildMap());
        assertEquals(asList("a", "b", "c"), testing.stringlist);
    }

    @Test
    public void adds_options_to_list() {
        OptparseBuilder builder = new OptparseBuilder(
                "nothing",
                asList("--stringlist", "a", "--stringlist", "b", "--stringlist", "c"));

        Testing testing = new Testing();
        new FieldSetter(testing).setFields(builder.buildMap());
        assertEquals(asList("a", "b", "c"), testing.stringlist);
    }
}
