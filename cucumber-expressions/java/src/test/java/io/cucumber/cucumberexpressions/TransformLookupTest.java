package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.Locale;

import static org.junit.Assert.assertEquals;

public class TransformLookupTest {
    @Test
    public void looks_up_transform_by_type() {
        Transform<Integer> transform = new TransformLookup(Locale.ENGLISH).lookupByType(Integer.class);
        assertEquals(new Integer(22), transform.transform("22"));
    }
}
