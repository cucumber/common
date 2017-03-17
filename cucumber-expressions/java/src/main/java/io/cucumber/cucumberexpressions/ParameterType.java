package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;

public interface ParameterType<T> {

    /**
     * This is used in the type name in typed expressions
     * @return human readable type name
     */
    String getName();

    Type getType();

    List<String> getRegexps();

    T transform(String value);
}
