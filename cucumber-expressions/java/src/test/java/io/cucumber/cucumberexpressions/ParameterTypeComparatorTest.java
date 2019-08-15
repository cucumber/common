package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class ParameterTypeComparatorTest {

    public static class A {
        A(String s) {
            assertNotNull(s);
        }
    }

    public static class B {
        B(String s) {
            assertNotNull(s);
        }
    }

    public static class C {
        C(String s) {
            assertNotNull(s);
        }
    }

    public static class D {
        D(String s) {
            assertNotNull(s);
        }
    }

    @Test
    public void sorts_parameter_types_by_preferential_then_name() {
        SortedSet<ParameterType<?>> set = new TreeSet<>();
        set.add(new ParameterType<>("c", "c", C.class, C::new, false, true));
        set.add(new ParameterType<>("a", "a", A.class, A::new, false, false));
        set.add(new ParameterType<>("d", "d", D.class, D::new, false, false));
        set.add(new ParameterType<>("b", "b", B.class, B::new, false, true));

        List<String> names = new ArrayList<>();
        for (ParameterType parameterType : set) {
            names.add(parameterType.getName());
        }
        assertEquals(asList("b", "c", "a", "d"), names);
    }
}
