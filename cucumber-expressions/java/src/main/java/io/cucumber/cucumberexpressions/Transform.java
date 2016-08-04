package io.cucumber.cucumberexpressions;

import java.util.List;

public interface Transform<T> {

    String getTypeName();

    Class<T> getType();

    List<String> getCaptureGroupRegexps();

    T transform(String value);
}
