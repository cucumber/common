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
        set.add(new ParameterType<>("c", "c", C.class,
                new Transformer<C>() {
                    @Override
                    public C apply(String... args) {
                        return new C(args[0]);
                    }
                }, false, true));
        set.add(new ParameterType<>("a", "a", A.class, new Transformer<A>() {
            @Override
            public A apply(String... args) {
                return new A(args[0]);
            }
        }, false, false));
        set.add(new ParameterType<>("d", "d", D.class, new Transformer<D>() {
            @Override
            public D apply(String... args) {
                return new D(args[0]);
            }
        }, false, false));
        set.add(new ParameterType<>("b", "b", B.class, new Transformer<B>() {
            @Override
            public B apply(String... args) {
                return new B(args[0]);
            }
        }, false, true));

        List<String> names = new ArrayList<>();
        for (ParameterType parameterType : set) {
            names.add(parameterType.getName());
        }
        assertEquals(asList("b", "c", "a", "d"), names);
    }
}
