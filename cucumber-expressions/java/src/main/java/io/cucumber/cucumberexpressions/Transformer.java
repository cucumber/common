package io.cucumber.cucumberexpressions;

public interface Transformer<T> {
    T transform(String arg) throws Throwable;
}
