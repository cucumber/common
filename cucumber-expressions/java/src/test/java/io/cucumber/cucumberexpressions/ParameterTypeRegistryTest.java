package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.Locale;
import java.util.regex.Pattern;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.fail;

public class ParameterTypeRegistryTest {

    private final ParameterTypeRegistry registry = new ParameterTypeRegistry(Locale.ENGLISH);

    @Test
    public void looks_up_parameter_type_by_type() {
        ParameterType<Integer> parameterType = registry.lookupByType(Integer.class);
        assertEquals(new Integer(22), parameterType.transform("22"));
    }

    @Test
    public void does_not_allow_more_than_one_preferential_parameter_type_for_each_regexp() {
        registry.defineParameterType(new SimpleParameterType<String>("color", "red|blue|green", true));
        try {
            registry.defineParameterType(new SimpleParameterType<String>("cssColor", "red|blue|green", true));
            fail("Expected an exception");
        } catch (CucumberExpressionException e) {
            assertEquals("There can only be one preferential parameter type per regexp. The regexp /red|blue|green/ is used for two preferential parameter types, {color} and {cssColor}", e.getMessage());
        }
    }

    @Test
    public void looks_up_preferential_parameter_type_by_regexp() {
        SimpleParameterType<String> name = new SimpleParameterType<>("name", "[A-Z]+\\w+", false);
        SimpleParameterType<String> person = new SimpleParameterType<>("person", "[A-Z]+\\w+", true);
        SimpleParameterType<String> place = new SimpleParameterType<>("place", "[A-Z]+\\w+", false);
        registry.defineParameterType(name);
        registry.defineParameterType(person);
        registry.defineParameterType(place);
        assertSame(person, registry.lookupByRegexp("[A-Z]+\\w+", Pattern.compile("([A-Z]+\\w+) and ([A-Z]+\\w+)"), "Lisa and Bob"));
    }

    @Test
    public void throws_ambiguous_exception_when_no_parameter_types_are_preferential() {
        SimpleParameterType<String> name = new SimpleParameterType<>("name", "[A-Z]+\\w+", false);
        SimpleParameterType<String> person = new SimpleParameterType<>("person", "[A-Z]+\\w+", false);
        SimpleParameterType<String> place = new SimpleParameterType<>("place", "[A-Z]+\\w+", false);
        registry.defineParameterType(name);
        registry.defineParameterType(person);
        registry.defineParameterType(place);
        try {
            registry.lookupByRegexp("[A-Z]+\\w+", Pattern.compile("([A-Z]+\\w+) and ([A-Z]+\\w+)"), "Lisa and Bob");
            fail("Expected an exception");
        } catch (AmbiguousParameterTypeException e) {
            String expected = "" +
                    "Your Regular Expression /([A-Z]+\\w+) and ([A-Z]+\\w+)/\n" +
                    "matches multiple parameter types with regexp /[A-Z]+\\w+/:\n" +
                    "   {name}\n" +
                    "   {person}\n" +
                    "   {place}\n" +
                    "\n" +
                    "I couldn't decide which one to use. You have two options:\n" +
                    "\n" +
                    "1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:\n" +
                    "   {name} and {name}\n" +
                    "   {name} and {person}\n" +
                    "   {name} and {place}\n" +
                    "   {person} and {name}\n" +
                    "   {person} and {person}\n" +
                    "   {person} and {place}\n" +
                    "   {place} and {name}\n" +
                    "   {place} and {person}\n" +
                    "   {place} and {place}\n" +
                    "\n" +
                    "2) Make one of the parameter types preferential and continue to use a Regular Expression.\n" +
                    "\n";
            assertEquals(expected, e.getMessage());
        }
    }
}
