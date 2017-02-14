package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.Locale;

import static org.junit.Assert.assertEquals;

public class ParameterRegistryTest {
    @Test
    public void looks_up_transform_by_type() {
        Parameter<Integer> parameter = new ParameterRegistry(Locale.ENGLISH).lookupByType(Integer.class);
        assertEquals(new Integer(22), parameter.transform("22"));
    }
}
