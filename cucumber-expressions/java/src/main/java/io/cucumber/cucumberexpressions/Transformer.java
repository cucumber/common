package io.cucumber.cucumberexpressions;

public interface Transformer<T> extends Function<String, T> {
    T transform(String arg) throws Throwable;
}
