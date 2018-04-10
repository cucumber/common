package io.cucumber.cucumberexpressions;

public interface Transformer<A, T> {
    T transform(A args) throws Throwable;
}
