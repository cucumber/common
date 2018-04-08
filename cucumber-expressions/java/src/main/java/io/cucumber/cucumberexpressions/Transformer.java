package io.cucumber.cucumberexpressions;

public interface Transformer<T> {
    T transform(String... groupValues) throws Throwable;
}
