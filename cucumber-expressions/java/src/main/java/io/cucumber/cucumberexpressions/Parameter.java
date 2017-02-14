package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

public interface Parameter<T> {

    /**
     * This is used in the type name in typed expressions
     * @return human readable type name
     */
    String getTypeName();

    Type getType();

    List<String> getCaptureGroupRegexps();

    T transform(String value);
}
