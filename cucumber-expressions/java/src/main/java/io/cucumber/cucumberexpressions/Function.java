package io.cucumber.cucumberexpressions;

interface Function<A, T> {
    T transform(A args) throws Throwable;
}
