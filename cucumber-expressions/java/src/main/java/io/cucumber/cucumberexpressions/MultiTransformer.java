package io.cucumber.cucumberexpressions;

public interface MultiTransformer<T> extends Function<String[], T> {
    T transform(String[] args) throws Throwable;
}
