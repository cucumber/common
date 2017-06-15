package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;

public class ParameterTypeComparatorTest {

    public static class A {
        public A(String s) {
        }
    }

    public static class B {
        public B(String s) {
        }
    }

    public static class C {
        public C(String s) {
        }
    }

    public static class D {
        public D(String s) {
        }
    }

    @Test
    public void sorts_parameter_types_by_preferential_then_name() {
        SortedSet<ParameterType> set = new TreeSet<>(new ParameterTypeComparator());
        set.add(new SimpleParameterType<>("c", C.class, true, "c", C::new));
        set.add(new SimpleParameterType<>("a", A.class, false, "a", A::new));
        set.add(new SimpleParameterType<>("d", D.class, false, "d", D::new));
        set.add(new SimpleParameterType<>("b", B.class, true, "b", B::new));

        List<String> names = new ArrayList<>();
        for (ParameterType parameterType : set) {
            names.add(parameterType.getName());
        }
        assertEquals(asList("b", "c", "a", "d"), names);
    }
}
