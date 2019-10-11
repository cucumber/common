package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import java.math.BigDecimal;
import java.util.Locale;
import java.util.regex.Pattern;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class ParameterTypeRegistryTest {

    private static final String CAPITALISED_WORD = "[A-Z]+\\w+";

    public static class Name {
        Name(String s) {
            assertNotNull(s);
        }
    }

    public static class Person {
        Person(String s) {
            assertNotNull(s);
        }
    }

    public static class Place {
        Place(String s) {
            assertNotNull(s);
        }
    }

    private final ParameterTypeRegistry registry = new ParameterTypeRegistry(Locale.ENGLISH);

    @Test
    public void does_not_allow_more_than_one_preferential_parameter_type_for_each_regexp() {

        registry.defineParameterType(new ParameterType<>("name", CAPITALISED_WORD, Name.class, Name::new, false, true));
        registry.defineParameterType(new ParameterType<>("person", CAPITALISED_WORD, Person.class, Person::new, false, false));

        final Executable testMethod = () -> registry.defineParameterType(new ParameterType<>(
                "place",
                CAPITALISED_WORD,
                Place.class,
                Place::new,
                false,
                true
        ));

        final CucumberExpressionException thrownException = assertThrows(CucumberExpressionException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo("There can only be one preferential parameter type per regexp. The regexp /[A-Z]+\\w+/ is used for two preferential parameter types, {name} and {place}")));
    }

    @Test
    public void looks_up_preferential_parameter_type_by_regexp() {
        ParameterType<Name> name = new ParameterType<>("name", CAPITALISED_WORD, Name.class, Name::new, false, false);
        ParameterType<Person> person = new ParameterType<>("person", CAPITALISED_WORD, Person.class, Person::new, false, true);
        ParameterType<Place> place = new ParameterType<>("place", CAPITALISED_WORD, Place.class, Place::new, false, false);
        registry.defineParameterType(name);
        registry.defineParameterType(person);
        registry.defineParameterType(place);
        assertSame(person, registry.lookupByRegexp(CAPITALISED_WORD, Pattern.compile("([A-Z]+\\w+) and ([A-Z]+\\w+)"), "Lisa and Bob"));
    }

    @Test
    public void throws_ambiguous_exception_on_lookup_when_no_parameter_types_are_preferential() {
        ParameterType<Name> name = new ParameterType<>("name", CAPITALISED_WORD, Name.class, Name::new, true, false);
        ParameterType<Person> person = new ParameterType<>("person", CAPITALISED_WORD, Person.class, Person::new, true, false);
        ParameterType<Place> place = new ParameterType<>("place", CAPITALISED_WORD, Place.class, Place::new, true, false);
        registry.defineParameterType(name);
        registry.defineParameterType(person);
        registry.defineParameterType(place);

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

        final Executable testMethod = () -> registry.lookupByRegexp(CAPITALISED_WORD, Pattern.compile("([A-Z]+\\w+) and ([A-Z]+\\w+)"), "Lisa and Bob");

        final AmbiguousParameterTypeException thrownException = assertThrows(AmbiguousParameterTypeException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo(expected)));
    }

    @Test
    public void does_not_allow_anonymous_parameter_type_to_be_registered() {

        final Executable testMethod = () -> registry.defineParameterType(new ParameterType<>("", ".*", Object.class, (Transformer<Object>) arg -> arg));

        final DuplicateTypeNameException thrownException = assertThrows(DuplicateTypeNameException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo("The anonymous parameter type has already been defined")));
    }

    @Test
    public void parse_decimal_numbers_in_english() {
        ExpressionFactory factory = new ExpressionFactory(new ParameterTypeRegistry(Locale.ENGLISH));
        Expression expression = factory.createExpression("{bigdecimal}");

        assertThat(expression.match(""), nullValue());
        assertThat(expression.match("."), nullValue());
        assertThat(expression.match(","), nullValue());
        assertThat(expression.match("-"), nullValue());
        assertThat(expression.match("E"), nullValue());
        assertThat(expression.match("1,"), nullValue());
        assertThat(expression.match(",1"), nullValue());
        assertThat(expression.match("1."), nullValue());

        assertThat(expression.match("1").get(0).getValue(), is(BigDecimal.ONE));
        assertThat(expression.match("-1").get(0).getValue(), is(new BigDecimal("-1")));
        assertThat(expression.match("1.1").get(0).getValue(), is(new BigDecimal("1.1")));
        assertThat(expression.match("1,000").get(0).getValue(), is(new BigDecimal("1000")));
        assertThat(expression.match("1,000,0").get(0).getValue(), is(new BigDecimal("10000")));
        assertThat(expression.match("1,000.1").get(0).getValue(), is(new BigDecimal("1000.1")));
        assertThat(expression.match("1,000,10").get(0).getValue(), is(new BigDecimal("100010")));
        assertThat(expression.match("1,0.1").get(0).getValue(), is(new BigDecimal("10.1")));
        assertThat(expression.match("1,000,000.1").get(0).getValue(), is(new BigDecimal("1000000.1")));
        assertThat(expression.match("-1.1").get(0).getValue(), is(new BigDecimal("-1.1")));

        assertThat(expression.match(".1").get(0).getValue(), is(new BigDecimal("0.1")));
        assertThat(expression.match("-.1").get(0).getValue(), is(new BigDecimal("-0.1")));
        assertThat(expression.match("-.10000001").get(0).getValue(), is(new BigDecimal("-0.10000001")));
        assertThat(expression.match("1E1").get(0).getValue(), is(new BigDecimal("1E1"))); // precision 1 with scale -1, can not be expressed as a decimal
        assertThat(expression.match(".1E1").get(0).getValue(), is(new BigDecimal("1")));
        assertThat(expression.match("E1"), nullValue());
        assertThat(expression.match("-.1E-1").get(0).getValue(), is(new BigDecimal("-0.01")));
        assertThat(expression.match("-.1E-2").get(0).getValue(), is(new BigDecimal("-0.001")));
        assertThat(expression.match("-.1E+1"), nullValue());
        assertThat(expression.match("-.1E+2"), nullValue());
        assertThat(expression.match("-.1E1").get(0).getValue(), is(new BigDecimal("-1")));
        assertThat(expression.match("-.10E2").get(0).getValue(), is(new BigDecimal("-10")));
    }

    @Test
    public void parse_decimal_numbers_in_german() {
        ExpressionFactory factory = new ExpressionFactory(new ParameterTypeRegistry(Locale.GERMAN));
        Expression expression = factory.createExpression("{bigdecimal}");

        assertThat(expression.match("1.000,1").get(0).getValue(), is(new BigDecimal("1000.1")));
        assertThat(expression.match("1.000.000,1").get(0).getValue(), is(new BigDecimal("1000000.1")));
        assertThat(expression.match("-1,1").get(0).getValue(), is(new BigDecimal("-1.1")));
        assertThat(expression.match("-,1E1").get(0).getValue(), is(new BigDecimal("-1")));
    }

    @Test
    public void parse_decimal_numbers_in_canadian_french() {
        ExpressionFactory factory = new ExpressionFactory(new ParameterTypeRegistry(Locale.CANADA_FRENCH));
        Expression expression = factory.createExpression("{bigdecimal}");

        assertThat(expression.match("1\u00A0000,1").get(0).getValue(), is(new BigDecimal("1000.1")));
        assertThat(expression.match("1\u00A0000\u00A0000,1").get(0).getValue(), is(new BigDecimal("1000000.1")));
        assertThat(expression.match("-1,1").get(0).getValue(), is(new BigDecimal("-1.1")));
        assertThat(expression.match("-,1E1").get(0).getValue(), is(new BigDecimal("-1")));
    }

}
