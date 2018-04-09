package io.cucumber.cucumberexpressions;

public interface Transformer<T> extends Function<String[], T> {
    T apply(String... args) throws Throwable;
}
