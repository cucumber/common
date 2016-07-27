package io.cucumber.cucumberexpressions;

import java.util.List;

public interface Transform<T> {

    List<String> getTypeNames();

    Class<T> getType();

    List<String> getCaptureGroupRegexps();

    T transform(String value);
}
