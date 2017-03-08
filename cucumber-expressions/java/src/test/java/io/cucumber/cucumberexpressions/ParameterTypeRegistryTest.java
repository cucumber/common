package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.Locale;

import static org.junit.Assert.assertEquals;

public class ParameterTypeRegistryTest {
    @Test
    public void looks_up_transform_by_type() {
        ParameterType<Integer> parameterType = new ParameterTypeRegistry(Locale.ENGLISH).lookupByType(Integer.class);
        assertEquals(new Integer(22), parameterType.transform("22"));
    }
}
