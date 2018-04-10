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
        SortedSet<ParameterType<?, ?>> set = new TreeSet<>();
        set.add(new ParameterType<>("c", "c", C.class,
                new Transformer<C>() {
                    @Override
                    public C transform(String arg) {
                        return new C(arg);
                    }
                }, false, true));
        set.add(new ParameterType<>("a", "a", A.class, new Transformer<A>() {
            @Override
            public A transform(String arg) {
                return new A(arg);
            }
        }, false, false));
        set.add(new ParameterType<>("d", "d", D.class, new Transformer<D>() {
            @Override
            public D transform(String arg) {
                return new D(arg);
            }
        }, false, false));
        set.add(new ParameterType<>("b", "b", B.class, new Transformer<B>() {
            @Override
            public B transform(String arg) {
                return new B(arg);
            }
        }, false, true));

        List<String> names = new ArrayList<>();
        for (ParameterType parameterType : set) {
            names.add(parameterType.getName());
        }
        assertEquals(asList("b", "c", "a", "d"), names);
    }
}
