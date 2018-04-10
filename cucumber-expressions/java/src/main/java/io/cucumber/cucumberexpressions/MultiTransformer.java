package io.cucumber.cucumberexpressions;

public interface MultiTransformer<T> {
    T transform(String[] args) throws Throwable;
}
