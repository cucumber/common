package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.lang.reflect.Type;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;

public class GenericParameterTest {
    class ListOfStringParameter extends AbstractParameter<List<String>> {
        public ListOfStringParameter() {
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
        ParameterRegistry parameterRegistry = new ParameterRegistry(Locale.ENGLISH);
        parameterRegistry.addParameter(new ListOfStringParameter());
        Expression expression = new CucumberExpression("I have {stringlist} yay", Collections.<Type>emptyList(), parameterRegistry);
        List<Argument> args = expression.match("I have three,blind,mice yay");
        assertEquals(asList("three", "blind", "mice"), args.get(0).getTransformedValue());
    }
}
