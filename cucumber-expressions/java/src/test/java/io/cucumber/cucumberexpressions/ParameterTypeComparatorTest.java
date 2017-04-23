package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;

public class ParameterTypeComparatorTest {
    @Test
    public void sorts_parameter_types_by_preferential_then_name() {
        SortedSet<ParameterType> set = new TreeSet<>(new ParameterTypeComparator());
        set.add(new SimpleParameterType("c", "c", true));
        set.add(new SimpleParameterType("a", "a", false));
        set.add(new SimpleParameterType("d", "d", false));
        set.add(new SimpleParameterType("b", "b", true));

        List<String> names = new ArrayList<>();
        for (ParameterType parameterType : set) {
            names.add(parameterType.getName());
        }
        assertEquals(asList("b", "c", "a", "d"), names);
    }
}
