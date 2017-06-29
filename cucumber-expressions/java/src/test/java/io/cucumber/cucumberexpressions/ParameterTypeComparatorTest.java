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
        SortedSet<ParameterType<?>> set = new TreeSet<>();
        set.add(new ParameterType<>("c", "c", C.class, new SingleTransformer<>(C::new), false, true));
        set.add(new ParameterType<>("a", "a", A.class, new SingleTransformer<>(A::new), false, false));
        set.add(new ParameterType<>("d", "d", D.class, new SingleTransformer<>(D::new), false, false));
        set.add(new ParameterType<>("b", "b", B.class, new SingleTransformer<>(B::new), false, true));

        List<String> names = new ArrayList<>();
        for (ParameterType parameterType : set) {
            names.add(parameterType.getName());
        }
        assertEquals(asList("b", "c", "a", "d"), names);
    }
}
