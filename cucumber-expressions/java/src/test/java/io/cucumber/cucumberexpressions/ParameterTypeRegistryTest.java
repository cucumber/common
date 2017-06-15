package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.Locale;
import java.util.regex.Pattern;

import static org.junit.Assert.*;

public class ParameterTypeRegistryTest {

    public static final String CAPITALISED_WORD = "[A-Z]+\\w+";

    public static class Name {
        public Name(String s) {
        }
    }

    public static class Person {
        public Person(String s) {
        }
    }

    public static class Place {
        public Place(String s) {
        }
    }

    private final ParameterTypeRegistry registry = new ParameterTypeRegistry(Locale.ENGLISH);

    @Test
    public void looks_up_parameter_type_by_type() {
        ParameterType<Integer> parameterType = registry.lookupByType(Integer.class);
        assertEquals(new Integer(22), parameterType.transform("22"));
    }

    @Test
    public void looks_up_parameter_type_by_primitive_type() {
        ParameterType<Integer> parameterType = registry.lookupByType(int.class);
        assertEquals(new Integer(22), parameterType.transform("22"));
    }

    @Test
    public void does_not_allow_more_than_one_preferential_parameter_type_for_each_regexp() {
        registry.defineParameterType(new SimpleParameterType<>("name", CAPITALISED_WORD, Name.class, Name::new, false, true));
        registry.defineParameterType(new SimpleParameterType<>("person", CAPITALISED_WORD, Person.class, Person::new, false, false));
        try {
            registry.defineParameterType(new SimpleParameterType<>("place", CAPITALISED_WORD, Place.class, Place::new, false, true));
            fail("Expected an exception");
        } catch (CucumberExpressionException e) {
            assertEquals("There can only be one preferential parameter type per regexp. The regexp /[A-Z]+\\w+/ is used for two preferential parameter types, {name} and {place}", e.getMessage());
        }
    }

    @Test
    public void looks_up_preferential_parameter_type_by_regexp() {
        SimpleParameterType<Name> name = new SimpleParameterType<>("name", CAPITALISED_WORD, Name.class, Name::new, false, false);
        SimpleParameterType<Person> person = new SimpleParameterType<>("person", CAPITALISED_WORD, Person.class, Person::new, false, true);
        SimpleParameterType<Place> place = new SimpleParameterType<>("place", CAPITALISED_WORD, Place.class, Place::new, false, false);
        registry.defineParameterType(name);
        registry.defineParameterType(person);
        registry.defineParameterType(place);
        assertSame(person, registry.lookupByRegexp(CAPITALISED_WORD, Pattern.compile("([A-Z]+\\w+) and ([A-Z]+\\w+)"), "Lisa and Bob"));
    }

    @Test
    public void throws_ambiguous_exception_on_lookup_when_no_parameter_types_are_preferential() {
        SimpleParameterType<Name> name = new SimpleParameterType<>("name", CAPITALISED_WORD, Name.class, Name::new, true, false);
        SimpleParameterType<Person> person = new SimpleParameterType<>("person", CAPITALISED_WORD, Person.class, Person::new, true, false);
        SimpleParameterType<Place> place = new SimpleParameterType<>("place", CAPITALISED_WORD, Place.class, Place::new, true, false);
        registry.defineParameterType(name);
        registry.defineParameterType(person);
        registry.defineParameterType(place);
        try {
            registry.lookupByRegexp(CAPITALISED_WORD, Pattern.compile("([A-Z]+\\w+) and ([A-Z]+\\w+)"), "Lisa and Bob");
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
