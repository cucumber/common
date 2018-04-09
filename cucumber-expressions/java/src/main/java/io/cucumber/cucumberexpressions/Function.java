package io.cucumber.cucumberexpressions;

public interface Function<T, R> {

    R apply(T t) throws Throwable;

}
