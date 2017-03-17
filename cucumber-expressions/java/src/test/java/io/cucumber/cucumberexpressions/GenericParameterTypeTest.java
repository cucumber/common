package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.lang.reflect.Type;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;

public class GenericParameterTypeTest {
    class ListOfStringParameterType extends AbstractParameterType<List<String>> {
        public ListOfStringParameterType() {
            super("stringlist", new TypeReference<List<String>>() {
            }.getType(), ".*");
        }

        @Override
        public List<String> transform(String value) {
            return asList(value.split(","));
        }
    }

    @Test
    public void transforms_to_a_list_of_string() {
        ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);
        parameterTypeRegistry.defineParameterType(new ListOfStringParameterType());
        Expression expression = new CucumberExpression("I have {stringlist} yay", Collections.<Type>emptyList(), parameterTypeRegistry);
        List<Argument> args = expression.match("I have three,blind,mice yay");
        assertEquals(asList("three", "blind", "mice"), args.get(0).getTransformedValue());
    }
}
